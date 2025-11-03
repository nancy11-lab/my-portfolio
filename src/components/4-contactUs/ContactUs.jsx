import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { Stack, Box, Button, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useThemeMode } from "../../context/ThemeContext";

import Lottie from "lottie-react";
import contactAnimation from "../../animation/contact.json";

import { useForm } from "@formspree/react";
import MySnackBar from "../common/MySnackBar";

export default function ContactUs() {
  const theme = useTheme();
  // @ts-ignore
  const { themeMode } = useThemeMode();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  // snackbar
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // form spree hook
  const [state, handleSubmitFormspree] = useForm("xrbyrgeg");
  useEffect(() => {
    if (state.succeeded) {
      showHideToast("Your Message Sent Successfully.");
      setEmail("");
      setMessage("");
    }
  }, [state.succeeded]);

  // hide / show snacker
  function showHideToast(message) {
    setOpen(true);
    setSuccessMsg(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value); // true

    e.target.value.trim().length === 0
      ? setEmailError("This Field is required")
      : validEmail
      ? setEmailError("")
      : setEmailError("Enter valid Email.");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);

    e.target.value.trim() === ""
      ? setMessageError("This Field Cannot be Empty.")
      : e.target.value.trim().length < 2
      ? setMessageError("This Field Less Than Two Character")
      : setMessageError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email Field validation
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email); // true
    const emailMsg =
      email === ""
        ? "This Field is required"
        : isValidEmail
        ? ""
        : "Enter valid Email";
    setEmailError(emailMsg);

    // Message Field validation
    const msg =
      message === ""
        ? "This Field Cannot be Empty"
        : message.length < 2
        ? "This Field Less Than Two Character"
        : "";
    setMessageError(msg);

    // لو مفيش اخطاء ابعت
    if (emailMsg === "" && msg === "") {
      handleSubmitFormspree(e);
    }
  };

  return (
    <Box id="contact"  component="section" sx={{ pt:{xs : "2rem" , sm:0}}}>
      {/* MySnackBar */}
      <MySnackBar open={open} message={successMsg} />
      {/* Box-Intro */}
      <Box sx={{ mb: "3rem" }}>
        {/* icon + contactUs */}
        <Stack
          direction="row"
          gap="0.6rem"
          alignItems="center"
          sx={{ mb: "0.8rem" }}
        >
          <EmailIcon
            sx={{ color: theme.palette.text.secondary, fontSize: "2rem" }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: theme.palette.text.primary,
              textTransform: "capitalize",
            }}
          >
            contact us
          </Typography>
        </Stack>

        <Typography
          gutterBottom
          variant="body2"
          component="p"
          sx={{
            color: theme.palette.text.secondary,
            textTransform: "capitalize",
            lineHeight: 1.8,
          }}
        >
          Contact us for more information and get notified when i publish
          something new
        </Typography>
      </Box>
      {/* Box-Form + animation */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Box-Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "85%", md: "60%" },
            marginLeft: { xs: "auto", sm: 0 },
            marginRight: { xs: "auto", sm: 0 },
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            p: { xs: "1rem", sm: 0 },
            borderRadius: { xs: "5px", sm: "none" },
            boxShadow: {
              xs: "1px 1px 2px rgba(35, 35 , 36 , 0.165) ,-1px -1px 2px rgba(35, 35 , 36 , 0.165) ",
              sm: "none",
            },
            border: { xs: `1px solid ${theme.palette.divider}`, sm: "none" },
          }}
        >
          {/* Email Field */}
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "start", sm: "center" },
              gap: { xs: "0.7rem", sm: "0" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <label
              htmlFor="email"
              style={{
                fontWeight: 500,
                color: theme.palette.text.secondary,
                width: "140px",
              }}
            >
              Email Address:
            </label>
            <TextField
              id="email"
              name="email"
              type="email"
              helperText={emailError}
              // @ts-ignore
              slotProps={{ helperText: { sx: { color: "red" } } }}
              error={Boolean(emailError)}
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                width: { xs: "100%", sm: "calc(100% - 140px)" },
                // @ts-ignore
                bgcolor: theme.palette.background.header,
                "& .MuiOutlinedInput-root": {
                  transition: "0.5s ease",

                  "&:hover fieldset": {
                    // @ts-ignore
                    borderColor: emailError ? "red" : theme.palette.borderForm,
                  },

                  "&.Mui-focused fieldset": {
                    // @ts-ignore
                    borderColor: emailError ? "red" : theme.palette.borderForm,
                  },
                },
              }}
            />
          </Box>
          {/* Message Field   (Textarea)*/}
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "start", sm: "center" },
              gap: { xs: "0.7rem", sm: "0" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <label
              htmlFor="message"
              style={{
                fontWeight: 500,
                color: theme.palette.text.secondary,
                width: "140px",
              }}
            >
              Your Message:
            </label>
            <TextField
              id="message"
              name="message"
              value={message}
              helperText={messageError}
              // @ts-ignore
              slotProps={{ helperText: { sx: { color: "red" } } }}
              error={Boolean(messageError)}
              onChange={handleMessageChange}
              placeholder="Write your message"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              sx={{
                width: { xs: "100%", sm: "calc(100% - 140px)" },
                // @ts-ignore
                bgcolor: theme.palette.background.header,
                "& .MuiOutlinedInput-root": {
                  transition: "0.5s ease",
                  "&:hover fieldset": {
                    borderColor: messageError
                      ? "red"
                      : // @ts-ignore
                        theme.palette.borderForm,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: messageError
                      ? "red"
                      : // @ts-ignore
                        theme.palette.borderForm,
                  },
                },
              }}
            />
          </Box>
          {/* submit Button */}
          <Button
            variant="outlined"
            type="submit"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "10rem",
              marginLeft: { xs: "0", sm: "140px" },
              textTransform: "capitalize",
              color: "#fff",
              borderColor: themeMode === "light" ? "#b3b3b3 " : "#59595b",
              borderRadius: "5px",
              py: 1,
              px: 2.5,
              // @ts-ignore
              bgcolor:
                themeMode === "light"
                  ? "#59595b"
                  : // @ts-ignore
                    theme.palette.background.header,
              transition: "0.5s ease",
              "&:hover": {
                bgcolor:
                  themeMode === "light"
                    ? "rgb(91,152,238)"
                    : // @ts-ignore
                      theme.palette.background.header,
                borderColor:
                  themeMode === "light"
                    ? "rgb(91,152,238)"
                    : // @ts-ignore
                      theme.palette.borderForm,
                scale: "0.97",
              },
            }}
            disabled={state.submitting}
          >
            {!state.submitting && (
              <SendIcon
                fontSize="small"
                sx={{
                  transform: "rotate(-45deg) translateY(-7px)",
                  display: "inline-block",
                }}
              />
            )}
            <Typography component="span">
              {state.submitting ? "Sending..." : "Send"}
            </Typography>
          </Button>
        </Box>
        {/*Box-animation */}
        <Box
          component="div"
          sx={{
            display: {
              xs: "none",
              md: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            width: "40%",
          }}
        >
          <Lottie
            animationData={contactAnimation}
            autoplay={true}
            loop={true}
            style={{ width: 250, height: 250 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
