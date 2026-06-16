import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import {
  Box,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BoxSection from "../common/BoxSection";
import Carrousel from "../common/Carrousel";
import ImgWithLoading from "../common/ImgWithLoading";
import CustomModal from "../common/Modal";
import {
  StyledCard,
  StyledTypography as Typography,
} from "../Styled/StyledComponents";

interface Certificate {
  name: string;
  hours: number;
  organization: string;
  src: string;
  description: string;
}

interface CurriculumItem {
  ordem: number;
  unidadeCurricular: string;
  ch: number;
}

interface Graduation {
  name: string;
  institution: string;
  period: string;
  type: string;
  completionDate: { year: number; month: number };
  curriculum: CurriculumItem[];
}

const curriculumADS: CurriculumItem[] = [
  { ordem: 1, unidadeCurricular: "Introdução a Computação", ch: 60 },
  { ordem: 2, unidadeCurricular: "Lógica de Programação", ch: 70 },
  { ordem: 3, unidadeCurricular: "Matemática Computacional", ch: 60 },
  { ordem: 4, unidadeCurricular: "Padrões Web", ch: 60 },
  { ordem: 5, unidadeCurricular: "Laboratório de Inovação I", ch: 100 },
  { ordem: 6, unidadeCurricular: "Comunicação Empresarial", ch: 100 },
  { ordem: 7, unidadeCurricular: "Extensão", ch: 50 },
  { ordem: 8, unidadeCurricular: "Fundamentos de Banco de Dados", ch: 60 },
  { ordem: 9, unidadeCurricular: "Engenharia de Software", ch: 70 },
  { ordem: 10, unidadeCurricular: "Linguagem Técnica de Programação", ch: 60 },
  { ordem: 11, unidadeCurricular: "Laboratório de Inovação II", ch: 100 },
  {
    ordem: 12,
    unidadeCurricular: "Linguagem de Programação para Web I",
    ch: 60,
  },
  {
    ordem: 13,
    unidadeCurricular:
      "Ética Profissional, Desenvolvimento Sustentável e Empreendedorismo",
    ch: 50,
  },
  {
    ordem: 14,
    unidadeCurricular: "Fundamentos de Computação em Nuvem",
    ch: 50,
  },
  { ordem: 15, unidadeCurricular: "Linguagem Técnica de Programação", ch: 50 },
  { ordem: 16, unidadeCurricular: "Linguagem de Banco de Dados", ch: 70 },
  {
    ordem: 17,
    unidadeCurricular: "Linguagem de Programação para Web II",
    ch: 60,
  },
  {
    ordem: 18,
    unidadeCurricular: "Linguagem de Programação Orientada à Objetos I",
    ch: 60,
  },
  { ordem: 19, unidadeCurricular: "Gestão de Projetos", ch: 60 },
  { ordem: 20, unidadeCurricular: "Laboratório de Inovação III", ch: 100 },
  { ordem: 21, unidadeCurricular: "Laboratório de Inovação III", ch: 50 },
  { ordem: 22, unidadeCurricular: "Sistemas Operacionais", ch: 50 },
  { ordem: 23, unidadeCurricular: "Extensão", ch: 50 },
  {
    ordem: 24,
    unidadeCurricular: "Linguagem de Programação Orientada à Objetos II",
    ch: 60,
  },
  {
    ordem: 25,
    unidadeCurricular: "Linguagem de Programação para Mobile",
    ch: 60,
  },
];

const curriculumCienciaDados: CurriculumItem[] = [
  { ordem: 1, unidadeCurricular: "Modelagem de Dados", ch: 30 },
  { ordem: 2, unidadeCurricular: "Inteligência Artificial", ch: 30 },
  { ordem: 3, unidadeCurricular: "Bancos de Dados NoSQL", ch: 30 },
  { ordem: 4, unidadeCurricular: "Linguagem de Programação em Python", ch: 30 },
  { ordem: 5, unidadeCurricular: "Matemática Computacional", ch: 30 },
  { ordem: 6, unidadeCurricular: "Estatística Descritiva", ch: 30 },
  { ordem: 7, unidadeCurricular: "Engenharia de Dados", ch: 30 },
  { ordem: 8, unidadeCurricular: "Data Visualization", ch: 30 },
  {
    ordem: 9,
    unidadeCurricular: "Aprendizagem de Máquina Supervisionada",
    ch: 30,
  },
  {
    ordem: 10,
    unidadeCurricular: "Aprendizagem de Máquina Não Supervisionada",
    ch: 30,
  },
  { ordem: 11, unidadeCurricular: "Visão Computacional", ch: 30 },
  { ordem: 12, unidadeCurricular: "Mineração de Textos", ch: 30 },
];

const Training = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const [openModalGraduation, setOpenModalGraduation] = useState(false);
  const [selectedGraduation, setSelectedGraduation] =
    useState<Graduation | null>(null);
  const [modalImgOpen, setModalImgOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalImgAlt, setModalImgAlt] = useState("");

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const graduations: Graduation[] = useMemo(
    () => [
      {
        name: "Data Science e Inteligência Artificial",
        institution: "Senac Df",
        period: "02/2026 - 12/2026",
        type: t("sections.training.college.types.postgraduate"),
        completionDate: { year: 2026, month: 12 },
        curriculum: curriculumCienciaDados,
      },
      {
        name: "Análise e Desenvolvimento de Sistemas",
        institution: "Senac Df",
        period: "02/2024 - 12/2025",
        type: t("sections.training.college.types.undergraduate"),
        completionDate: { year: 2025, month: 12 },
        curriculum: curriculumADS,
      },
    ],
    [t],
  );

  const certificates: Certificate[] = useMemo(
    () => [
      {
        name: t("sections.training.certificates.items.react.title"),
        organization: "Origamid",
        src: "/assets/images/certificates/react-origamid.png",
        hours: 36,
        description: t("sections.training.certificates.items.react.description"),
      },
      {
        name: t("sections.training.certificates.items.javascript.title"),
        organization: "Origamid",
        src: "/assets/images/certificates/javascript-origamid.jpg",
        hours: 74,
        description: t(
          "sections.training.certificates.items.javascript.description",
        ),
      },
      {
        name: t("sections.training.certificates.items.typescript.title"),
        organization: "Origamid",
        src: "/assets/images/certificates/typescript-origamid.jpg",
        hours: 22,
        description: t(
          "sections.training.certificates.items.typescript.description",
        ),
      },
      {
        name: t("sections.training.certificates.items.reactWithTypeScript.title"),
        organization: "Origamid",
        src: "/assets/images/certificates/react_typescript-origamid.jpg",
        hours: 22,
        description: t(
          "sections.training.certificates.items.reactWithTypeScript.description",
        ),
      },
      {
        name: t("sections.training.certificates.items.flexbox.title"),
        organization: "Origamid",
        src: "/assets/images/certificates/flexbox-origamid.jpg",
        hours: 6,
        description: t(
          "sections.training.certificates.items.flexbox.description",
        ),
      },
      {
        name: t("sections.training.certificates.items.gameDevJs.title"),
        organization: "DIO",
        src: "/assets/images/certificates/desenvolvimento_de_jogos_com_js-dio.jpg",
        hours: 77,
        description: t(
          "sections.training.certificates.items.gameDevJs.description",
        ),
      },
      {
        name: t("sections.training.certificates.items.kotlinBackend.title"),
        organization: "DIO",
        src: "/assets/images/certificates/desenvolvimento_back_end_com_kotlin.jpg",
        hours: 52,
        description: t(
          "sections.training.certificates.items.kotlinBackend.description",
        ),
      },
    ],
    [t],
  );

  const handleOpen = (graduation: Graduation) => {
    setSelectedGraduation(graduation);
    setOpenModalGraduation(true);
  };

  const handleClose = () => {
    setOpenModalGraduation(false);
    setSelectedGraduation(null);
  };

  const handleImageClick = (src: string, alt: string) => {
    setModalImg(src);
    setModalImgAlt(alt);
    setModalImgOpen(true);
  };

  const handleModalImgClose = () => {
    setModalImgOpen(false);
    setModalImg("");
    setModalImgAlt("");
  };

  const carouselStyles: { [key: string]: React.CSSProperties } = {
    slide: {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.3s ease",
      pointerEvents: "none",
    },
    activeSlide: {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
    },
  };

  return (
    <BoxSection title={t("sections.training.title")} className={className}>
      <Typography indicate variant="h1" sx={{ mb: 6 }}>
        {t("sections.training.title")}
      </Typography>
      <Container>
        <Grid container spacing={2}>
          {graduations.map((grad, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ width: "100%" }}
              >
                <StyledCard sx={{ minHeight: "auto" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Tooltip
                      placement="top"
                      arrow
                      title={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {t("sections.training.viewSubjects")}{" "}
                          <ArrowOutwardRoundedIcon sx={{ fontSize: 12 }} />
                        </Box>
                      }
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                        onClick={() => handleOpen(grad)}
                      >
                        {grad.name}
                      </Typography>
                    </Tooltip>
                    <Stack sx={{ gap: 1, mt: 2 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "primary.light",
                        }}
                      >
                        {grad.institution} • {grad.type}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {grad.period}
                      </Typography>
                    </Stack>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h2" sx={{ my: 8 }}>
          {t("sections.training.coursesAndCertificates")}
        </Typography>

        <Carrousel
          items={certificates}
          renderImage={(certificate, index, isActive, prevAnimation) => (
            <motion.div
              key={index}
              style={{
                ...carouselStyles.slide,
                ...(isActive ? carouselStyles.activeSlide : {}),
              }}
              animate={
                isActive
                  ? {
                      opacity: 1,
                      x: 0,
                      visibility: "visible",
                    }
                  : {
                      opacity: 0,
                      x: prevAnimation === "right" ? -100 : 100,
                      visibility: "hidden",
                    }
              }
              transition={{ duration: 0.3 }}
            >
              <ImgWithLoading
                src={certificate.src}
                alt={certificate.name}
                boxProps={{
                  sx: {
                    borderRadius: "4px",
                    overflow: "hidden",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  },
                }}
                imgProps={{
                  onClick: () => handleImageClick(certificate.src, certificate.name),
                }}
              />
            </motion.div>
          )}
          renderDescription={(certificate, index, isActive) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 auto",
                display: "flex",
                height: "100%",
                flexDirection: "column",
                position: "absolute",
                transition: "opacity 0.3s ease",
                opacity: isActive ? 1 : 0,
                visibility: isActive ? "visible" : "hidden",
              }}
            >
              <Typography align="center" variant="h3">
                {certificate.name}
              </Typography>
              <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                {certificate.organization} | {certificate.hours} horas
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography align="center" variant="body1" sx={{ mb: 2 }}>
                  {certificate.description}
                </Typography>
              </Box>
            </Box>
          )}
        />
      </Container>
      <CustomModal
        open={openModalGraduation}
        onClose={handleClose}
        maxWidth="800px"
        maxHeight="700px"
        title={
          selectedGraduation?.name || t("sections.training.college.modalTitle")
        }
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">
                    {t("sections.training.college.tableHeader.order")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {t("sections.training.college.tableHeader.curriculumUnit")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {t("sections.training.college.tableHeader.workload")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedGraduation?.curriculum.map((item) => (
                <TableRow key={item.ordem} hover>
                  <TableCell>{item.ordem}</TableCell>
                  <TableCell>{item.unidadeCurricular}</TableCell>
                  <TableCell>{item.ch}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomModal>
      <CustomModal
        open={modalImgOpen}
        onClose={handleModalImgClose}
        title={t("sections.training.certificateModal.title")}
      >
        <ImgWithLoading
          alt={modalImgAlt}
          src={modalImg}
          imgProps={{ style: { borderRadius: "4px", maxWidth: "100%" } }}
        />
      </CustomModal>
    </BoxSection>
  );
};

export default Training;
