import Footer from '@/components/GeneralComponents/Footer/Footer';
import Header from '@/components/GeneralComponents/Header/Header';
import PageDashboard from '@/components/PageDashboard/PageDashboard';

export default function Page() {
  return (
    <main className="flex flex-col gap-0 row-start-2 items-center sm:items-start select-none">
      <Header />
      <PageDashboard />
      <Footer />
    </main>
  );
}
