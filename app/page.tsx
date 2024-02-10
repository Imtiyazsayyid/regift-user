"use client";

import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/donor");
  }, []);

  return (
    <main className="h-[100vh] p-10 flex items-center justify-center">
      <CircularProgress color="primary" aria-label="Loading..." />
    </main>
  );
}
