export default function PrivacyPolicy() {
  return (
    <>
      <div className=" h-full w-full flex items-center justify-center  flex-col">
        {/* herosection */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">Privacy Policy</h1>
          </div>
        </div>

        {/* contant */}
        <div className=" w-full bg-white h-auto">
          <div className=" sm:max-w-[70%] max-w-[85%] mx-auto w-full  text-black">
            <div className=" flex flex-col items-center justify-center py-[2.5rem]">
              <h2 className="text-t2 font-playfair font-bold ">
                Privacy Notice – Your Privacy Rights
              </h2>
              <div className="flex flex-col items-start pt-[1rem]">
                <div className="font-bold text-[1.75rem] font-sans leading-[2rem] mb-[1rem] ">
                  About This Privacy Notice
                </div>
                <p className="font-sans text-pxl font-normal leading-[2rem]">
                  This Privacy Notice describes the information and collection
                  practices on the websites, mobile applications, products, and
                  services (collectively “Services“) that link to this Privacy
                  Notice. These Services are provided by the provider companies
                  listed on Contracting Entities Table. It does not apply to our
                  use of employee or job applicant information.
                  <br /> We adhere to the principles of the EU-U.S. Data Privacy
                  Framework (DPF), the Swiss-U.S. DPF, and the UK extension to
                  the EU-U.S. DPF. To learn more, We may process your personal
                  information under an agreement with a third party and act as a
                  data processor. For example, if a business customer uploads a
                  contract for signature we will process the information under
                  instructions from the customer. In those cases, the terms of
                  that agreement may also govern how your information is used.
                  If you believe a third party has asked us to process your
                  personal information on their behalf, please contact them
                  first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
