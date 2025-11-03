import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const ThemeContext = createContext({});

// function getInitialMode() {
//   const savedMode = localStorage.getItem("themeMode");
//   if (savedMode) return savedMode;

//   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   return prefersDark ? "dark" : "light";
// }

export default function CustomThemeProvider({ children }) {
  // const [themeMode, setThemeMode] = useState(getInitialMode);
  const [themeMode, setThemeMode] = useState("dark");

  const toggleTheme = () => {
    const newMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  //  حفظ القيمة في localStorage عند أي تغيير
  // useEffect(() => {
    
  //   localStorage.setItem("themeMode", themeMode);
  // }, [themeMode]);

   useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if(savedMode)
    localStorage.setItem("themeMode", savedMode);
  setThemeMode(savedMode)
  }, [themeMode]);
  //  متابعة تغييرات الـ system theme
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  //   const handleChange = (e) => {
  //     const systemPrefersDark = e.matches;
  //     // لو مفيش قيمة محفوظة (يعني أول زيارة) → خليه يتأثر بالنظام
  //     const savedMode = localStorage.getItem("themeMode");
  //     if (!savedMode) {
  //       setThemeMode(systemPrefersDark ? "dark" : "light");
  //     }
  //   };

  //   mediaQuery.addEventListener("change", handleChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleChange);
  //   };
  // }, []);

  const theme = useMemo(() => {
    const lightText = {
      primary: "rgb(39 39  42)",
      secondary: "rgb(82 82 91)",
      colorHover: "rgb(0 , 149 , 246)",
    };

    const darkText = {
      primary: "#ffffff",
      secondary: "rgb(161 161 170)",
      colorHover: "rgb(93, 188 , 252)",
    };
    return createTheme({
      palette: {
        //@ts-ignore
        mode: themeMode,
        background:
          themeMode === "light"
            ? // @ts-ignore
              { default: "rgb(250, 250, 250)", paper: "rgb(255, 255, 255)", header: "rgb(253, 253 , 253)" }
            : {
                default: "#000000",
                paper: "rgb(24 24 27)",
                header: "rgb(39 , 39 , 42)",
              },
        text: themeMode === "light" ? lightText : darkText,
        divider:
          themeMode === "light"
            ? "rgba( 202 , 202 , 202 , 0.518)"
            : "rgba( 63 , 63 , 70 , 0.4)",
        borderForm: themeMode === "light" ? "rgb(78 80 80)" : "rgb(92,232,220)",
      },//rgb(92,232,220)   rgb(45 212 191)
      typography: {
        fontFamily: ["robotooo", "Arial", "sans-serif"].join(","),
      },
      components: {
        MuiDivider: {
          styleOverrides: {
            root: ({ theme }) => ({
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.divider
                  : theme.palette.divider,
              transition: "border-color 0.3s ease",
              margin: "3rem 0",
              // عشان يخرج من padding in container
              "@media(max-width:600px)": {
                marginLeft: "-0.7rem",
                marginRight: "-0.7rem",
                width: "calc(100% + 0.7rem * 2)",
              },
              "@media(min-width:600px)": {
                marginLeft: "-2rem",
                marginRight: "-2rem",
                width: "calc(100% + 2rem * 2)",
              },
            }),
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: ["robotooo", "Arial", "sans-serif"].join(","),
              backgroundColor: themeMode === "light" ? "rgb(250, 250, 250)" : "#000000",
              color:
                themeMode === "light" ? lightText.primary : darkText.primary,
              "--color-text-primary":
                themeMode === "light" ? lightText.primary : darkText.primary,
              "--color-text-secondary":
                themeMode === "light"
                  ? lightText.secondary
                  : darkText.secondary,
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// custom hook
export const useThemeMode = () => {
  return useContext(ThemeContext);
};
