import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { AppBar, Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../../../Context/ThemeContext'
import { applyOpacity } from '../../../utils/utils'

const Logo = '/assets/svgs/logo_outlined.svg'

type HeaderPosition = 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'

const Header = ({ position = 'static' }: { position?: HeaderPosition }) => {
  const theme = useTheme()
  const { setMode } = useThemeContext()
  const { t, i18n } = useTranslation()
  const isDarkMode = theme.palette.mode === 'dark'

  const toggleTheme = () => {
    setMode(isDarkMode ? 'light' : 'dark')
  }

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return (
    <>
      {position === 'fixed' &&
        <Box
          sx={{
            height: '60px',
            backgroundColor: 'background.default',
            transition: 'background-color .3s ease-in-out',
          }}
        />
      }
      <AppBar
        position={position}
        elevation={0}
        sx={{
          height: '60px',
          backgroundColor: applyOpacity(theme.palette.background.paper, 0.86),
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: 'background-color .3s ease-in-out',
        }}
        component="header"
      >
        <Stack
          component="nav"
          direction="row"
          sx={{
            width: '100%',
            maxWidth: '1180px',
            height: '100%',
            mx: 'auto',
            px: { xs: 2, md: 0 },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25, minWidth: 0 }}>
            <Box
              component="img"
              src={Logo}
              alt="Otávio.dev"
              onDragStart={(event: React.DragEvent<HTMLImageElement>) => event.preventDefault()}
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.primary',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Otávio dev
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Tooltip title={t('header.changeLanguage')}>
              <Button
                variant="text"
                size="small"
                onClick={toggleLanguage}
                aria-label={t('header.changeLanguage')}
                sx={{
                  minWidth: 42,
                  color: 'text.primary',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {i18n.language === 'pt' ? 'PT' : 'EN'}
              </Button>
            </Tooltip>

            <Tooltip title={t('header.switchDarkMode')}>
              <IconButton
                color="primary"
                onClick={toggleTheme}
                aria-label={t('header.switchDarkMode')}
                sx={{
                  width: 38,
                  height: 38,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </AppBar>
    </>
  )
}

export default Header
