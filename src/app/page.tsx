import Dashboard from '@/components/Dashboard';
import Footer from '@/components/footer';
import Mario from '@/components/mario';
import HeroSection from '@/components/MineCraft';
import Runner from '@/components/Runner';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
  <HeroSection/>
  <Runner/>
  <Footer/>
    </main>
  );
}
