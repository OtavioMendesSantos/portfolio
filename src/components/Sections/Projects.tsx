import { CheckCircle, ExpandMore } from "@mui/icons-material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  SelectChangeEvent,
  Stack,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { applyOpacity } from "../../utils/utils";
import { Project, ProjectStatus, ProjectType } from "../../Interfaces/Project";
import BoxSection from "../common/BoxSection";
import ProjectModal from "../common/ProjectModal";
import CoffeeMachine from "../common/CoffeeMachine";
import ProjectCard from "../common/ProjectCard";
import FilterSelect from "../common/FilterSelect";
import { StyledTypography as Typography } from "../Styled/StyledComponents";

interface FilterOptions {
  status: ProjectStatus[];
  stack: string[];
  type: ProjectType[];
}

const Projects = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const projects: Project[] = useMemo(
    () => [
      {
        id: "clearkanban",
        name: t("sections.projects.items.clearKanban.name"),
        images: ["/assets/images/projects/clear-kanban/clear-kanban-1.png"],
        description: t("sections.projects.items.clearKanban.description"),
        projectLink: "https://clearkanban.com.br",
        status: "in_development",
        type: "personal",
        stacks: [
          "nodejs",
          "typescript",
          "react",
          "postgresql",
          "socketio",
          "docker",
        ],
        actions: [
          {
            type: "website",
            label: "sections.projects.seeProject",
            url: "https://clearkanban.com.br",
          },
        ],
      },
      {
        id: "clinicadobomsenso",
        name: t("sections.projects.items.clinicadobomsenso.name"),
        images: [
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-1.png",
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-2.png",
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-3.png",
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-4.png",
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-5.png",
          "/assets/images/projects/clinica-do-bom-senso/clinica-do-bom-senso-md-6.png",
        ],
        description: t("sections.projects.items.clinicadobomsenso.description"),
        projectLink: "https://clinicadobomsenso.com.br/",
        status: "in_development",
        type: "professional",
        stacks: [
          "react",
          "typescript",
          "nextjs",
          "nodejs",
          "nestjs",
          "postgresql",
          "docker",
        ],
        actions: [
          {
            type: "website",
            label: "sections.projects.seeProject",
            url: "https://clinicadobomsenso.com.br/",
          },
        ],
      },
      {
        id: "baseclinica",
        name: t("sections.projects.items.baseclinica.name"),
        images: [
          "/assets/images/projects/base-clinica/base-clinica-md-1.png",
          "/assets/images/projects/base-clinica/base-clinica-md-2.png",
          "/assets/images/projects/base-clinica/base-clinica-md-3.png",
          "/assets/images/projects/base-clinica/base-clinica-md-4.png",
          "/assets/images/projects/base-clinica/base-clinica-md-5.png",
        ],
        description: t("sections.projects.items.baseclinica.description"),
        projectLink: "https://app.baseclinica.com.br/",
        status: "completed",
        type: "professional",
        stacks: [
          "react",
          "typescript",
          "nextjs",
          "nodejs",
          "nestjs",
          "postgresql",
          "docker",
        ],
        actions: [
          {
            type: "website",
            label: "sections.projects.seeProject",
            url: "https://app.baseclinica.com.br/",
          },
        ],
      },
      {
        id: "hirely",
        name: t("sections.projects.items.hirely.name"),
        images: [
          "/assets/images/projects/hirely/hirely-home.png",
          "/assets/images/projects/hirely/hirely-dashboard.png",
          "/assets/images/projects/hirely/hirely-new-application.png",
          "/assets/images/projects/hirely/hirely-application-details.png",
          "/assets/images/projects/hirely/hirely-tags.png",
          "/assets/images/projects/hirely/hirely-metrics.png",
          "/assets/images/projects/hirely/hirely-login.png",
          "/assets/images/projects/hirely/hirely-register.png",
        ],

        description: t("sections.projects.items.hirely.description"),
        status: "completed",
        type: "personal",
        stacks: [
          "go",
          "go-gin",
          "postgresql",
          "typescript",
          "angular",
          "spartan",
          "tailwindcss",
        ],
        actions: [
          {
            type: "repository",
            label: "Backend API",
            url: "https://github.com/OtavioMendesSantos/hirely-api",
          },
          {
            type: "repository",
            label: "Frontend Web",
            url: "https://github.com/OtavioMendesSantos/hirely-web",
          },
          {
            type: "website",
            label: "sections.projects.seeProject",
            url: "https://web-hirely.vercel.app/",
          },
        ],
      },
    ],
    [t],
  );

  const maxViewProjects = 4;
  const [viewProjects, setViewProjects] = useState(maxViewProjects);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    stack: [],
    type: [],
  });
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renameStatus = (status: string) => {
    switch (status) {
      case "completed":
        return t("sections.projects.status.completed");
      case "in_development":
        return t("sections.projects.status.inDevelopment");
      case "not_started":
        return t("sections.projects.status.notStarted");
      case "planning":
        return t("sections.projects.status.inPlanning");
      case "refactoring":
        return t("sections.projects.status.refactoring");
      default:
        return status;
    }
  };

  const getTypeName = (type: string) => {
    return type === "personal"
      ? t("sections.projects.types.pessoal")
      : t("sections.projects.types.profissional");
  };

  const filteredStacks = useMemo(() => {
    const stacks = new Set<string>();
    projects.forEach((p) => p.stacks.forEach((s) => stacks.add(s)));
    return Array.from(stacks);
  }, [projects]);

  const filteredStatus = useMemo(
    () => Array.from(new Set(projects.map((p) => p.status))),
    [projects],
  );
  const filteredTypes = useMemo(
    () => Array.from(new Set(projects.map((p) => p.type))),
    [projects],
  );

  const ProjectStatusIcon: React.FC<{ status: ProjectStatus }> = ({
    status,
  }) => {
    switch (status) {
      case "completed":
        return <CheckCircle sx={{ color: "success.main", fontSize: "1rem" }} />;
      case "in_development":
        return (
          <WarningRoundedIcon
            sx={{ color: "warning.main", fontSize: "1rem" }}
          />
        );
      case "not_started":
        return (
          <ErrorRoundedIcon sx={{ color: "error.main", fontSize: "1rem" }} />
        );
      case "planning":
        return (
          <ErrorRoundedIcon sx={{ color: "grey.400", fontSize: "1rem" }} />
        );
      case "refactoring":
        return (
          <InfoRoundedIcon sx={{ color: "info.main", fontSize: "1rem" }} />
        );
    }
  };

  const handleFilterChange = (
    event: SelectChangeEvent<string[]>,
    name: keyof FilterOptions,
  ) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({ ...prev, [name]: value as string[] }));
  };

  const handleDeleteChip = (name: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: (prev[name] as string[]).filter((v) => v !== value),
    }));
  };

  const handleTypeToggle = (type: ProjectType) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesStack =
        filters.stack.length === 0 ||
        filters.stack.every((s) => project.stacks.includes(s));
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(project.status);
      const matchesType =
        filters.type.length === 0 || filters.type.includes(project.type);
      return matchesStack && matchesStatus && matchesType;
    });
    setFilteredProjects(filtered);
  }, [filters, projects]);

  return (
    <BoxSection title={t("sections.projects.title")} className={className}>
      <Typography indicate variant="h1" sx={{ mb: 6 }}>
        {t("sections.projects.title")}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mb: 6,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          alignItems: "stretch",
          p: 2,
          borderRadius: "16px",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: applyOpacity(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(12px)",
          transition: "background-color .3s ease-in-out",
        }}
      >
        <FilterSelect
          label={t("sections.projects.filters.technologies")}
          value={filters.stack}
          options={filteredStacks}
          onChange={(e) => handleFilterChange(e, "stack")}
          onDelete={(v: string) => handleDeleteChip("stack", v)}
          onClear={() => setFilters((prev) => ({ ...prev, stack: [] }))}
        />
        <FilterSelect
          label={t("sections.projects.filters.status")}
          value={filters.status}
          options={filteredStatus}
          onChange={(e) => handleFilterChange(e, "status")}
          renderOption={(opt: string) => renameStatus(opt)}
          onDelete={(v: string) => handleDeleteChip("status", v)}
          onClear={() => setFilters((prev) => ({ ...prev, status: [] }))}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            flex: 1,
            minWidth: { xs: "100%", sm: "200px" },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "4px",
            px: 2,
            minHeight: "40px",
            position: "relative",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              bgcolor: theme.palette.background.paper,
              px: 0.5,
              fontWeight: 600,
              color: "text.secondary",
              lineHeight: 1,
              zIndex: 1,
            }}
          >
            {t("sections.projects.filters.type")}
          </Typography>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              flexWrap: "nowrap",
            }}
          >
            {filteredTypes.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.type.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    sx={{ p: 0.5 }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                  >
                    {getTypeName(type)}
                  </Typography>
                }
                sx={{ mr: 1 }}
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          width: "100%",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.slice(0, viewProjects).map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ display: "flex", width: "100%" }}
              >
                <ProjectCard
                  project={project}
                  onOpenGallery={() => {
                    setSelectedProject(project);
                  }}
                  getTypeName={getTypeName}
                  ProjectStatusIcon={ProjectStatusIcon}
                  renameStatus={renameStatus}
                  t={t}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <Stack spacing={4} sx={{ alignItems: "center" }}>
                <CoffeeMachine />
                <Typography
                  variant="h4"
                  color="text.secondary"
                  sx={{ opacity: 0.8, fontWeight: 700 }}
                >
                  {t("sections.projects.makingCoffee")}
                  <br />
                  {t("sections.projects.noProjects")}
                </Typography>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {filteredProjects.length > maxViewProjects && (
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="text"
            onClick={() =>
              setViewProjects((prev) =>
                prev > maxViewProjects
                  ? maxViewProjects
                  : prev + maxViewProjects,
              )
            }
            endIcon={
              <ExpandMore
                sx={{
                  transform:
                    viewProjects > maxViewProjects ? "rotate(180deg)" : "none",
                  transition: "0.3s",
                }}
              />
            }
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            {viewProjects > maxViewProjects
              ? t("sections.projects.seeLess")
              : t("sections.projects.viewMore")}
          </Button>
        </Box>
      )}

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        getTypeName={getTypeName}
        ProjectStatusIcon={ProjectStatusIcon}
        renameStatus={renameStatus}
        t={t}
      />
    </BoxSection>
  );
};

export default Projects;
