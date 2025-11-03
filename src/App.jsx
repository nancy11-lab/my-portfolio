import HeroSection from "./components/2-hero/HeroSection";
import Header from "./components/1-header/Header";
import MainContent from "./components/3-mainContent/MainContent";
import ContactUs from "./components/4-contactUs/ContactUs";
import Footer from "./components/5-footer/Footer";

import { Box, Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import ScrollTopButton from "./components/common/ScrollTopButton";
import { useRef } from "react";
import { ActiveLinkProvider } from "./context/ActiveLinkContext";

function App() {
  const theme = useTheme(); // بتجيب الثيم الي جه من الthemeprovider
  const headerRef = useRef(null);

  return (
    <ActiveLinkProvider headerRef={headerRef}>
      <div>
        <Container
          maxWidth="md"
          disableGutters // بيلغي الpadding
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: "1px solid",
            borderColor: theme.palette.divider,
            p: { xs: "0 1rem", md: "0 2rem" },
          }}
        >
          <Header ref={headerRef} />
          {/* <Divider /> */}
          <Box id="about" component="section" sx={{ scrollMarginTop: "80px" }}>
            <HeroSection />
          </Box>
          <Divider />
          <Box
            id="project"
            component="section"
            sx={{ scrollMarginTop: "80px" }}
          >
            <MainContent />
          </Box>
          <Divider />
          <Box
            id="contact"
            component="section"
            sx={{ scrollMarginTop: "80px" }}
          >
            <ContactUs />
          </Box>
          <Divider />
          <Box id="footer" component="footer" sx={{ scrollMarginTop: "80px" }}>
            <Footer />
          </Box>
        </Container>
        <ScrollTopButton />
      </div>
    </ActiveLinkProvider>
  );
}

export default App;
//  http://localhost:5173/
