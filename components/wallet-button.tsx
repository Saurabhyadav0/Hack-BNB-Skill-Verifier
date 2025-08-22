"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { formatAddress } from "@/lib/ wallet";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function WalletButton() {
  const {
    isConnected,
    address,
    isConnecting,
    connect,
    disconnect,
    error,
    user,
  } = useAuth();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
        console.log("Connecting wallet...");
      await connect();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet",
      });
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: error || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    });
  };

  if (isConnecting) {
    return (
      <Button disabled variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Wallet className="h-4 w-4" />
            {formatAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user && (
            <DropdownMenuItem disabled>
              ✅ Verified as {formatAddress(user.wallet_address)}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={handleDisconnect}
            className="gap-2 text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      variant="outline"
      className="gap-2 bg-transparent"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
