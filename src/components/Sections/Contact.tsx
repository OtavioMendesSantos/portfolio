import { Button, Stack, Typography, Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import BoxSection from "../common/BoxSection";
import { StyledTypography } from "../Styled/StyledComponents";
import { LinkedIn, GitHub, Email } from "@mui/icons-material";

const Contact = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  const contactLinks = [
    {
      label: t("sections.contact.buttons.linkedin"),
      icon: <LinkedIn />,
      href: "https://www.linkedin.com/in/otaviomendessantos/",
      color: "#0077b5",
      primary: true,
    },
    {
      label: t("sections.contact.buttons.email"),
      icon: <Email />,
      href: "mailto:dev.otavioms@gmail.com",
      color: "#EA4335",
    },
    {
      label: t("sections.contact.buttons.github"),
      icon: <GitHub />,
      href: "https://github.com/OtavioMendesSantos",
      color: "#333",
    },
  ];

  return (
    <BoxSection title={t("sections.contact.title")} className={className}>
      <StyledTypography variant="h1" indicate sx={{ mb: 6 }}>
        {t("sections.contact.title")}
      </StyledTypography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 6 }}
          sx={{ mb: 4, alignItems: { xs: "flex-start", md: "center" } }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              flex: { xs: "none", md: "0 0 55%" },
              textWrap: "balance", // Distribui o título simetricamente
            }}
          >
            {t("sections.contact.headline")}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              flex: { xs: "none", md: 1 },
              textWrap: "pretty", // Evita palavras órfãs no final do parágrafo
            }}
          >
            {t("sections.contact.description")}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          {contactLinks.map((link) => (
            <Button
              key={link.label}
              component={Link}
              variant={link.primary ? "contained" : "outlined"}
              startIcon={link.icon}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: { xs: "100%", md: "auto" },
                ...(link.primary
                  ? {
                      backgroundColor: link.color,
                      borderColor: link.color,
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: link.color,
                        borderColor: link.color,
                        opacity: 0.9,
                      },
                    }
                  : {
                      borderColor: "divider",
                      color: "text.primary",
                      "&:hover": {
                        backgroundColor: "action.hover",
                        borderColor: link.color,
                      },
                    }),
                transition: "all 0.3s ease",
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </BoxSection>
  );
};

export default Contact;
