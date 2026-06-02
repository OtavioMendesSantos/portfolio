import KeyboardDoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown'
import { Box, Grid, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../hooks/useResponsive'
import BoxSection from '../common/BoxSection'
import StacksList from '../common/StacksList'
import { StyledTypography as Typography } from '../Styled/StyledComponents'

const Presentation = ({ className }: { className?: string }) => {
    const { isMobile } = useResponsive()
    const { t } = useTranslation()

    const stacksItens = [
        { name: 'react' },
        { name: 'javascript' },
        { name: 'typescript' },
        { name: 'materialui' },
        { name: 'redux' },
        { name: 'git' },
    ]

    const contactsList = [
        {
            name: 'github',
            href: 'https://github.com/OtavioMendesSantos',
        },
        {
            name: 'linkedin',
            href: 'https://www.linkedin.com/in/otaviomendessantos//',
        },
        {
            name: 'twitter',
            href: 'https://x.com/OtavioDev',
        },
    ]

    return (
        <BoxSection
            sx={{
                height: 'calc(100vh - 60px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                bgcolor: 'background.default',
                px: isMobile ? 2 : 0,
            }}
            title="Sobre mim"
            className={className}
        >
            <Grid
                container
                sx={{
                    maxHeight: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    style={{
                        width: '100%',
                        minHeight: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                        container
                        size={{ xs: 12, md: 12 }}
                        sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
                    >
                        <Grid
                            size={{ xs: 12, sm: 12, md: 6 }}
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography variant="h1" indicate>{t('presentation.name')}</Typography>
                            <Typography variant="subtitle1">{t('presentation.job')}</Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>{t('presentation.description')}</Typography>
                            <StacksList
                                indicate
                                title={t('presentation.dominateTechnologies')}
                                itens={stacksItens}
                            />
                            <StacksList
                                indicate
                                title={t('presentation.contacts')}
                                itens={contactsList}
                            />
                        </Grid>
                    </Grid>
                </motion.div>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <IconButton
                    aria-label={t('presentation.goMainPage')}
                    color="primary"
                    onClick={() => window.scroll({ top: window.innerHeight - 60, behavior: 'smooth' })}
                >
                    <KeyboardDoubleArrowDown />
                </IconButton>
            </Box>
        </BoxSection >
    )
}

export default Presentation
