import { CheckCircle } from '@mui/icons-material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Box, Button, Card, CardContent, Container, Divider, Grid, IconButton, IconButtonProps, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applyOpacity } from '../../utils/utils';
import BoxSection from '../common/BoxSection';
import ImgWithLoading from '../common/ImgWithLoading';
import CustomModal from '../common/Modal';
import { StyledTypography as Typography } from '../Styled/StyledComponents';

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
    { ordem: 1, unidadeCurricular: 'Introdução a Computação', ch: 60 },
    { ordem: 2, unidadeCurricular: 'Lógica de Programação', ch: 70 },
    { ordem: 3, unidadeCurricular: 'Matemática Computacional', ch: 60 },
    { ordem: 4, unidadeCurricular: 'Padrões Web', ch: 60 },
    { ordem: 5, unidadeCurricular: 'Laboratório de Inovação I', ch: 100 },
    { ordem: 6, unidadeCurricular: 'Comunicação Empresarial', ch: 100 },
    { ordem: 7, unidadeCurricular: 'Extensão', ch: 50 },
    { ordem: 8, unidadeCurricular: 'Fundamentos de Banco de Dados', ch: 60 },
    { ordem: 9, unidadeCurricular: 'Engenharia de Software', ch: 70 },
    { ordem: 10, unidadeCurricular: 'Linguagem Técnica de Programação', ch: 60 },
    { ordem: 11, unidadeCurricular: 'Laboratório de Inovação II', ch: 100 },
    { ordem: 12, unidadeCurricular: 'Linguagem de Programação para Web I', ch: 60 },
    { ordem: 13, unidadeCurricular: 'Ética Profissional, Desenvolvimento Sustentável e Empreendedorismo', ch: 50 },
    { ordem: 14, unidadeCurricular: 'Fundamentos de Computação em Nuvem', ch: 50 },
    { ordem: 15, unidadeCurricular: 'Linguagem Técnica de Programação', ch: 50 },
    { ordem: 16, unidadeCurricular: 'Linguagem de Banco de Dados', ch: 70 },
    { ordem: 17, unidadeCurricular: 'Linguagem de Programação para Web II', ch: 60 },
    { ordem: 18, unidadeCurricular: 'Linguagem de Programação Orientada à Objetos I', ch: 60 },
    { ordem: 19, unidadeCurricular: 'Gestão de Projetos', ch: 60 },
    { ordem: 20, unidadeCurricular: 'Laboratório de Inovação III', ch: 100 },
    { ordem: 21, unidadeCurricular: 'Laboratório de Inovação III', ch: 50 },
    { ordem: 22, unidadeCurricular: 'Sistemas Operacionais', ch: 50 },
    { ordem: 23, unidadeCurricular: 'Extensão', ch: 50 },
    { ordem: 24, unidadeCurricular: 'Linguagem de Programação Orientada à Objetos II', ch: 60 },
    { ordem: 25, unidadeCurricular: 'Linguagem de Programação para Mobile', ch: 60 }
];

const curriculumCienciaDados: CurriculumItem[] = [
    { ordem: 1, unidadeCurricular: 'Modelagem de Dados', ch: 30 },
    { ordem: 2, unidadeCurricular: 'Inteligência Artificial', ch: 30 },
    { ordem: 3, unidadeCurricular: 'Bancos de Dados NoSQL', ch: 30 },
    { ordem: 4, unidadeCurricular: 'Linguagem de Programação em Python', ch: 30 },
    { ordem: 5, unidadeCurricular: 'Matemática Computacional', ch: 30 },
    { ordem: 6, unidadeCurricular: 'Estatística Descritiva', ch: 30 },
    { ordem: 7, unidadeCurricular: 'Engenharia de Dados', ch: 30 },
    { ordem: 8, unidadeCurricular: 'Data Visualization', ch: 30 },
    { ordem: 9, unidadeCurricular: 'Aprendizagem de Máquina Supervisionada', ch: 30 },
    { ordem: 10, unidadeCurricular: 'Aprendizagem de Máquina Não Supervisionada', ch: 30 },
    { ordem: 11, unidadeCurricular: 'Visão Computacional', ch: 30 },
    { ordem: 12, unidadeCurricular: 'Mineração de Textos', ch: 30 }
];

