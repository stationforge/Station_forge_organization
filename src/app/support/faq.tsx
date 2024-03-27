import { useState } from "react";

const FAQItem = (props: any) => {
  const { title, description } = props;
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="faq-item sm:rounded-[3vw] sm:w-[95vw] sm:py-[4vw] rounded-[1.2vw] bg-[#111111] py-[1.5vw] px-[2vw] sm:px-[4vw] w-[48vw]">
      <div
        className="flex items-center  w-full justify-between cursor-pointer"
        onClick={toggleExpansion}
      >
        <span className="text-[1.3vw] sm:text-[3.5vw] neuer text-[#CCFF00] faq-title-text">
          {title}
        </span>
        <span className="mr-2 text-white">
          <i
            className={`bi bi-${
              expanded ? "dash" : "plus"
            } sm:text-[7vw] text-[2.2vw]`}
          ></i>
        </span>
      </div>
      <div
        className={`faq-description text-white sm:text-[3vw] text-[1.15vw] ${
          expanded ? "block" : "hidden"
        } mt-2`}
      >
        {description}
      </div>
    </div>
  );
};

export default FAQItem;
