"use client";

import React, { useEffect, useRef } from "react";
import { useWallet } from "@lazorkit/wallet";

type Props = {
  onConnect: (walletAddress: string) => void;
};

export default function PasskeyLogin({ onConnect }: Props) {
  const { connect, smartWalletPubkey, isConnecting } = useWallet();
  const hasConnectedRef = useRef(false);

  const handleLogin = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Passkey login failed:", error);
    }
  };

  useEffect(() => {
    if (!smartWalletPubkey) return;
    if (hasConnectedRef.current) return;

    hasConnectedRef.current = true;

    setTimeout(() => {
      onConnect(smartWalletPubkey.toBase58());
    }, 0);
    
  }, [smartWalletPubkey, onConnect]); 

  return (
    <button onClick={handleLogin} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Continue with Passkey"}
    </button>
  );
}