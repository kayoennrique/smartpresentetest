import Header from "@/components/GeneralComponents/Header/Header";

import MainFaq from "@/components/PageFaq/MainFaq/MainFaq";
import ContactFaq from "@/components/PageFaq/ContactFaq/ContactFaq";

import Footer from "@/components/GeneralComponents/Footer/Footer";

export default function Page() {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <Header />
      <MainFaq />
      <ContactFaq />
      <Footer />
    </main>
  );
}
