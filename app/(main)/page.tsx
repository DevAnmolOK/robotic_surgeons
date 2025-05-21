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


export default async function Home() {

  const homepageData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blocks`);
  const blockData = await homepageData.json();

  const blogsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?per_page=5`);
  const latestBlogs = await blogsData.json();

  return (
    <>
      {blockData.data.homepagebanner && <HeroSection bannerData={blockData.data.homepagebanner} /> }
      <SearchDoctor />
      {blockData.data.homediscoverexpert && <DiscoverExpert expertsData = {blockData.data.homediscoverexpert} />  }
      {blockData.data.homefindbestsurgeon && <HelpToFind helpToFindData = {blockData.data.homefindbestsurgeon} /> }
      {blockData.data.homerobotappointment && <InstantAppointment InstantAppointmentData = {blockData.data.homerobotappointment} /> }
      <TopDoctors />
      {blockData.data.hometestimonial && <Testimonial testimonialsData = {blockData.data.hometestimonial} /> }
      {blockData.data.homereadstory && <ReadStory readStoryData = {blockData.data.homereadstory} /> } 
      {latestBlogs.data.length > 0 && <NewsAndBlogs latestBlogs={latestBlogs} /> }
    </>
  );
}
