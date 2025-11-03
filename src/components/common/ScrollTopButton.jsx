import { Button, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const theme = useTheme();

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // clean up (unmount)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Button
        onClick={scrollToTop}
        variant="outlined"
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          minWidth: "50px",
          height: "50px",
          borderRadius: "50%",
          padding: 0,
          zIndex: 1000,
          opacity: { xs: showButton ? 0.6 : 0, sm: showButton ? 1 : 0 },
          pointerEvents: showButton ? "auto" : "none",
          transition: " 0.7s ease",
          borderColor: theme.palette.divider,
          bgcolor: "rgba(25 , 118 , 210 , 0.85)",
          "&:hover": {
            bgcolor: "rgba(25 , 118 , 210 )",
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: "#fff", fontWeight: "bold" }} />
      </Button>
    </>
  );
}
