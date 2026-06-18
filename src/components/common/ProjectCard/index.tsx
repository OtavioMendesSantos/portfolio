import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";
import { Project, ProjectStatus } from "../../../Interfaces/Project";
import { applyOpacity } from "../../../utils/utils";
import ImgWithLoading from "../ImgWithLoading";
import { StyledTypography as Typography } from "../../Styled/StyledComponents";

interface ProjectCardProps {
  project: Project;
  onOpenGallery: () => void;
  getTypeName: (type: string) => string;
  ProjectStatusIcon: React.FC<{ status: ProjectStatus }>;
  renameStatus: (status: string) => string;
  t: (key: string) => string;
}

const ProjectCard = ({
  project,
  onOpenGallery,
  getTypeName,
  ProjectStatusIcon,
  renameStatus,
  t,
}: ProjectCardProps) => {
  return (
    <StyledProjectCard elevation={0}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "16 / 9",
          cursor: "pointer",
        }}
        onClick={onOpenGallery}
      >
        <ImgWithLoading
          src={project.images[0]}
          alt={project.name}
          imgProps={{
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            },
          }}
          boxProps={{ sx: { height: "100%" } }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            opacity: 0,
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { opacity: 1 },
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              border: "2px solid #fff",
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: "0.9rem",
            }}
          >
            VER GALERIA
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Stack
          direction="row"
          sx={{
            mb: 1.5,
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                mb: 0.5,
                display: "block",
                lineHeight: 1,
              }}
            >
              {getTypeName(project.type)}
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, fontSize: "1.4rem", lineHeight: 1.2 }}
            >
              {project.name}
            </Typography>
          </Box>
          <Tooltip title={renameStatus(project.status)} arrow>
            <Box sx={{ mt: 0.5 }}>
              <ProjectStatusIcon status={project.status} />
            </Box>
          </Tooltip>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.5, flexGrow: 1 }}
        >
          {project.description}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mb: 3, flexWrap: "wrap", gap: 0.5 }}
        >
          {project.stacks.map((stack: string) => (
            <Chip
              key={stack}
              label={stack}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: "0.65rem", height: "20px" }}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ mt: "auto" }}>
          {project.projectLink && (
            <Button
              href={project.projectLink}
              target="_blank"
              variant="contained"
              size="small"
              fullWidth
              startIcon={<OpenInNewRoundedIcon />}
              sx={{
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              {t("sections.projects.seeProject")}
            </Button>
          )}
          {project.repositoryLink && (
            <Button
              href={project.repositoryLink}
              target="_blank"
              variant="outlined"
              size="small"
              fullWidth
              startIcon={<CodeRoundedIcon />}
              sx={{
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {t("sections.projects.seeCode")}
            </Button>
          )}
        </Stack>
      </CardContent>
    </StyledProjectCard>
  );
};

const StyledProjectCard = styled(Card)(({ theme }) => ({
  backgroundColor: applyOpacity(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "16px",
  overflow: "hidden",
  transition:
    "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
    backgroundColor: applyOpacity(theme.palette.background.paper, 0.9),
  },
}));

export default ProjectCard;
