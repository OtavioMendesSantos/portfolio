import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Project, ProjectStatus } from "../../../Interfaces/Project";
import CustomModal from "../Modal";
import { applyOpacity, getStackDetail } from "../../../utils/utils";
import { StyledTypography as Typography } from "../../Styled/StyledComponents";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  getTypeName: (type: string) => string;
  ProjectStatusIcon: React.FC<{ status: ProjectStatus }>;
  renameStatus: (status: string) => string;
  t: (key: string) => string;
}

const ProjectModal = ({
  project,
  open,
  onClose,
  getTypeName,
  ProjectStatusIcon,
  renameStatus,
  t,
}: ProjectModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setActiveImageIndex(0);
    }
  }, [project?.id, open]);

  if (!project) return null;

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={project.name}
      maxWidth="1100px"
    >
      <Grid container spacing={4} sx={{ p: { xs: 1, sm: 2 } }}>
        {/* Left: Image Showcase */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Main Image Container */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "240px", sm: "380px", md: "420px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: (theme) => applyOpacity(theme.palette.divider, 0.1),
                borderRadius: "16px",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
                p: 1.5,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={project.images[activeImageIndex]}
                  alt={project.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </AnimatePresence>
            </Box>

            {/* Thumbnails list */}
            {project.images.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: "center",
                  width: "100%",
                  mt: 1,
                }}
              >
                {project.images.map((img, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    sx={{
                      width: { xs: "55px", sm: "75px", md: "85px" },
                      aspectRatio: "16 / 9",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: (theme) =>
                        `2px solid ${
                          idx === activeImageIndex
                            ? theme.palette.primary.main
                            : "transparent"
                        }`,
                      boxShadow: (theme) =>
                        idx === activeImageIndex
                          ? `0 0 10px ${applyOpacity(theme.palette.primary.main, 0.4)}`
                          : "none",
                      opacity: idx === activeImageIndex ? 1 : 0.6,
                      transition: "all 0.2s ease-in-out",
                      bgcolor: (theme) =>
                        applyOpacity(theme.palette.divider, 0.1),
                      "&:hover": {
                        opacity: 1,
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <img
                      src={img}
                      alt={`${project.name} thumb ${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right: Project Details */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 3,
            }}
          >
            {/* Category, Status & Title */}
            <Box>
              <Stack
                direction="row"
                sx={{
                  mb: 1.5,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.main",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    letterSpacing: 1.5,
                  }}
                >
                  {getTypeName(project.type)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ProjectStatusIcon status={project.status} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "text.secondary",
                    }}
                  >
                    {renameStatus(project.status)}
                  </Typography>
                </Box>
              </Stack>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "2rem" },
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.name}
              </Typography>
            </Box>

            <Divider />

            {/* Description */}
            <Stack spacing={1}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  mb: 1,
                }}
              >
                {t("sections.projects.aboutProject")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  color: "text.secondary",
                  fontSize: "0.95rem",
                }}
              >
                {project.description}
              </Typography>
            </Stack>

            {/* Technologies Stacks */}
            <Stack spacing={1}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                {t("sections.projects.technologiesUsed")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {project.stacks.map((stack) => {
                  const detail = getStackDetail(stack);
                  return (
                    <Box
                      key={stack}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 1.5,
                        py: 0.8,
                        borderRadius: "8px",
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        bgcolor: (theme) =>
                          applyOpacity(theme.palette.background.default, 0.5),
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: "primary.main",
                          boxShadow: (theme) =>
                            `0 4px 12px ${applyOpacity(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                    >
                      <img
                        src={`/assets/svgs/${detail.icon}-original.svg`}
                        alt={detail.name}
                        style={{
                          width: "18px",
                          height: "18px",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                      >
                        {detail.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Stack>

            {/* Action Buttons */}
            <Box sx={{ mt: "auto", pt: 2 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap", gap: 2 }}
                useFlexGap
              >
                {project.actions &&
                  project.actions.length > 0 &&
                  project.actions.map((action, idx) => (
                    <Button
                      key={idx}
                      href={action.url}
                      target="_blank"
                      variant={
                        action.type === "website" ? "contained" : "outlined"
                      }
                      size="medium"
                      fullWidth
                      startIcon={
                        action.type === "website" ? (
                          <OpenInNewRoundedIcon />
                        ) : (
                          <CodeRoundedIcon />
                        )
                      }
                      sx={{
                        flex:
                          project.actions.length > 2 ? "1 1 45%" : "1 1 0px",
                      }}
                    >
                      {action.label.startsWith("sections.")
                        ? t(action.label)
                        : action.label}
                    </Button>
                  ))}
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ProjectModal;
