import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center px-4 text-center">

        <ClerkLoaded>
          <SignUp path="/sign-up" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground" />
        </ClerkLoading>
      </div>
      <div className="h-full bg-slate-100 hidden lg:flex flex-col items-center justify-center">
        <Image src="/logo.png" height={200} width={600} alt={"Logo"}
        />
      </div>


    </div>
    
  )
}