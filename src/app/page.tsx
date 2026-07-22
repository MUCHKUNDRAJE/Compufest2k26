import About from '@/components/About';
import Dashboard from '@/components/Dashboard';
import EventLanding from '@/components/EventsLanding';
import Footer from '@/components/footer';
import Mario from '@/components/mario';
import HeroSection from '@/components/MineCraft';
import Runner from '@/components/Runner';
import Timeline from '@/components/Timeline';
import UseTimeline from '@/components/useTimeline';
import Past from "@/components/past"


export default function Home() {
  return (
    <main className="min-h-screen  bg-zinc-{#5B3922">
      <HeroSection />
      <About />
      <EventLanding />
      <UseTimeline />
      <Past/>
      {/* <Usematerial/> */}
      <Footer />
    </main>
  );
}
