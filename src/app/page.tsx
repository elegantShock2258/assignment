"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  let router = useRouter();
  return (
    <div className="w-full h-full flex items-center justify-center gap-[10px]">
      <Button
        variant="outline"
        onClick={() => {
          router.push("/forms/a");
        }}
      >
        Form A
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          router.push("/forms/b");
        }}
      >
        Form B
      </Button>
    </div>
  );
}
