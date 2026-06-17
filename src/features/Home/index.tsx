import { Box, Container, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Experience from "../../components/Sections/Experience";
import Presentation from "../../components/Sections/Presentation";
import Projects from "../../components/Sections/Projects";
import Contact from "../../components/Sections/Contact";
import Skills from "../../components/Sections/Skills";
import TechnologiesCarousel from "../../components/Sections/TechnologiesCarousel";
import Training from "../../components/Sections/Training";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import NavigateSection from "../../components/common/NavigateSections";
import ToTop from "../../components/common/ToTop";
import { handleOpacityColor } from "../../utils/utils";

const Home = () => {
  const theme = useTheme();
  const refSections = useRef<NodeListOf<Element> | null>(null);
  const [elements, setElements] = useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    refSections.current = document.querySelectorAll(".homeSection");
    setElements(refSections.current);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `radial-gradient(${handleOpacityColor(theme.palette.getContrastText(theme.palette.background.paper), 0.125)} 2px, transparent 0)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-5px -5px",
        }}
      >
        <Header position="sticky" />
        <Presentation />
        <Container
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 4 },
            minHeight: "100vh",
          }}
        >
          <TechnologiesCarousel />
          <Skills className="homeSection" />
          <Experience className="homeSection" />
          <Training className="homeSection" />
          <Projects className="homeSection" />
          <Contact className="homeSection" />
          {/* <Repositories className='homeSection' /> */}
        </Container>
        <Footer />
        <ToTop />
      </Box>
      <NavigateSection elements={elements} />
    </>
  );
};

export default Home;
