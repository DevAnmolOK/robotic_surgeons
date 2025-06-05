"use client";
import { useState } from "react";
interface DoctorDetailsProp {
  detail: any;
}

export default function DoctorDetails({ detail }: DoctorDetailsProp) {
  const [activeTab, setActiveTab] = useState(detail[0].label);
  //   const activeContent = detail.find((tab: any) => tab.label)?.content;
  const activeContent = detail.find(
    (tab: any) => tab.label === activeTab
  )?.content;
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex gap-[1.75rem] pl-[1.75rem] py-[0.75rem] text-[1.188rem] font-medium leading-[2rem] border-b border-[#EAEAEA] whitespace-nowrap">
            {detail.map((tab: any, index: any) => (
              <div
                key={index}
                onClick={() => setActiveTab(tab.label)}
                className={`cursor-pointer flex-shrink-0 ${
                  activeTab === tab.label ? "text-black" : "text-[#898989]"
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* tab content */}
        {activeTab === "Introduction" && typeof activeContent === "object" ? (
          <div className="px-[1.75rem] pt-[1.25rem] pb-[4rem]">
            <div className="space-y-6 ">
              {/* Introduction Paragraph */}
              <p className=" leading-[2rem] text-plg font-normal font-sans">
                {activeContent.introduction}
              </p>

              {activeContent.speciality &&
              <div>
              <div className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Specialties:
                </div>
                <p className=" leading-[2rem] text-plg font-normal font-sans">{activeContent.speciality}</p>
                </div>
              }

              {activeContent.HospitalAffiliations &&
              <div>
              <div className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Hospital Affiliations:
                </div>
                <p className=" leading-[2rem] text-plg font-normal font-sans">{activeContent.HospitalAffiliations}</p>
                </div>
              }

              {activeContent.LanguagesSpoken &&
              <div>
              <div className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Languages Spoken:
                </div>
                <p className=" leading-[2rem] text-plg font-normal font-sans">{activeContent.LanguagesSpoken}</p>
                </div>
              }

              {/* Areas of Expertise */}
              {/* {activeContent.areasOfExpertise &&
              <div>
                <div className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Areas of Expertise:
                </div>
                <div dangerouslySetInnerHTML={{ __html: activeContent.areasOfExpertise}} />
              </div>
             } */}


              {/* Education & Training */}
              {activeContent.education &&
              <div>
                <div className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Education & Training:
                </div>
                <div dangerouslySetInnerHTML={{ __html: activeContent.education}} />
              </div>
              }

              {/* Patient Philosophy */}
              <div>
                <h3 className="font-semibold leading-[2rem] text-[1.375rem] mb-2">
                  Patient Philosophy:
                </h3>
                <blockquote className="italic text-plg leading-[2rem] font-normal border-l-4 pl-4 border-gray-300">
                  {activeContent.philosophy}
                  <footer className="mt-2 not-italic">
                    — {activeContent.quoteAuthor}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-plg sm:px-[1.75rem] px-[1 rem] py-[1.25rem]">
            {activeContent}
          </div>
        )}
      </div>
    </>
  );
}
