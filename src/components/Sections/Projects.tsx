import { CheckCircle } from '@mui/icons-material';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, Button, Card, CardContent, Chip, Container, FormControl, Grid, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack, styled, Theme, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useResponsive from '../../hooks/useResponsive';
import { Project } from '../../Interfaces/Project';
import BoxSection from '../common/BoxSection';
import ImgWithLoading from '../common/ImgWithLoading';
import Loader from '../common/Loader/Loader';
import StacksList from '../common/StacksList';
import { StyledCard, StyledTypography as Typography } from '../Styled/StyledComponents';

type Status = Project['status']

interface FilterOptions {
    status: Status[];
    stack: string[];
}

const Projects = ({ className }: { className?: string }) => {
    const { t } = useTranslation();

    const projects: Project[] = useMemo(() => ([
        {
            id: 'clearkanban',
            name: t('sections.projects.items.clearKanban.name'),
            img: '/assets/images/clearkanban.png',
            description: t('sections.projects.items.clearKanban.description'),
            linkProjeto: 'https://clearkanban.com',
            status: 'em_desenvolvimento',
            stacks: ['nodejs', 'typescript', 'react', 'postgresql', 'socketio', 'railway', 'jwt', 'sass', 'redux', 'grafana'],
        },
        {
            id: 'dogs',
            name: t('sections.projects.items.dogs.name'),
            img: '/assets/images/dogs.jpg',
            description: t('sections.projects.items.dogs.description'),
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Projeto_Autodidata-React/tree/main/React-Origamid/08-Projeto_Final',
            linkProjeto: 'https://dogs-otavio.vercel.app/',
            status: 'em_desenvolvimento',
            stacks: ['redux', 'react', 'javascript', 'css', 'html']
        },
        {
            id: 'fantastic-animals',
            name: t('sections.projects.items.fantasticAnimals.name'),
            img: '/assets/images/animais_fantasticos.jpg',
            description: t('sections.projects.items.fantasticAnimals.description'),
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/origamid/Animais_Fantasticos',
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/origamid/Animais_Fantasticos/index.html',
            status: 'concluido',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'flex-blog',
            name: t('sections.projects.items.flexBlog.name'),
            img: 'https://otaviomendessantos.github.io/Sites_Portifolio/assets/imgs/projects/screenshot-flexblog.jpg',
            description: t('sections.projects.items.flexBlog.description'),
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/origamid/FlexBlog',
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/origamid/FlexBlog/index.html',
            status: 'concluido',
            stacks: ['html', 'css'],
        },
        {
            id: 'pomodoro',
            name: t('sections.projects.items.pomodoro.name'),
            img: '/assets/images/pomodoro.jpg',
            description: t('sections.projects.items.pomodoro.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/autoritarios/Pomodoro/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/autoritarios/Pomodoro',
            status: 'concluido',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'pokedex',
            name: t('sections.projects.items.pokedex.name'),
            img: '/assets/images/pokedex.jpg',
            description: t('sections.projects.items.pokedex.description'),
            linkProjeto: 'https://pokedex-react-topaz.vercel.app/',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Pokedex-React',
            status: 'concluido',
            stacks: ['javascript', 'html', 'css', 'react'],
        },
        {
            id: 'to-do-list',
            name: t('sections.projects.items.toDoList.name'),
            img: '/assets/images/to_do_list.png',
            description: t('sections.projects.items.toDoList.description'),
            linkProjeto: 'https://todolist-otavio.vercel.app/',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/ToDoList-NextJs',
            status: 'concluido',
            stacks: ['nextjs', 'react', 'typescript', 'sass'],
        },
        {
            id: 'tic-tac-toe',
            name: t('sections.projects.items.ticTacToe.name'),
            img: '/assets/images/jogo_da_velha.jpg',
            description: t('sections.projects.items.ticTacToe.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/autoritarios/Jogo_da_Velha/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/autoritarios/Jogo_da_Velha',
            status: 'concluido',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'detona-ralph',
            name: t('sections.projects.items.detonaRalph.name'),
            img: '/assets/images/detona_ralph.jpg',
            description: t('sections.projects.items.detonaRalph.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/dio/Detona_Ralph/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/dio/Detona_Ralph',
            status: 'refatorando',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'memory-game',
            name: t('sections.projects.items.memoryGame.name'),
            img: '/assets/images/jogo_da_memoria.jpg',
            description: t('sections.projects.items.memoryGame.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/dio/Jogo_da_Memoria/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/dio/Jogo_da_Memoria',
            status: 'refatorando',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'virtual-piano',
            name: t('sections.projects.items.virtualPiano.name'),
            img: '/assets/images/piano_virtual.jpg',
            description: t('sections.projects.items.virtualPiano.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/dio/Piano_Virtual/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/dio/Piano_Virtual',
            status: 'refatorando',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'jo-ken-po-yu-gi-oh',
            name: t('sections.projects.items.joKenPoYuGiOh.name'),
            img: '/assets/images/yu-gi-oh.jpg',
            description: t('sections.projects.items.joKenPoYuGiOh.description'),
            linkProjeto: 'https://otaviomendessantos.github.io/Sites_Portifolio/projetos/dio/Jogo_Cartas_Yu-Gi-Oh/index.html',
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Sites_Portifolio/tree/main/projetos/dio/Jogo_Cartas_Yu-Gi-Oh',
            status: 'refatorando',
            stacks: ['javascript', 'html', 'css'],
        },
        {
            id: 'breeze',
            name: t('sections.projects.items.breeze.name'),
            description: t('sections.projects.items.breeze.description'),
            linkRepositorio: 'https://github.com/OtavioMendesSantos/Breeze',
            status: 'em_planejamento',
            stacks: ['expo', 'react'],
        },
    ]), [t]);

    const { isMobile } = useResponsive();
    const maxViewProjects = 3

    const [viewProjects, setViewProjects] = useState(maxViewProjects)
    const [filters, setFilters] = useState<FilterOptions>({
        status: [],
        stack: []
    })
    const [filteredProjects, setFilteredProjects] = useState(projects)

    const renameStatus = (status: string) => {
        switch (status) {
            case 'concluido':
                return t('sections.projects.status.completed');
            case 'em_desenvolvimento':
                return t('sections.projects.status.inDevelopment');
            case 'nao_iniciado':
                return t('sections.projects.status.notStarted');
            case 'em_planejamento':
                return t('sections.projects.status.inPlanning');
            case 'refatorando':
                return t('sections.projects.status.refactoring');
            default:
                return status;
        }
    }

    const filteredStacks = useMemo(() => {
        return (
            projects.reduce((acc, project) => {
                project.stacks.forEach((stack) => {
                    if (!acc.includes(stack)) {
                        acc.push(stack)
                    }
                })
                return acc
            }, [] as string[])
        )
    }, [projects])

    const filteredStatus = useMemo(() => {
        return (
            projects.reduce((acc, project) => {
                if (!acc.includes(project.status)) {
                    acc.push(project.status)
                }
                return acc
            }, [] as Status[])
        )
    }, [projects])

    const ProjectStatus: React.FC<{ status: Status }> = ({ status }) => {
        switch (status) {
            case 'concluido':
                return <CheckCircle sx={{ color: 'success.main', fontSize: '1' }} />
            case 'em_desenvolvimento':
                return <WarningRoundedIcon sx={{ color: 'warning.main', fontSize: '1' }} />
            case 'nao_iniciado':
                return <ErrorRoundedIcon sx={{ color: 'error.main', fontSize: '1' }} />
            case 'em_planejamento':
                return <ErrorRoundedIcon sx={{ color: 'grey.400', fontSize: '1' }} />
            case 'refatorando':
                return <InfoRoundedIcon sx={{ color: 'info.main', fontSize: '1' }} />
        }
    }

    const chipsSelect: React.FC<{ selected: string[] }> = ({ selected }) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                }}
            >
                <AnimatePresence>
                    {selected.map((value) => (
                        <motion.div
                            key={value}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ marginRight: '0.5rem' }}
                        >
                            <Chip
                                size="small"
                                label={renameStatus(value)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>
        )
    }

    const handleFilterChange = (event: SelectChangeEvent<string[]>, name: string) => {
        const { target: { value } } = event
        setFilters((prev) => ({ ...prev, [name]: value as string[] }))
    }

    useEffect(() => {
        if (filters.stack.length === 0 && filters.status.length === 0) {
            setFilteredProjects(projects)
            return
        } else {
            const filtered = projects.filter((project) => {
                const hasAllStacks = filters.stack.every(stack => project.stacks.includes(stack));
                if (filters.status.length === 0) { return hasAllStacks }
                const hasStatus = filters.status.includes(project.status);

                return hasAllStacks && hasStatus;
            });
            setFilteredProjects(filtered)
        }
    }, [filters, projects])

    const projectStacks = (stacks: string[]): { name: string }[] => {
        return stacks.map((stack) => ({ name: stack }))
    }

    return (
        <BoxSection title={t('sections.projects.title')} className={className}>
            <Typography indicate variant="h1">{t('sections.projects.title')}</Typography>
            <StyledContainer>
                <Card sx={{ width: '100%' }}>
                    <Stack
                        direction="row"
                        sx={{ p: 2, gap: 2, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <FormControl sx={{ flex: '1 0 150px' }} size='small'>
                            <InputLabel
                                id='Stack-Label'
                                sx={(theme: Theme) => ({
                                    color: theme.palette.text.primary,
                                })}
                            >
                                {t('sections.projects.filters.technologies')}
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId='Stack-Label'
                                label={t('sections.projects.filters.technologies')}
                                onChange={(event) => handleFilterChange(event, 'stack')}
                                value={filters.stack}
                                multiple
                                renderValue={(selected) => (chipsSelect({ selected }))}
                            >
                                <MenuItem value="" disabled>{t('sections.projects.filters.select')}</MenuItem>
                                {filteredStacks.map((project, index) => (
                                    <MenuItem value={project} key={index}>{project}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ flex: '1 0 150px' }} size='small'>
                            <InputLabel
                                id='Status-Label'
                                sx={(theme: Theme) => ({
                                    color: theme.palette.text.primary,
                                })}
                            >
                                {t('sections.projects.filters.status')}
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId='Status-Label'
                                label='Status'
                                onChange={(event) => handleFilterChange(event, 'status')}
                                value={filters.status}
                                multiple
                                renderValue={(selected) => (chipsSelect({ selected }))}
                            >
                                <MenuItem value="" disabled>{t('sections.projects.filters.select')}</MenuItem>
                                {filteredStatus.map((project, index) => (
                                    <MenuItem value={project} key={index}>{renameStatus(project)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Card>
                <AnimatePresence>
                    {filteredProjects.length > 0
                        ? filteredProjects.map((project, index) => (
                            (index + 1 <= viewProjects)
                                ? (
                                    <motion.div
                                        key={project.id}
                                        style={{ width: '100%' }}
                                        initial={{ opacity: 0, x: -100 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        viewport={{ once: false, amount: 0.4, margin: '3000px 0px 0px 0px' }}
                                        transition={{
                                            duration: 0.3,
                                            delay: (index % 2) * 0.2
                                        }}
                                    >
                                        <StyledCard key={index}>
                                            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <Box sx={{ top: 16, left: 16, position: 'absolute' }} >
                                                    <Tooltip placement='top' arrow title={renameStatus(project.status)}>
                                                        <Box sx={{ height: 'min-content', width: 'min-content' }}>
                                                            <ProjectStatus status={project.status} />
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                                <Typography
                                                    variant='h2'
                                                    align='center'
                                                    sx={{ mb: 2, px: 2.5 }}
                                                >
                                                    {project.name}
                                                </Typography>
                                                <Stack direction="row" sx={{ width: '100%', flexGrow: 1 }}>
                                                    <Grid container spacing={2} sx={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                                                        <Grid size={{ xs: 12, sm: 4 }}>
                                                            <ImgWithLoading
                                                                alt={project.name}
                                                                src={project.img || '/assets/images/no_image.png'}
                                                                imgProps={{
                                                                    style: {
                                                                        aspectRatio: '1 / 1',
                                                                        borderRadius: '4px',
                                                                    }
                                                                }}
                                                                boxProps={{
                                                                    sx: {
                                                                        width: isMobile ? '80%' : '100%',
                                                                        margin: '0 auto',
                                                                    },

                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            size={{ xs: 12, sm: 8 }}
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <Box>
                                                                <Typography>
                                                                    {project.description}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant='subtitle1'>{t('sections.projects.technologiesUsed')}:</Typography>
                                                            <StacksList
                                                                containerProps={{
                                                                    sx: {
                                                                        justifyContent: 'space-evenly'
                                                                    }
                                                                }}
                                                                itens={projectStacks(project.stacks)}
                                                            />
                                                            <Stack
                                                                useFlexGap
                                                                sx={{ gap: 1 }}
                                                            >
                                                                {project.linkProjeto &&
                                                                    <Link
                                                                        href={project.linkProjeto}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Button
                                                                            fullWidth
                                                                            variant="contained"
                                                                            sx={{ gap: 1 }}
                                                                        >
                                                                            {t('sections.projects.seeProject')} <OpenInNewRoundedIcon />
                                                                        </Button>
                                                                    </Link>}
                                                                {project.linkRepositorio &&
                                                                    <Link
                                                                        href={project.linkRepositorio}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Button
                                                                            fullWidth
                                                                            variant="contained"
                                                                            sx={{ gap: 1 }}
                                                                        >
                                                                            {t('sections.projects.seeCode')}
                                                                            <CodeRoundedIcon />
                                                                        </Button>
                                                                    </Link>
                                                                }
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </StyledCard>
                                    </motion.div>
                                )
                                : null
                        ))
                        : <Box>
                            <Loader /><Typography> {t('sections.projects.noProjects')}</Typography>
                        </Box>
                    }
                </AnimatePresence>
                <Box>
                    {filteredProjects.length > viewProjects ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setViewProjects((prev) => prev + maxViewProjects)}
                        >
                            {t('sections.projects.viewMore')}
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setViewProjects(maxViewProjects)}
                        >
                            {t('sections.projects.seeLess')}
                        </Button>
                    )}
                </Box>
            </StyledContainer>
        </BoxSection>
    )
}

const StyledContainer = styled(Container)(({ }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'stretch',
}));

export default Projects
