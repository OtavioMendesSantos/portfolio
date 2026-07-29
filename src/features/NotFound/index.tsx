import { Button, Container } from "@mui/material";
import Loader from "../../components/common/Loader/Loader";
import { StyledTypography } from "../../components/Styled/StyledComponents";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const [seconds, setSeconds] = useState(5);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StyledTypography variant="h1" sx={{ textAlign: "center" }}>
        <StyledTypography variant="inherit" color="primary">
          Error 404
        </StyledTypography>{" "}
        NotFound
      </StyledTypography>
      <Loader />
      <Button component="a" href="/">
        {t("notFound.backButton", { seconds })}
      </Button>
    </Container>
  );
};

export default NotFound;
