import { Box, Button } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import projects from "../../data/projects.json";

import AnimatedCard from "../common/AnimatedCard";
import CardProject from "./CardProject";


const categories = [
  { label: "All Projects", value: "all" },
  { label: "Html & Css", value: "html" },
  { label: "Javascript", value: "js" },
  { label: "React & MUI", value: "react" },
  // { label: "Bootstap", value: "bootstrap" },
];

function MainContent() {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  // const ii = "uu";

  // Filter Project
  const filteredDProjects = useMemo(() => {
    return activeCategory === "all"
      ? projects
      : projects.filter(
          (project) => {
            return project.category.find((cat) => cat === activeCategory)
          }
        );
  }, [activeCategory]);

  return (
    <Box
      id="project"
      component="main"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "1rem",
        // py:{xs: "0.7rem" , sm:"1.5rem" , md:"2rem"}
      }}
    >
      {/* Box-Left sideBar*/}
      <Box
        component="aside"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "row", md: "column" },
          gap: "1.1rem",
          width: { xs: "100%", md: "20%" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {categories.map((category) => (
          <Button
            onClick={() => setActiveCategory(category.value)}
            key={category.value}
            variant="outlined"
            sx={{
              display: "block",
              width: {
                xs: "calc(50% - 1.5rem)",
                sm: "calc((100% - 1.5rem) / 4)",
                md: "100%",
              },
              borderColor:
                activeCategory === category.value
                  ? // @ts-ignore
                    theme.palette.text.colorHover
                  : theme.palette.divider,
              textTransform: "capitalize",
              color: theme.palette.text.primary,
              borderRadius: "5px",
              py: 1,
              px: 2.5,
              // @ts-ignore
              bgcolor: theme.palette.background.header,
              opacity: activeCategory === category.value ? 1 : 0.6,
              transition: "0.3s",
              "&:hover": {
                opacity: 1,

                // @ts-ignore
                borderColor: theme.palette.text.colorHover,
              },
            }}
          >
            {category.label}
          </Button>
        ))}
      </Box>

      {/* Box-right Projects*/}
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill , minmax(300px , 300px))",
          gap: { xs: "1.3rem", sm: "1rem" },
          alignItems: "stretch",
          justifyContent:"center"
          
        }}
      >
        {filteredDProjects.map((project , index) => (
          <AnimatedCard
            key={project.id}
            index={index}
            // @ts-ignore
            id={project.id}
            
            // @ts-ignore
            sx={{ display: "flex", height: "100%" }}
          >
            <CardProject project={project} />
          </AnimatedCard>
        ))}
      </Box>
    </Box>
  );
}

export default MainContent;
