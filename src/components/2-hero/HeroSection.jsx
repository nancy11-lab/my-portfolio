import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import Lottie from "lottie-react";
import developerAnimation from "../../animation/developer.json";

const words = ["Nancy Elsayed", "Frontend Developer", "UI Engineer"];
function HeroSection() {
  const theme = useTheme();
  // <!-- State typeWriter Effect -->
  const [text, setText] = useState(" ");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [cursorVisible, setCursorVisible] = useState(true); //للوميض
  const [isVisible, setIsVisible] = useState(false); // للتحكم في الفيد-إن

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const delayBetweenWords = 1500;

  useEffect(() => {
    setIsVisible(true); // بمجرد ما الكومبوننت يركب، يبدأ fade-in
  }, []);

  useEffect(() => {
    let typingTimeout;
    // const currentText = words[index]; //بحفظ فيها الجمله الي انا فيها دلوقتي
    // لما الكلمه تتكتب بالكامل
    if (!isDeleting && text === words[index]) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } else if (isDeleting && text === "") {
      //لما المسح يخلص انتقل للجمله الي بعدها
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      // الكتابه او المسح حرف حرف
      typingTimeout = setTimeout(
        () => {
          const currentWord = words[index] || ""; // if words[index] not found use empty string ""
          const nextText = isDeleting
            ? currentWord.substring(0, text.length - 1)
            : currentWord.substring(0, text.length + 1);
          setText(nextText);
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    //clean up component unmount
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [text, isDeleting, index, words]);

  // cursor 500ms
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    // clean up
    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <Box
      id="about"
      component="section"
      sx={{ mt: "7rem", gap: "0.5rem" }}
      display="flex"
      alignItems="center"
    >
      {/* Box-Info */}
      <Box component="div" sx={{ flexGrow: "1" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 1,
            color: theme.palette.text.primary,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { md: "0.3rem" },
            fontSize: "2.5rem",
          }}
        >
          Hello, I’m{" "}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              display: "inline-block",
              textShadow:
                !isDeleting && text !== ""
                  ? theme.palette.mode === "dark"
                    ? "0 0 8px rgba(255, 255 , 255 , 0.4)"
                    : "0 0 8px rgba(0, 0 , 0 , 0.2)"
                  : "none",
            }}
          >
            <Box
              component="span"
              sx={{
                color:
                  // @ts-ignore
                  theme.palette.text.colorHover,
                display: { xs: "block", md: "inline" },
              }}
            >
              {text}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "10px",
                  ml: "2px",
                  color: theme.palette.text.secondary,
                  opacity: cursorVisible ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              >
                |
              </Box>
            </Box>
          </motion.span>
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: "450px",
            lineHeight: 1.7,
            mb: 5,
            fontSize: "1.4rem",
          }}
        >
          I craft responsive and accessible web interfaces using React and
          modern UI libraries, turning designs into functional experiences.
        </Typography>
        {/* Social Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* // Icon GitHub */}
          <IconButton
            component="a"
            href="https://github.com/nancy11-lab"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.text.primary,
              transition: "color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                // @ts-ignore
                color: theme.palette.text.colorHover,
                transform: "scale(1.2)",
                bgcolor: "transparent",
              },
            }}
          >
            <GitHub fontSize="large" />
          </IconButton>
          {/* // Icon LinkedIn */}
          <IconButton
            component="a"
            href="https://linkedin.com/in/YourLinkedinUsername"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.text.primary,
              transition: "color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                color: "#0A66C2", // لون لينكدإن الرسمي
                transform: "scale(1.2)",
                bgcolor: "transparent",
              },
            }}
          >
            <LinkedIn fontSize="large" />
          </IconButton>
          {/* Icon Gmail */}
          <IconButton
            component="a"
            href="mailto:nancyelsayed167@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.text.primary,
              transition: "color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                // @ts-ignore
                color: theme.palette.text.colorHover,
                transform: "scale(1.2)",
                bgcolor: "transparent",
              },
            }}
          >
            <Email fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      {/* Box-Animation */}
      <Box
        component="div"
        sx={{
          display: {
            xs: "none",
            md: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Lottie
          animationData={developerAnimation}
          autoplay={true}
          loop={true}
          style={{ width: 260, height: 250 }}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;
