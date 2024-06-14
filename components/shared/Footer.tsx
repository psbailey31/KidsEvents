import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className=" flex text-3xl">
          <Image 
              src="/logopiconly.png"
              alt="Logo"
              width={50}
              height={18}
            />
            <p className="pl-2 pt-2 text-sky-800">Kids Events</p>
        </Link>
        <p>&copy; 2024 Kids Events. All Rights Reserved.<br />
        <small><small><a href="https://pikbest.com//png-images/kids-play-holi_10063682.html">Free png images from pikbest.com</a></small></small></p>
        </div>
    </footer>
  )
}

export default Footer
