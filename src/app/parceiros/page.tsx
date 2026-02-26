import Header from "@/components/GeneralComponents/Header/Header";

import ContactPartner from "@/components/PagePartner/ContactPartner/ContactPartner";

import Footer from "@/components/GeneralComponents/Footer/Footer";

export default function Page() {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <Header />
      <ContactPartner />
      <Footer />
    </main>
  );
}
