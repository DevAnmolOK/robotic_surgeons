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

  const blogsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?per_page=4`
  );
  const latestBlogs = await blogsData.json();

  const data = blockData.data || {};
  const blogs = latestBlogs || [];

  return (
    <>
      {data.homepagebanner && <HeroSection bannerData={data.homepagebanner} />}
      <SearchDoctor />
      {data.homediscoverexpert && (
        <DiscoverExpert expertsData={data.homediscoverexpert} />
      )}
      {data.homefindbestsurgeon && (
        <HelpToFind helpToFindData={data.homefindbestsurgeon} />
      )}
      {data.homerobotappointment && (
        <InstantAppointment
          InstantAppointmentData={data.homerobotappointment}
        />
      )}
      <TopDoctors />
      {data.hometestimonial && (
        <Testimonial testimonialsData={data.hometestimonial} />
      )}
      {data.homereadstory && <ReadStory readStoryData={data.homereadstory} />}
      {blogs.data.length > 0 && <NewsAndBlogs latestBlogs={blogs} />}
    </>
  );
}
