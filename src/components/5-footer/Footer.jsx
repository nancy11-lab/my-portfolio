import { Box, Button, Typography, useTheme } from "@mui/material";

import navLinks from "../../data/navLinks.json";
import { useActiveLink } from "../../context/ActiveLinkContext";

export default function Footer() {
  const theme = useTheme();
  // active link & scroll
  // @ts-ignore
  const { activeLink, handleClick } = useActiveLink();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: { xs: "1.3rem" },
        mb: "3rem",
      
      }}
    >
      {/* Links */}
      <Box
        sx={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {navLinks.map((link) => (
          <Button
            onClick={() => handleClick(link.href)}
            component="a"
            href={link.href}
            key={link.label}
            sx={{
              // border:"1px solid red",
              bgcolor: "transparent",
              color:
                activeLink === link.href
                  ? // @ts-ignore
                    theme.palette.text.colorHover
                  : theme.palette.text.primary,
              display: "block",
              textTransform: "capitalize",
              opacity: activeLink === link.href ? 1 : 0.8,
              transition: "color 0.3s ease , opacity 0.2 ease",
              "&:hover": {
                opacity: "1",
                color: theme.palette.primary.main,
                bgcolor: "transparent",
              },
            }}
          >
            {link.label}
          </Button>
        ))}
      </Box>
      {/* copyRight */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* copyRight */}
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          &copy; 2025 Nancy Elsayed.All rights reserved.
        </Typography>
        {/* Inspired */}
        <Typography
          component="p"
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          Inspired by a design I saw online.
        </Typography>
      </Box>
    </Box>
  );
}
