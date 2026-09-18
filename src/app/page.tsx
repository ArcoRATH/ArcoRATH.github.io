import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Marquee from "@/components/Marquee";
import Contact, { Footer } from "@/components/Contact";
import { site } from "@/lib/data";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adarsh Mishra",
  alternateName: "ArcoRATH",
  jobTitle: "Backend Engineer",
  email: `mailto:${site.email}`,
  alumniOf: "IIT (BHU), Varanasi",
  url: "https://arcorath.github.io",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <Nav />
      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
