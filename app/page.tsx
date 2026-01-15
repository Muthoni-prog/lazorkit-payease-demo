"use client";

import { useState, useEffect, useCallback } from "react";
import PasskeyLogin from "../components/PasskeyLogin";
import WalletStatus from "../components/WalletStatus";
import PayWithSolana from "../components/PayWithSolana";
import PaymentSuccess from "../components/PaymentSuccess";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hasPaid, setHasPaid] = useState(false);

  const handleConnect = useCallback((address: string) => {
    setWalletAddress(address);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setHasPaid(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>PayEase Demo</h1>
      <p>Pay with Solana using biometrics. No wallet. No seed phrase. No gas.</p>

      {!walletAddress && <PasskeyLogin onConnect={handleConnect} />}

      {walletAddress && !hasPaid && (
        <>
          <WalletStatus address={walletAddress} />
          <PayWithSolana onSuccess={handlePaymentSuccess} />
        </>
      )}

      {hasPaid && <PaymentSuccess />}
    </main>
  );
}
