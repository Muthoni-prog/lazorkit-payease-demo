"use client";

type Props = {
  address: string;
};

export default function WalletStatus({ address }: Props) {
  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Wallet Connected</h3>
      <p>
        Address: {address.slice(0, 6)}...{address.slice(-4)}
      </p>
      <p>USDC Balance: 5.00 (demo)</p>
    </div>
  );
}
