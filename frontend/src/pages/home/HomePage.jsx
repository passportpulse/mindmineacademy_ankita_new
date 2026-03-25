import CampusesSection from "./CampusesSection";
import AcademicsSection from "./AcademicsSection";
import AdmissionProcess from "./AdmissionProcess";
import AdmissionsOpen from "./AdmissionsOpen";
import ExcellenceSection from "./ExcellenceSection";
import HomeHeroSection from "./HomeHeroSection";
import SkillProgramsSection from "./SkillProgramsSection";
import WhyChooseMindmine from "./WhyChooseMindmine";

export default function Homepage() {
  return (
    <>
      <HomeHeroSection />
      <ExcellenceSection/>
      <AcademicsSection/>
      {/* <SkillProgramsSection/> */}
      <AdmissionProcess/>
      <CampusesSection/>
      <WhyChooseMindmine/>
      <AdmissionsOpen/>
    </>
  );
}
