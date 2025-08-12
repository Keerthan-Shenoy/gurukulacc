
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { Courses } from "@/components/landing/Courses";
import { ConceptGallery } from "@/components/landing/ConceptGallery";
import { AiTools } from "@/components/landing/AiTools";
import { Footer } from "@/components/landing/Footer";
import { AdmissionsOpenBanner } from "@/components/landing/AdmissionsOpenBanner";


export default function Home() {
  return (
      <div className="flex flex-col min-h-dvh text-foreground">
        <Header />
        <main className="flex-1">
          <Hero />
          <AdmissionsOpenBanner />
          <About />
          <WhyChooseUs />
          <Courses />
          <ConceptGallery />
          <AiTools />
          <Footer />
        </main>
      </div>
  );
}
