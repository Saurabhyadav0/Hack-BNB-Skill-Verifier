// Wallet connection utilities
export interface WalletState {
  isConnected: boolean
  address: string | null
  isConnecting: boolean
}

export class WalletError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message)
    this.name = "WalletError"
  }
}

export async function connectWallet(): Promise<string> {
  if (typeof window === "undefined") {
    throw new WalletError("Wallet connection only available in browser")
  }

  if (!window.ethereum) {
    throw new WalletError("No wallet found. Please install MetaMask or another Web3 wallet.", "NO_WALLET")
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    if (!accounts || accounts.length === 0) {
      throw new WalletError("No accounts found", "NO_ACCOUNTS")
    }

    const address = accounts[0]

    // Store in localStorage for persistence
    localStorage.setItem("wallet_address", address)
    localStorage.setItem("wallet_connected", "true")

    return address
  } catch (error: any) {
    if (error.code === 4001) {
      throw new WalletError("User rejected the connection request", "USER_REJECTED")
    }
    throw new WalletError(error.message || "Failed to connect wallet", "CONNECTION_FAILED")
  }
}

export function disconnectWallet(): void {
  localStorage.removeItem("wallet_address")
  localStorage.removeItem("wallet_connected")
}

export function getStoredWallet(): { address: string | null; isConnected: boolean } {
  if (typeof window === "undefined") {
    return { address: null, isConnected: false }
  }

  const address = localStorage.getItem("wallet_address")
  const isConnected = localStorage.getItem("wallet_connected") === "true"

  return { address, isConnected: isConnected && !!address }
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (accounts: string[]) => void) => void
      removeListener: (event: string, callback: (accounts: string[]) => void) => void
    }
  }
}
