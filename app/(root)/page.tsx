import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return ( 
    <>
      <section className="bg-slate-100 py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Social, Educational and Fun activities for your kids</h1>
            <p className="p-regular-20 md:p-regular-24">
              Find activities to keep your kids entertained, any time of the year!
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit bg-sky-800">
              <Link
                href="#Events">
                  Explore Now
                </Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="Hero Image" 
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"/>

        </div>

      </section>

      <section id="events" className="my-8 wrapper flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Find the perfect activity for your kids!
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          Category Filter
        </div>

      </section>
    </>
   );
}
 
export default LandingPage;