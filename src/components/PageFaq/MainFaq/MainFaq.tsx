"use client";

import { useState } from "react";

import CtaHeroFaq from "../CtaHeroFaq/CtaHeroFaq";
import SectionFaq from "../SectionFaq/SectionFaq";

export default function MainFaq() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <CtaHeroFaq searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <SectionFaq searchTerm={searchTerm} />
    </>
  );
}
