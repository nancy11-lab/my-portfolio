import { Box, IconButton, Tooltip } from "@mui/material";
import { GitHub, Launch } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function ProjectLinks({ githubUrl, demoUrl }) {
  const theme = useTheme();

  const iconStyle = {
    color: theme.palette.text.primary,
    transition: "color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      // @ts-ignore
      color: theme.palette.text.colorHover,
      transform: "scale(1.15)",
      bgcolor: "transparent",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 1,
      }}
    >
      {/* Demo Link */}
      <Tooltip title="View Live Demo" arrow>
        <IconButton
          component="a"
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={iconStyle}
        >
          <Launch fontSize="medium" />
        </IconButton>
      </Tooltip>
      {/* GitHub Link */}
      <Tooltip title="View Source on GitHub" arrow>
        <IconButton
          component="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={iconStyle}
        >
          <GitHub fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ProjectLinks;
