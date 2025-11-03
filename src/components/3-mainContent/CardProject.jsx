import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

import ProjectLinks from "../common/ProjectLinks";

export default function CardProject({ project }) {
  const theme = useTheme();
  return (
    <Card
      key={project.id}
      sx={{
        // minHeight: "470px",
        height: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        p: "0.4rem",
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        transition: "0.5s ease",
        margin: "auto",
        backgroundImage:
          "linear-gradient(rgba(255 , 255 , 255 , 0.05) , rgba(255 , 255 , 255 , 0.05))",
        "&:hover": {
          // @ts-ignore
          borderColor: theme.palette.text.colorHover,
          transform: "translateY(-5px)",

          "& .MuiChip-root": {
            // @ts-ignore
            bgcolor: theme.palette.text.colorHover,
          },
        },
      }}
    >
      {/* الصوره */}
      <CardMedia
        component="img"
        alt={project.title}
        image={project.image}
        sx={{
          height: "auto",
          width: "100%",
          maxWidth: "100%",
          //   aspectRatio: "3 / 2", //,يحافظ علي النسبه مهما تغيرت الشاشه
          objectFit: "cover",
          borderRadius: "0.5rem",
        }}
      />

      {/* النصوص واللينكات */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: "1rem",
        }}
      >
        {/* النصوص */}
        <CardContent
          sx={{
            flexGrow: 1,
            p: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* - العنوان و الوصف */}
          <Box sx={{ flexGrow: 1 }}>
            {/* العنوان */}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: theme.palette.text.primary }}
            >
              {project.title}
            </Typography>
            {/* الوصف */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                lineHeight: 1.5,
              }}
            >
              {project.description}
            </Typography>
          </Box>
          {/* technologies */}
          <Box
            sx={{
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              mt: "10px",
            }}
          >
            {project.technologies.map((technology, index) => (
              <Chip
                key={index}
                label={technology}
                size="small"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  // @ts-ignore
                  bgcolor: theme.palette.background.header,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "0 0 2px rgba(0 , 0 , 0 , 0.1)",
                  transition: "background-color 0.5s ease",
                }}
              />
            ))}
          </Box>
        </CardContent>
        {/* اللينكات */}
        <CardActions sx={{ p: 0 }}>
          {/* // Icon Link Demo Project & Icon Github*/}
          <ProjectLinks githubUrl={project.github} demoUrl={project.demo} />
        </CardActions>
      </Box>
    </Card>
  );
}
