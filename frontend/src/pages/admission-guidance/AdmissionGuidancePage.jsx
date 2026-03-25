import React from "react";
import Hero from "./Hero";
import OpenBoard from "./OpenBoard";
import TraditionalUgPg from "./TraditionalUgPg";
import CouncilCourse from "./CouncilCourse";
import ResearchProgram from "./ResearchProgram";
import FreeConsultation from "./FreeConsultation";

export default function AdmissionGuidancePage() {
  return (
    <>
      <Hero />
      <OpenBoard />
      <TraditionalUgPg />
      <CouncilCourse />
      <ResearchProgram />
      <FreeConsultation />
    </>
  );
}
