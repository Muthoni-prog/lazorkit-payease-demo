"use client";

import { useWallet } from "@lazorkit/wallet";
import { useState } from "react";
import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";

type Props = {
  onSuccess: (txSignature: string) => void;
};

export default function PayWithSolana({ onSuccess }: Props) {
  const { smartWalletPubkey, signAndSendTransaction } = useWallet();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!smartWalletPubkey) {
      setError("Wallet not connected");
      return;
    }

    setIsPaying(true);
    setError(null);

    try {
      const instruction: TransactionInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: new PublicKey(
          process.env.NEXT_PUBLIC_MERCHANT_WALLET || "DemoMerchantWalletAddressHere"
        ),
        lamports: 1_000_000, // 0.001 SOL
      });

      const signature = await signAndSendTransaction({ instructions: [instruction] });

      console.log("Transaction signature:", signature);

      onSuccess(signature);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment failed");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3>Demo Payment</h3>
      <p>Merchant: Demo Merchant</p>
      <p>Amount: 0.001 SOL (demo, gasless)</p>

      <button onClick={handlePayment} disabled={isPaying}>
        {isPaying ? "Processing..." : "Pay with Solana (Gasless)"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
