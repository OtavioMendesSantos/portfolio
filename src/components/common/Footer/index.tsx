import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={(theme: Theme) => ({
        height: "60px",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
        transition: "background-color .3s ease-in-out",
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {t("footer.developedBy")}
          <Link
            href="https://github.com/OtavioMendesSantos"
            target="_blank"
            rel="noreferrer noopen"
            sx={{
              ml: "0.5ch",
              fontWeight: 600,
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            @OtavioMendesSantos
          </Link>
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: "16px", alignSelf: "center" }}
            />
          }
          alignItems="center"
        >
          <Link
            href="https://www.linkedin.com/in/otaviomendessantos/"
            target="_blank"
            rel="noreferrer noopen"
            sx={iconLinkStyle}
          >
            <LinkedIn fontSize="small" />
          </Link>
          <Link
            href="mailto:dev.otavioms@gmail.com"
            target="_blank"
            rel="noreferrer noopen"
            sx={iconLinkStyle}
          >
            <EmailIcon fontSize="small" />
          </Link>
          <Link
            href="https://github.com/OtavioMendesSantos"
            target="_blank"
            rel="noreferrer noopen"
            sx={iconLinkStyle}
          >
            <GitHubIcon fontSize="small" />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

const iconLinkStyle = {
  display: "flex",
  alignItems: "center",
  color: "text.secondary",
  transition: "color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    color: "primary.main",
    transform: "scale(1.1)",
  },
};

export default Footer;
