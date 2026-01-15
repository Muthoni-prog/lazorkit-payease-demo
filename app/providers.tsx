"use client";

import { LazorkitProvider } from "@lazorkit/wallet";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <LazorkitProvider
     

      rpcUrl={process.env.NEXT_PUBLIC_SOLANA_RPC}
      
    >
      {children}
    </LazorkitProvider>
  );
}
      