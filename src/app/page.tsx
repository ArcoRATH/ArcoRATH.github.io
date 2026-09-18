import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Marquee from "@/components/Marquee";
import World from "@/components/World";
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
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faridabad",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
  },
  url: "https://arcorath.github.io",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none fixed inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_42%_38%_at_16%_8%,rgba(94,234,212,0.07),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_45%_40%_at_85%_62%,rgba(216,162,74,0.06),transparent_70%)]"
      />
      <Nav />
      <main className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Stack />
        <World />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
