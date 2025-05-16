import Image from "next/image";
import HeroSection from "@/components/homepageComponent/hero";
import SearchDoctor from "@/components/homepageComponent/searchForDoctorSection";
import DiscoverExpert from "@/components/homepageComponent/discoverExpert";
import HelpToFind from "@/components/homepageComponent/helpToFind";
import InstantAppointment from "@/components/homepageComponent/instantAppointment";
import TopDoctors from "@/components/homepageComponent/topDoctors";
import ReadStory from "@/components/homepageComponent/readStory";
import NewsAndBlogs from "@/components/homepageComponent/newsAndBlogs";
import Testimonial from "@/components/homepageComponent/testimonial";
export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchDoctor />
      <DiscoverExpert />  
      <HelpToFind />
      <InstantAppointment />
      <TopDoctors />
      <Testimonial />
      <ReadStory />
      <NewsAndBlogs />
    </>
  );
}
