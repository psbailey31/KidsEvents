import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link
          href="/"
          className=" flex text-3xl">
          <Image 
            src="/logopiconly.png"
            alt="Logo"
            width={50}
            height={18}
          />
          <p className="pl-2 pt-2 text-sky-800">Kids Events</p>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedOut>         
              <Button asChild className="rounded-full bg-sky-800 " size="lg">
                <Link
                  href="/sign-in">
                    Login
                  </Link>
              </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
        </div>
        
      </div>
    </header>
  )
}

export default Header