const Training = ({ className }: { className?: string }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [activeImg, setActiveImg] = useState(1);
    const [prevAnimation, setPrevAnimation] = useState<'left' | 'right' | null>(null);
    const [autoClick, setAutoClick] = useState(true);
    const [openModalGraduation, setOpenModalGraduation] = useState(false);
    const [selectedGraduation, setSelectedGraduation] = useState<Graduation | null>(null);
    const [modalImgOpen, setModalImgOpen] = useState(false);
    const [modalImg, setModalImg] = useState('')

    const refAction = useRef<NodeJS.Timeout | null>(null)

    const graduations: Graduation[] = [
        {
            name: 'Análise e Desenvolvimento de Sistemas',
            institution: 'Senac Df',
            period: '02/2024 - 12/2025',
            type: 'Graduação',
            completionDate: { year: 2025, month: 12 },
            curriculum: curriculumADS,
        },
        {
            name: 'Data Science e Inteligência Artificial',
            institution: 'Senac Df',
            period: '02/2026 - 12/2026',
            type: 'Pós graduação',
            completionDate: { year: 2026, month: 12 },
            curriculum: curriculumCienciaDados
        }
    ];

    const certificates: Certificate[] = [
        {
            name: t('sections.training.certificates.items.react.title'),
            organization: 'Origamid',
            src: '/assets/images/certificates/react-origamid.png',
            hours: 36,
            description: t('sections.training.certificates.items.react.description')
        },
        {
            name: t('sections.training.certificates.items.javascript.title'),
            organization: 'Origamid',
            src: '/assets/images/certificates/javascript-origamid.jpg',
            hours: 74,
            description: t('sections.training.certificates.items.javascript.description')
        },
        {
            name: t('sections.training.certificates.items.typescript.title'),
            organization: 'Origamid',
            src: '/assets/images/certificates/typescript-origamid.jpg',
            hours: 22,
            description: t('sections.training.certificates.items.typescript.description')
        },
        {
            name: t('sections.training.certificates.items.reactWithTypeScript.title'),
            organization: 'Origamid',
            src: '/assets/images/certificates/react_typescript-origamid.jpg',
            hours: 22,
            description: t('sections.training.certificates.items.reactWithTypeScript.description')
        },
        {
            name: t('sections.training.certificates.items.flexbox.title'),
            organization: 'Origamid',
            src: '/assets/images/certificates/flexbox-origamid.jpg',
            hours: 6,
            description: t('sections.training.certificates.items.flexbox.description')
        },
        {
            name: t('sections.training.certificates.items.gameDevJs.title'),
            organization: 'DIO',
            src: '/assets/images/certificates/desenvolvimento_de_jogos_com_js-dio.jpg',
            hours: 77,
            description: t('sections.training.certificates.items.gameDevJs.description')
        },
        {
            name: t('sections.training.certificates.items.kotlinBackend.title'),
            organization: 'DIO',
            src: '/assets/images/certificates/desenvolvimento_back_end_com_kotlin.jpg',
            hours: 52,
            description: t('sections.training.certificates.items.kotlinBackend.description')
        },
    ]

    const handleOpen = (graduation: Graduation) => {
        setSelectedGraduation(graduation);
        setOpenModalGraduation(true);
    };

    const handleClose = () => {
        setOpenModalGraduation(false);
        setSelectedGraduation(null);
    }

    useEffect(() => {
        if (autoClick) {
            refAction.current = setInterval(() => {
                handleClick('right');
            }, 5000);
        }

        return () => {
            if (refAction.current) {
                clearInterval(refAction.current);
            }
        };
    }, [autoClick])

    const handleClick = (direction: 'left' | 'right', automatic: boolean = true) => {
        if (!automatic) {
            setAutoClick(false)
        }
        setPrevAnimation(direction);
        if (direction === 'left') {
            setActiveImg((prevState) => (prevState === 1 ? certificates.length : prevState - 1));
        } else if (direction === 'right') {
            setActiveImg((prevState) => (prevState === certificates.length ? 1 : prevState + 1));
        }
    };

    const compareTodayDate = (year: number, month: number) => {
        const currentDate = new Date();
        const comparisonDate = new Date(year, month - 1);
        return currentDate < comparisonDate;
    }

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (event.currentTarget instanceof HTMLImageElement) {
            setModalImg(event.currentTarget.src)
        }
        setModalImgOpen(true)
    }

    const handleModalImgClose = () => {
        setModalImgOpen(false)
        setModalImg('')
    };

    const carouselStyles: { [key: string]: React.CSSProperties } = {
        carousel: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
        slide: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
        },
        activeSlide: {
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto',
        }
    };

    return (
        <BoxSection title={t('sections.training.title')} className={className}>
            <Typography indicate variant="h1" sx={{ mb: 2 }}>{t('sections.training.title')}</Typography>
            <Container>
                <Typography variant="h2">{t('sections.training.college.title')}</Typography>
                <Stack direction="row" sx={{ gap: 2, flexWrap: 'wrap', my: 2 }}>
                    {graduations.map((grad, index) => (
                        <Card key={index} sx={{ flex: '1 1 400px' }}>
                            <CardContent>
                                <Stack direction="row" sx={{ gap: 1 }}>
                                    <Tooltip title={compareTodayDate(grad.completionDate.year, grad.completionDate.month) ? t('sections.training.inProgress') : t('sections.training.completed')} arrow placement='top'>
                                        <Box>
                                            {compareTodayDate(grad.completionDate.year, grad.completionDate.month) ? <InfoRoundedIcon sx={{ color: 'info.main', fontSize: '1' }} /> : <CheckCircle sx={{ color: 'success.main', fontSize: '1' }} />}
                                        </Box>
                                    </Tooltip>
                                    <Typography variant="h3">{grad.name}</Typography>
                                </Stack>
                                <Typography variant="body1" sx={{ mb: 2, width: '100%', display: 'block' }}>
                                    {grad.institution} ({grad.period}) - {grad.type}
                                </Typography>
                                <Button
                                    sx={{ width: '100%', display: 'flex', gap: 1 }}
                                    variant="contained"
                                    onClick={() => handleOpen(grad)}
                                >
                                    {t('sections.training.viewSubjects')} <ArrowOutwardRoundedIcon />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Typography variant="h2" sx={{ mb: 2 }}>{t('sections.training.coursesAndCertificates')}</Typography>
                <Grid container sx={{ minHeight: '50vh' }} spacing={2}>
                    <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Typography
                                variant="body1"
                                color="text.primary"
                                sx={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}
                            >
                                {activeImg} / {certificates.length}
                            </Typography>

                            <StyledIconButton
                                sx={{ left: '8px', zIndex: 2 }}
                                onClick={() => handleClick('left', false)}
                            >
                                <KeyboardArrowLeftRoundedIcon />
                            </StyledIconButton>

                            <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                {certificates.map((certificate, index) => (
                                    <motion.div
                                        key={index + 1}
                                        style={{
                                            ...carouselStyles.slide,
                                            ...(index + 1 === activeImg ? carouselStyles.activeSlide : {})
                                        }}
                                        animate={index + 1 === activeImg ? {
                                            opacity: 1,
                                            x: 0,
                                            visibility: 'visible'
                                        } : {
                                            opacity: 0,
                                            x: prevAnimation === 'right' ? -100 : 100,
                                            visibility: 'hidden'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ImgWithLoading
                                            src={certificate.src}
                                            alt={certificate.name}
                                            boxProps={{
                                                sx: {
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    width: '100%',
                                                    height: '100%',
                                                }
                                            }}
                                            imgProps={{ onClick: (e) => handleImageClick(e) }}
                                        />
                                    </motion.div>
                                ))}
                            </Box>

                            <StyledIconButton
                                sx={{ right: '8px', zIndex: 2 }}
                                onClick={() => handleClick('right', false)}
                            >
                                <KeyboardArrowRightRoundedIcon />
                            </StyledIconButton>

                            <Stack
                                direction="row"
                                sx={{
                                    position: 'absolute', bottom: '10px',
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    zIndex: 2
                                }}
                                divider={<Divider orientation="vertical" sx={{ bgcolor: theme.palette.grey[400], height: '20px' }} />}
                            >
                                {certificates.map((_, index) => (
                                    <Box
                                        key={index + 1}
                                        sx={{
                                            cursor: 'pointer',
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            bgcolor: index + 1 === activeImg
                                                ? theme.palette.primary.main
                                                : theme.palette.grey[400],
                                            '&:hover': {
                                                bgcolor: theme.palette.primary.light
                                            }
                                        }}
                                        onClick={() => { setActiveImg(index + 1); setAutoClick(false) }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 6 }} sx={{ flex: '1', position: 'relative' }}>
                        {certificates.map((certificate, index) => (
                            <Box
                                key={index + 1}
                                sx={{
                                    flex: '1 1 auto',
                                    display: 'flex',
                                    height: '100%',
                                    flexDirection: 'column',
                                    position: 'absolute',
                                    transition: 'opacity 0.3s ease',
                                    opacity: index + 1 === activeImg ? 1 : 0,
                                    visibility: index + 1 === activeImg ? 'visible' : 'hidden',
                                }}
                            >
                                <Typography align='center' variant="h3">
                                    {certificate.name}
                                </Typography>
                                <Typography variant="subtitle1" align='center' sx={{ mb: 1 }}>
                                    {certificate.organization} | {certificate.hours} horas
                                </Typography>
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography align='center' variant="body1" sx={{ mb: 2 }}>
                                        {certificate.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
            <CustomModal
                open={openModalGraduation}
                onClose={handleClose}
                maxWidth='800px'
                maxHeight='700px'
                title={selectedGraduation?.name || t('sections.training.college.modalTitle')}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">{t('sections.training.college.tableHeader.order')}</Typography></TableCell>
                                <TableCell><Typography variant="h6">{t('sections.training.college.tableHeader.curriculumUnit')}</Typography></TableCell>
                                <TableCell><Typography variant="h6">{t('sections.training.college.tableHeader.workload')}</Typography></TableCell>
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
                title={t('sections.training.certificateModal.title')}
            >
                <ImgWithLoading
                    alt={certificates[activeImg - 1].name}
                    src={modalImg}
                    imgProps={{ style: { borderRadius: '4px', maxWidth: '100%' } }}
                />
            </CustomModal>
        </BoxSection>
    )
}

interface StyledIconButtonProps extends IconButtonProps {
    children?: React.ReactNode;
}

const StyledIconButton = styled(({ children, ...props }: StyledIconButtonProps) => (
    <IconButton color='primary' {...props}>
        {children}
    </IconButton>
))(({ theme }) => ({
    backgroundColor: applyOpacity(theme.palette.grey[50], 0.1),
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    '&:hover': {
        backgroundColor: applyOpacity(theme.palette.grey[700], 0.4),
    }
}));

export default Training
