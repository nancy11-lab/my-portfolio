import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTheme } from "@emotion/react";
import { useThemeMode } from "../../context/ThemeContext";

export default function MySnackBar({ open, message }) {
  const theme = useTheme();

  // @ts-ignore
  const { themeMode } = useThemeMode();
  return (
    <div>
      <Snackbar open={open}>
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: 500,
            color: themeMode === "light" ? "#fff" : "#000",

            bgcolor:
              themeMode === "light"
                ? // @ts-ignore
                  theme.palette.success.main
                : // @ts-ignore
                  theme.palette.success.light,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
