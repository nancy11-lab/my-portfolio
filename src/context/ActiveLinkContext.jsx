import { createContext, useState, useEffect, useContext } from "react";
import navLinks from "../data/navLinks.json";

const ActiveLinkContext = createContext({});

export const ActiveLinkProvider = ({ children, headerRef }) => {
  // active link & scroll
  const [activeLink, setActiveLink] = useState("#about");

  useEffect(() => {
    // const headerOffset = 100;
    const handleScroll = () => {
      const headerHeight = headerRef?.current?.offsetHeight || 100;

      const scrollPos = window.scrollY + headerHeight + 1; // هامش بسيط علشان الـ header
      const offsetMargin = 48; // 3rem = 48px
      let found = false;

      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (!section) continue;
        // @ts-ignore
        const top = section.offsetTop; // المسافه من اعلي الdocument to section
        // @ts-ignore
        const bottom = top + section.offsetHeight; //section ارتفاع ال
        if (scrollPos >= top - offsetMargin && scrollPos < bottom) {
          setActiveLink(link.href);
          found = true;
          break;
        }
      }
      if (!found) {
        return;
      }
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
    const section = document.querySelector(href);
    if (!section) return;

    const headerHeight = headerRef?.current?.offsetHeight || 0;
    const offsetMargin = 48; // 3rem = 48px
    const top = section.offsetTop - headerHeight - offsetMargin; // خصم ارتفاع ال header
    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setActiveLink(href);
  };

  return (
    <ActiveLinkContext.Provider value={{ activeLink, handleClick }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => useContext(ActiveLinkContext);
