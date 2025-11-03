import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { DarkMode, LightMode } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

import { useThemeMode } from "../context/ThemeContext";

const ModeToggle = () => {
  const theme = useTheme();
  // @ts-ignore
  const { themeMode, toggleTheme } = useThemeMode();

  return (
    <Box
      sx={{
        width: "3rem",
        height: "3rem",
        border: "1px solid",
        borderRadius: "50%",
        borderColor: "rgba(244 , 165 , 96 , 0.249)",
        // @ts-ignore
        bgcolor: theme.palette.background.header,
        transition: "all 0.3s ease",
        boxShadow: "1px 1px 2px rgba(35, 35 , 36 , 0.165)",
        "&:hover": {
          borderColor: "rgba(244 , 165 , 96 )",
        },
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: "100%",
          height:"100%",
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {themeMode === "dark" ? (
            <motion.div
              key="light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DarkMode sx={{ color: "#fff !important", fontSize: "1.7rem"}} />
            </motion.div>
          ) : (
            <motion.div
              key="dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LightMode
                sx={{
                  color: "rgb(255, 165 , 0) !important",
                  fontSize: "1.7rem",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </IconButton>
    </Box>
  );
};

export default ModeToggle;
