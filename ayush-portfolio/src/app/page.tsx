import { getContent } from "@/lib/content";
import { ContentProvider } from "@/components/ContentProvider";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Terminal from "@/components/Terminal";
import AccentSwitcher from "@/components/AccentSwitcher";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const content = await getContent();
  const { site } = content;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayushkapoor.in",
    address: { "@type": "PostalAddress", addressRegion: "Himachal Pradesh", addressCountry: "IN" },
    worksFor: {
      "@type": "Organization",
      name: "Centre for Artificial Intelligence and Robotics (CAIR), IIT Mandi",
    },
    sameAs: site.socials.map((social) => social.href),
  };

  return (
    <ContentProvider content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Preloader />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Terminal />
      <AccentSwitcher />
    </ContentProvider>
  );
}
