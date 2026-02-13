import { HeroSection } from "../components/HeroSection";
import { ExpertiseSection } from "../components/ExpertiseSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { BureauSection } from "../components/BureauSection";
import { NewsSection } from "../components/NewsSection";
import { SustainabilitySection } from "../components/SustainabilitySection";
import { ContactSection } from "../components/ContactSection";
import { KeyStatsSection } from "../components/KeyStatsSection";
import { ProcessSection } from "../components/ProcessSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { MapSection } from "../components/MapSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <KeyStatsSection />
      <ExpertiseSection />
      <ProcessSection />
      <ProjectsSection />
      <MapSection />
      <CertificationsSection />
      <BureauSection />
      <NewsSection />
      <SustainabilitySection />
      <ContactSection />
    </>
  );
}
