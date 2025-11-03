import { createContext, useState, useEffect, useContext } from "react";
import navLinks from "../data/navLinks.json";

const ActiveLinkContext = createContext({});

export const ActiveLinkProvider = ({ children, headerRef }) => {
  // active link & scroll
  const [activeLink, setActiveLink] = useState("#about");

  useEffect(() => {
    // const headerOffset = 100;
    const handleScroll = () => {
      const headerOffset = headerRef?.current
        ? headerRef.current.offsetHeight
        : 100;
      const scrollPos = window.scrollY + headerOffset + 1; // هامش بسيط علشان الـ header

      for (const link of navLinks) {
        // if (!link.href.startsWith("#") || link.href === "#") continue;
        const section = document.querySelector(link.href);
        if (!section) continue;
        // @ts-ignore
        const top = section.getBoundingClientRect().top + window.scrollY;
        // @ts-ignore
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveLink(link.href);
          return;
        }
        // console.log("found section", section);
      }
      // if no section matched , clear active (optional)
      // setActiveLink("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headerRef]);

  //عند الضغط علي اللينك
  const handleClick = (href) => {
    setActiveLink(href);
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    console.log("click link from footer", href);
  };

  return (
    <ActiveLinkContext.Provider value={{ activeLink, handleClick }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => useContext(ActiveLinkContext);
