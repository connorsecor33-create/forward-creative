import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Studio />
      <Services />
      <Work />
      <Philosophy />
      <Process />
      <Contact />
    </>
  );
}
