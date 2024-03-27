"use client";

import React, { useState } from "react";
import purchase_img from "../../../../public/support/accessing.webp";
import Image from "next/image";
import back from "../../../../public/support/back.png";
import { FadeInTransition } from "react-transitions-library";

import FAQItem from "../faq";
const Access = (props: any) => {
  const { goback } = props;
  const [faq_array, setfaq_array] = useState([
    {
      title: "How to make payments",
      des: "Lorem ipsum dolor sit amet consectetur. Congue cursus nulla vitae accumsan purus. Lectus hac fringilla eget eu elementum lorem. Nibh faucibus orci consectetur ultrices pulvinar ornare. Ultricies condimentum vestibulum eget diam et volutpat sagittis. Arcu ut elementum feugiat etiam sed iaculis. Eget fermentum viverra vestibulum at magna eget risus. Ac elit tristique in ultricies non non nibh.",
    },
    {
      title: "How much does each  subscription cost at renewal",
      des: "Lorem ipsum dolor sit amet consectetur. Congue cursus nulla vitae accumsan purus. Lectus hac fringilla eget eu elementum lorem. Nibh faucibus orci consectetur ultrices pulvinar ornare. Ultricies condimentum vestibulum eget diam et volutpat sagittis. Arcu ut elementum feugiat etiam sed iaculis. Eget fermentum viverra vestibulum at magna eget risus. Ac elit tristique in ultricies non non nibh.",
    },
    {
      title: "Can i resell",
      des: "Lorem ipsum dolor sit amet consectetur. Congue cursus nulla vitae accumsan purus. Lectus hac fringilla eget eu elementum lorem. Nibh faucibus orci consectetur ultrices pulvinar ornare. Ultricies condimentum vestibulum eget diam et volutpat sagittis. Arcu ut elementum feugiat etiam sed iaculis. Eget fermentum viverra vestibulum at magna eget risus. Ac elit tristique in ultricies non non nibh.",
    },
    {
      title: "Do i have to buy after purchase",
      des: "Lorem ipsum dolor sit amet consectetur. Congue cursus nulla vitae accumsan purus. Lectus hac fringilla eget eu elementum lorem. Nibh faucibus orci consectetur ultrices pulvinar ornare. Ultricies condimentum vestibulum eget diam et volutpat sagittis. Arcu ut elementum feugiat etiam sed iaculis. Eget fermentum viverra vestibulum at magna eget risus. Ac elit tristique in ultricies non non nibh.",
    },
  ]);
  return (
    <>
      <FadeInTransition
        timeout={1500}
        from={0}
        to={1}
        in={true}
        style={{ width: "100%" }}
      >
        <div className="w-full relative h-auto  flex flex-col items-center gap-[9vw]">
          {/* the back button */}
          <div className="absolute sm:top-[20vw] left-0 top-0">
            <button
              className=" text-white sm:text-[4vw] flex gap-[0.5vw] items-center text-[1.3vw] neuem "
              onClick={() => {
                goback();
              }}
            >
              <Image
                src={back}
                alt="back text ctn"
                className="text-white sm:w-[2vw] neue w-[0.8vw] h-fit "
              />
              Back
            </button>
          </div>
          {/* back button ends */}
          <div className="h-[8vw] sm:h-[25vw] sm:rounded-[3vw] sm:w-[50vw] sm:gap-[2vw] rounded-[1vw] bg-[#111111] cursor-pointer hover:bg-opacity-[70%] duration-[0.6s] transition flex-col w-[14vw] flex justify-center items-center gap-[1vw] ">
            <Image
              src={purchase_img}
              alt={"support purhcase img"}
              className="w-[1.5vw] sm:w-[5vw] h-fit"
            />
            <h3 className="neuer text-[1.2vw] sm:text-[4vw] text-[#CCFF00] capitalize">
              Accessing{" "}
            </h3>
          </div>
          <div className="w-full flex-col justify-center items-center gap-[3vw] flex sm:gap-[6vw]">
            {faq_array.map((e: any, index: any) => {
              return (
                <FAQItem key={index} title={e.title} description={e.des} />
              );
            })}
          </div>
        </div>
      </FadeInTransition>
    </>
  );
};
export default Access;
