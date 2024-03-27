"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";

const Search_Items = ({
  show_search_items,
  setshow_search_items,
  search_text,
  setsearch_text,
}: any) => {
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  const [nav_array, setnav_array] = useState([
    {
      link: "/admin/dashboard",
      txt: "Dashboard",
    },
    {
      link: "/admin/postupload",
      txt: " add post",
    },
    {
      link: "/admin/digitalsales",
      txt: "Digital sales",
    },
    {
      link: "/admin/digitaluploads",
      txt: "Digital Uploads",
    },
    {
      link: "/admin/postinsight",
      txt: "Posts & Insights",
    },

    {
      link: "/admin/add-moderator",
      txt: "add moderator",
    },
    {
      link: "/admin/moderator-all",
      txt: "All Moderator Chats",
    },
    {
      link: "/admin/forge-upload",
      txt: "Add forge (upload)",
    },
    {
      link: "/admin/chats",
      txt: "current Chats sessions",
    },
  ]);

  const [filteredArray, setFilteredArray] = useState([...nav_array]);

  const ref = useRef<any>(null);

  const pathname = usePathname();

  useEffect(() => {
    setFilteredArray(
      nav_array.filter((item) =>
        item.txt.toLowerCase().includes(search_text.toLowerCase()),
      ),
    );
  }, [search_text, nav_array]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (event.target.classList.contains("search")) {
          return;
        } else {
          setshow_search_items(false);
          setsearch_text("");
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        ref={ref}
        className="w-[23vw]  h-[15vw] overflow-hidden  rounded-[2vw]  absolute top-[4vw] right-0 z-[99999] "
      >
        <div className=" bg-[#E7E6E8] w-full h-full rounded-[2vw] flex flex-col overflow-y-scroll scroll-container scroll-container_search_items">
          {filteredArray.map((e: any, index: any) => {
            return (
              <Link
                href={e.link}
                // target="_blank"
                key={index}
                onClick={() => {
                  if (pathname == e.link) {
                    setpage_loader(false);
                  } else {
                    setpage_loader(true);
                  }
                }}
                className="w-full border-b-black hover:bg-black hover:text-white border-[0.1vw] py-[1vw] text-center text-[1.3vw] neuer  capitalize "
              >
                {e.txt}
              </Link>
            );
          })}

          {filteredArray.length == 0 && (
            <div className="w-full h-full flex justify-center items-center text-[1vw] neuer">
              {" "}
              Sorry nothing matches your search{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search_Items;
