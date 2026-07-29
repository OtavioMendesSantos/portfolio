import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import { Box, Button, CardContent, Chip, Container, Link, Stack, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../hooks/useResponsive'
import { GitHubRepos } from '../../Interfaces/GitHubRepos'
import { applyOpacity } from '../../utils/utils'
import BoxSection from '../common/BoxSection'
import Loader from '../common/Loader/Loader'
import { StyledCard, StyledTypography as Typography } from '../Styled/StyledComponents'

const Repositories = ({ className }: { className?: string }) => {
    const username = 'OtavioMendesSantos'
    const { isMobile } = useResponsive()
    const [repos, setRepos] = useState<GitHubRepos[]>([])
    const theme = useTheme()
    const { t } = useTranslation()
    const GITHUB_TOKEN: string = import.meta.env.PUBLIC_GITHUB_TOKEN || ''
    const maxView = isMobile ? 6 : 9
    const [inView, setInView] = useState(maxView)
    const [loadingRepos, setLoadingRepos] = useState(false)

    useEffect(() => {
        async function getUserRepositories() {
            try {
                if (!GITHUB_TOKEN) throw new Error('Token Ausente')
                setLoadingRepos(true)
                const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json'
                    }
                })
                if (response.ok) {
                    const data: GitHubRepos[] = await response.json()
                    setRepos(data)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingRepos(false)
            }
        }
        getUserRepositories()
    }, [GITHUB_TOKEN])

    const handleClick = () => {
        setInView((prev) => prev + maxView)
    }

    return (
        <BoxSection title={t('sections.repositories.title')} className={className}>
            <Typography variant="h1" indicate sx={{ mb: 6 }}>{t('sections.repositories.title')}</Typography>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    padding: 2,
                    '@media (max-width: 600px)': {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
                {repos.length > 0 ? (
                    repos.map((repo, index) => (
                        inView > index && (
                            <motion.div
                                key={repo.id}
                                style={{ flex: '1', maxWidth: '350px', height: 'min-content', width: '100%', }}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                viewport={{ once: false, amount: 0.5, margin: '900px 0px 0px 0px' }}
                                transition={{
                                    duration: 0.5,
                                    delay: (index % 2) * 0.2
                                }}
                            >
                                <StyledCard
                                    sx={{
                                        flex: '1 1 300px',
                                        maxWidth: '350px',
                                        minWidth: isMobile ? '200px' : '300px',
                                        minHeight: '250px',
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 2,
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            borderColor: theme.palette.primary.main,
                                            boxShadow: `0px 4px 20px ${applyOpacity(theme.palette.primary.main, 0.2)}`,
                                        },
                                    }}
                                >
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 3,
                                        flex: '1'
                                    }}>
                                        <Box>
                                            <Typography
                                                variant="h3"
                                                component='p'
                                                sx={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    mb: 1,
                                                }}
                                            >
                                                {repo.name}
                                            </Typography>
                                            {repo.topics?.length > 0 && (
                                                <Stack direction="row" sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }} useFlexGap>
                                                    {repo.topics?.map((topic) => (
                                                        <Chip key={topic} label={topic} size="small" sx={{ mr: 0.5, fontSize: '0.75rem' }} />
                                                    ))}
                                                </Stack>
                                            )}
                                        </Box>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            {repo.description ? repo.description : t('sections.repositories.noDescription')}
                                        </Typography>
                                        <Link
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ textDecoration: 'none', mt: 'auto' }}
                                        >
                                            <Button sx={{ width: '100%' }} variant="contained" color="primary">
                                                {t('sections.repositories.visitRepository')} <LaunchRoundedIcon fontSize="inherit" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </StyledCard>
                            </motion.div>
                        )
                    ))

                ) : (
                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                        <Loader />
                        {loadingRepos && <Typography variant="body1">{t('sections.repositories.loading')}</Typography>}
                    </Box>
                )}
            </Container>
            {repos.length > inView && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="outlined" onClick={handleClick}>{t('sections.repositories.viewMore')}</Button>
                </Box>
            )}
        </BoxSection >
    )
}

export default Repositories
