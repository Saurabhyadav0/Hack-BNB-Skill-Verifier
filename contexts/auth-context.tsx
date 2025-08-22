"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  connectWallet,
  disconnectWallet,
  getStoredWallet,
  type WalletError,
  type WalletState,
} from "@/lib/ wallet";

interface AuthContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
  user?: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState & { user?: any }>({
    isConnected: false,
    address: null,
    isConnecting: false,
    user: null,
  });
  const [error, setError] = useState<string | null>(null);

  // Check for stored wallet connection on mount
  useEffect(() => {
    const { address, isConnected } = getStoredWallet();
    const storedUser = localStorage.getItem("user");
    if (isConnected && address) {
      setState((prev) => ({
        ...prev,
        isConnected: true,
        address,
        user: storedUser ? JSON.parse(storedUser) : null,
      }));
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          const newAddress = accounts[0];
          localStorage.setItem("wallet_address", newAddress);
          setState((prev) => ({
            ...prev,
            address: newAddress,
            isConnected: true,
          }));
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  const connect = async () => {
    setState((prev) => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      // Step 1: Connect wallet locally
      const address = await connectWallet();

      // Step 2: Get nonce from backend
      const nonceRes = await fetch("/api/auth/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address }),
      });

      if (!nonceRes.ok) {
        const errData = await nonceRes.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get nonce from server");
      }

      const { nonce } = await nonceRes.json();
      if (!nonce) throw new Error("Server did not return a nonce");

      // Step 3: Ask wallet to sign the nonce
      const provider = (window as any).ethereum;
      const signature = await provider.request({
        method: "personal_sign",
        params: [nonce, address],
      });

      // Step 4: Verify signature with backend
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address, signature }),
      });

      if (!verifyRes.ok) {
        const errData = await verifyRes.json().catch(() => ({}));
        throw new Error(errData.error || "Wallet verification failed");
      }

      const data = await verifyRes.json();

      if (!data.success) {
        throw new Error(data.error || "Wallet verification failed");
      }

      // Step 5: Save user in state
      setState({
        isConnected: true,
        address,
        isConnecting: false,
        user: data.user,
      });
      localStorage.setItem("wallet_address", address);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.error("Wallet connect error:", err);
      const walletError = err as WalletError;
      setError(walletError.message || "Failed to connect wallet");
      setState((prev) => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnect = () => {
    disconnectWallet();
    setState({
      isConnected: false,
      address: null,
      isConnecting: false,
      user: null,
    });
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("user");
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
