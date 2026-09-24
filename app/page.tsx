import AllRestaurants from '@/components/Allrestaurants';
import Footer from '@/components/Footer';
import ForYouSection from '@/components/Foryousection';
import Hero from '@/components/Hero-page';
import MoodPicker from '@/components/Moodpicker';
import Navber from '@/components/Navber';
import OpenNowSection from '@/components/Opennowsection';
import Testimonials from '@/components/Testimonials';
export default function Home() {
  return (
    <>
      <Navber />
      <Hero />
      <OpenNowSection />
      <ForYouSection />
      <MoodPicker />
      <AllRestaurants />
      <Testimonials />
      <Footer />
    </>
  );
}
