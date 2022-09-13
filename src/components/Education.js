import React from "react";
import { Container, Title } from "./common"
import edu_1 from "../assets/image/edu_2.jpg"


const Education = () => {
return (
<div id="education">
  <Container>
    <Title title="Education" />
    <div className="md:pl-24 flex flex-wrap">
        <div className="flex flex-wrap w-full">
            <div className="lg:w-1/2 md:w-1/2">
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1b7443] inline-flex items-center justify-center text-white relative z-10">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <p className="leading-relaxed">
                        Title of awarded qualification: B.Sc (CSE) <br />
                        Institute  : Daffodil International University <br />
                        Session: 2016-2020
                    </p>
                </div>
                </div>
                <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1b7443] inline-flex items-center justify-center text-white relative z-10">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                </div>
                <div className="flex-grow pl-4">
                    <p className="leading-relaxed">
                        Title of awarded qualification: HSC(Science) <br />
                        Institute : Dr.Azhar udddin degree college <br />
                        Session: 2013-2014 <br />
                    </p>
                </div>
                </div>
                <div className="flex relative pb-12">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1b7443] inline-flex items-center justify-center text-white relative z-10">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                            <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <p className="leading-relaxed">
                            Title of awarded qualification: SSC(Science) <br />
                            Institute : Lalmohan Gov’t High School  <br />
                            Session: 2011-2012
                        </p>
                    </div>
                </div>
            </div>
            <img className="lg:w-1/2 md:w-1/2 object-contain object-center rounded-lg"
                src={edu_1}
                alt="step"
            />
        </div>
    </div>
  </Container>
</div>
)
}

export { Education }