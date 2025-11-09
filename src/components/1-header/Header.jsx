// @ts-ignore
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

import { useThemeMode } from "../../context/ThemeContext";
import { useState, forwardRef } from "react";
import ModeToggle from "../../features/ModeToggle";

import navLinks from "../../data/navLinks.json";
import { useActiveLink } from "../../context/ActiveLinkContext";

const Header = forwardRef((props, ref) => {
  const theme = useTheme();
  // @ts-ignore
  const { themeMode, toggleTheme } = useThemeMode();
  const [anchorElNav, setAnchorElNav] = useState(null);

  // active link & scroll
  // @ts-ignore
  const { activeLink, handleClick } = useActiveLink();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      ref={ref}
      position="fixed"
      color="transparent"
      sx={{ boxShadow: "none", zIndex: (t) => t.zIndex.appBar, height: "75px" }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: theme.palette.background.paper,
          py: { xs: "0.5rem", md: "0.3rem" },
          borderLeft: `1px solid ${theme.palette.divider}`,
          borderRight: `1px solid ${theme.palette.divider}`,
          height: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }} />
          {/* Menu - small screens */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "3rem",
                height: "3rem",
                border: "1px solid",
                borderRadius: "50%",
                borderColor: "rgba(244 , 165 , 96 , 0.249)",
                transition: "0.4s",
                // @ts-ignore
                bgcolor: theme.palette.background.header,
                "&:hover": {
                  borderColor: "rgba(244 , 165 , 96 )",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{
                display: { xs: "block", md: "none" },

                "& .MuiPaper-root": {
                  width: "85vw",
                  mt: 2,
                  borderRadius: "10px",
                  bgcolor: theme.palette.background.default,
                  overflow: "hidden",
                  p: "0.5rem 1rem",
                },
              }}
            >
              {/* close button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                <IconButton onClick={handleCloseNavMenu}>
                  <CloseIcon
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: "1.5rem",
                      transition: "0.3s",
                      fontWeight: "bold",
                      "&:hover": {
                        fontSize: "1.7rem",
                        rotate: "180deg",
                        color: "crimson",
                      },
                    }}
                  />
                </IconButton>
              </Box>

              {/* links */}
              {navLinks.map((link, index) => {
                // safe hover color: use theme.palette.text.colorHover if exists, otherwise primary.main
                const hoverTextColor =
                  // @ts-ignore
                  (theme.palette.text && theme.palette.text.colorHover) ||
                  theme.palette.primary.main;

                return (
                  <Box key={link.label}>
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                        handleCloseNavMenu();
                      }}
                      sx={{
                        justifyContent: "flex-start",
                        py: 1.5,
                        bgcolor: "transparent", // لا نغيّر الخلفية أبداً
                        "&:hover": {
                          bgcolor: "transparent", // يمنع تغيير الخلفية على hover
                        },
                        // لما الـ MenuItem في حالة hover نغيّر لون النص الداخلي
                        "&:hover .navLinkText": {
                          color: hoverTextColor,
                          opacity: 1,
                        },
                      }}
                    >
                      <Typography
                        className="navLinkText"
                        sx={{
                          color:
                            activeLink === link.href
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                          textTransform: "capitalize",
                          fontWeight: activeLink === link.href ? 600 : 400,
                          transition: "color 0.2s ease, opacity 0.2s ease",
                          opacity: activeLink === link.href ? 1 : 0.85,
                          // لا تضع &:hover هنا — نحن نتحكم من MenuItem فوق
                        }}
                      >
                        {link.label}
                      </Typography>
                    </MenuItem>

                    {index < navLinks.length - 1 && (
                      <Divider sx={{ bgcolor: theme.palette.divider }} />
                    )}
                  </Box>
                );
              })}
            </Menu>
          </Box>

          {/* nav links - Large */}
          <Box
            sx={{
              border: "1px solid",
              borderRadius: "55px",
              borderColor: theme.palette.divider,
              p: "0.4rem 1.6rem",
              display: { xs: "none", md: "flex" },
              // @ts-ignore
              bgcolor: theme.palette.background.header,
              boxShadow: "1px 1px 2px rgba(35, 35 , 36 , 0.165)",
            }}
          >
            {navLinks.map((link) => (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                component="a"
                href={link.href}
                key={link.label}
                sx={{
                  //my: 2,
                  bgcolor: "transparent",
                  color:
                    activeLink === link.href
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  display: "block",
                  textTransform: "capitalize",
                  opacity: activeLink === link.href ? 1 : 0.8,
                  transition: "color 0.3s ease , opacity 0.2 ease",
                  "&:hover": {
                    opacity: "1",
                    // @ts-ignore
                    color: theme.palette.text.colorHover,
                    bgcolor: "transparent",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          {/* Toggle Theme button */}
          <ModeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
});
export default Header;
