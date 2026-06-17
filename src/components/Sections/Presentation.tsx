import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Stack,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { applyOpacity } from "../../utils/utils";
import BoxSection from "../common/BoxSection";
import TypingText from "../common/TypingText";
import { StyledTypography as Typography } from "../Styled/StyledComponents";
import { GitHub, LinkedIn, Mail, Download } from "@mui/icons-material";

const Presentation = ({ className }: { className?: string }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const typingWords = useMemo(
    () => t("presentation.typingWords", { returnObjects: true }) as string[],
    [t],
  );

  const cvLink = useMemo(() => {
    const isEn = i18n.language.startsWith("en");
    return isEn
      ? import.meta.env.PUBLIC_RESUME_EN_LINK
      : import.meta.env.PUBLIC_RESUME_PT_LINK;
  }, [i18n.language]);

  const contactsList = [
    {
      label: "Email",
      href: "mailto:dev.otavioms@gmail.com",
      icon: Mail,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/otaviomendessantos/",
      icon: LinkedIn,
    },
    {
      label: "GitHub",
      href: "https://github.com/OtavioMendesSantos",
      icon: GitHub,
    },
  ];

  return (
    <BoxSection
      sx={{
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "background.default",
        px: { xs: 2, md: 3 },
      }}
      title={t("presentation.aboutMe")}
      className={className}
    >
      <Grid
        container
        sx={{
          width: "100%",
          flex: 1,
          maxWidth: "1180px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%" }}
        >
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{ alignItems: "center" }}
          >
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack sx={{ gap: 2, maxWidth: "720px" }}>
                <Typography
                  variant="overline"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {t("presentation.kicker")}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
                    lineHeight: 1.1,
                  }}
                >
                  {t("presentation.name")}
                </Typography>

                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "1.75rem", sm: "2.4rem", md: "3rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    {i18n.language.startsWith("en") ? (
                      <>
                        <TypingText words={typingWords} />{" "}
                        <Box
                          component="span"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {t("presentation.developerLabel")}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          component="span"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {t("presentation.developerLabel")}
                        </Box>{" "}
                        <TypingText words={typingWords} />
                      </>
                    )}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ maxWidth: "680px" }}>
                  {t("presentation.description")}
                </Typography>

                <Stack
                  direction="row"
                  useFlexGap
                  sx={{ gap: 1.5, flexWrap: "wrap" }}
                >
                  {cvLink && (
                    <Link
                      href={cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Download />}
                        sx={{ fontWeight: "bold" }}
                      >
                        {t("presentation.downloadCV")}
                      </Button>
                    </Link>
                  )}
                  {contactsList.map((contact) => (
                    <Link
                      key={contact.href}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: "none" }}
                    >
                      <Button variant="outlined" startIcon={<contact.icon />}>
                        {contact.label}
                      </Button>
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: "300px", sm: "360px", md: "420px" },
                  aspectRatio: "1 / 1",
                  ml: { xs: 0, md: "auto" },
                  border: `2px solid ${applyOpacity(theme.palette.primary.main, 0.55)}`,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  backgroundColor: "background.paper",
                  boxShadow: `0 0 0 12px ${applyOpacity(theme.palette.primary.main, 0.08)}`,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 12,
                    border: `1px solid ${applyOpacity(theme.palette.text.primary, 0.12)}`,
                    borderRadius: "50%",
                    zIndex: 1,
                    pointerEvents: "none",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/assets/images/profile.png"
                  alt={t("presentation.name")}
                  onDragStart={(event: React.DragEvent<HTMLImageElement>) =>
                    event.preventDefault()
                  }
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 35%",
                    userSelect: "none",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          aria-label={t("presentation.goMainPage")}
          color="primary"
          onClick={() =>
            window.scroll({ top: window.innerHeight - 60, behavior: "smooth" })
          }
        >
          <KeyboardDoubleArrowDown />
        </IconButton>
      </Box>
    </BoxSection>
  );
};

export default Presentation;
