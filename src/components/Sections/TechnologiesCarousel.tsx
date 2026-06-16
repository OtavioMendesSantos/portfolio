import { Box, Container, Tooltip, styled } from "@mui/material";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  PanInfo,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BoxSection from "../common/BoxSection";
import ImgWithLoading from "../common/ImgWithLoading";
import { StyledTypography as Typography } from "../Styled/StyledComponents";

interface Technology {
  name: string;
  icon: string;
}

const technologies: Technology[] = [
  { name: "Go", icon: "go" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Nest.js", icon: "nestjs" },
  { name: "Express", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Socket.IO", icon: "socketio" },
  { name: "Redux", icon: "redux" },
  { name: "Material UI", icon: "materialui" },
  { name: "SASS", icon: "sass" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Expo", icon: "expo" },
  { name: "Git", icon: "git" },
  { name: "Railway", icon: "railway" },
  { name: "Grafana", icon: "grafana" },
  { name: "Google Cloud Platform", icon: "googlecloud" },
];

const TechnologiesCarousel = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const carouselItems = [...technologies, ...technologies, ...technologies];

  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const direction = useRef<number>(-1);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 3;
      setTrackWidth(width);
      x.set(-width);
    }
  }, [x]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      if (trackWidth > 0) {
        if (latestX >= 0) {
          x.set(latestX - trackWidth);
        } else if (latestX <= -trackWidth * 2) {
          x.set(latestX + trackWidth);
        }
      }
    });

    return () => unsubscribe();
  }, [trackWidth, x]);

  useAnimationFrame((_, delta) => {
    if (!isHovered && !isDragging && trackWidth > 0) {
      const moveBy = direction.current * 0.04 * delta;
      x.set(x.get() + moveBy);
    }
  });

  const handleDragEnd = (info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x > 20) {
      direction.current = 1;
    } else if (info.offset.x < -20) {
      direction.current = -1;
    }
  };

  return (
    <BoxSection title={t("sections.technologies.title")} className={className}>
      <Container sx={{ py: { xs: 3, md: 4 }, px: { xs: 0, sm: 3 } }}>
        <CarouselViewport
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CarouselTrack
            ref={containerRef}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => handleDragEnd(info)}
            style={{ x }}
          >
            {carouselItems.map((technology, index) => (
              <TechnologyItem
                key={`${technology.icon}-${index}`}
                aria-hidden={index >= technologies.length}
              >
                <Tooltip title={technology.name} arrow>
                  <Box>
                    <ImgWithLoading
                      src={`/assets/svgs/${technology.icon}-original.svg`}
                      alt={`${technology.name} logo`}
                      imgProps={{
                        style: {
                          width: "48px",
                          height: "48px",
                          objectFit: "contain",
                          userSelect: "none",
                        },
                        onDragStart: (event) => event.preventDefault(),
                      }}
                      boxProps={{
                        sx: {
                          width: "48px",
                          height: "48px",
                        },
                      }}
                    />
                  </Box>
                </Tooltip>
                <Typography variant="caption">{technology.name}</Typography>
              </TechnologyItem>
            ))}
          </CarouselTrack>
        </CarouselViewport>
      </Container>
    </BoxSection>
  );
};

const CarouselViewport = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "18px 0",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "88px",
    zIndex: 2,
    pointerEvents: "none",
  },
  "&::before": {
    left: 0,
    background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)`,
  },
  "&::after": {
    right: 0,
    background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)`,
  },
  [theme.breakpoints.down("sm")]: {
    "&::before, &::after": {
      width: "44px",
    },
  },
}));

const CarouselTrack = styled(motion.div)(({ theme }) => ({
  display: "flex",
  width: "max-content",
  gap: "18px",
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
}));

const TechnologyItem = styled(Box)(({ theme }) => ({
  width: "112px",
  minWidth: "112px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px 10px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.background.default,
  userSelect: "none",
  "& .MuiTypography-root": {
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

export default TechnologiesCarousel;
