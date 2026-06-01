import Logo from '/assets/svgs/logo_outlined.svg'
import { AppBar, Box, Stack, useTheme, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { useThemeContext } from '../../../Context/ThemeContext'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const StyledSwitch = styled('div')(({ theme }) => ({
  '.switch': {
    fontSize: '14px',
    position: 'relative',
    display: 'inline-block',
    width: '3em',
    height: '1.7em',
    'input': {
      opacity: 0,
      width: 0,
      height: 0,
    }
  },

  '.slider': {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'all .3s ease-in-out',
    borderRadius: '30px',
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[300]}`,

    '&:hover': {
      backgroundColor: theme.palette.grey[300],
      '&:before': {
        backgroundColor: theme.palette.grey[300]
      }
    },

    '&:before': {
      position: 'absolute',
      content: '""',
      height: '1.2em',
      width: '1.2em',
      borderRadius: '50%',
      left: '10%',
      bottom: '15%',
      boxShadow: `inset 8px -4px 0px 0px ${theme.palette.primary.main}`,
      transition: 'all .3s ease-in-out',
      backgroundColor: theme.palette.grey[200],
    }
  },

  'input:checked + .slider': {
    backgroundColor: theme.palette.grey[800],
    border: `1px solid ${theme.palette.grey[700]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
      transform: 'scale(1.05)',
    },
    '&:before': {
      transform: 'translateX(100%)',
      boxShadow: `inset 15px -4px 0px 15px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.main,
    }
  },
}));

// Componente de bandeira para seleção de idioma
const LanguageFlag = styled('div')(() => ({
  width: '32px',
  height: '22px',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  position: 'relative',

  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    transform: 'scale(1.05)',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  '& svg': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

const Header = (
  { position = 'static' }:
    { position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative' }
) => {
  const theme = useTheme()
  const { mode, setMode } = useThemeContext()
  const [darkMode, setDarkMode] = useState(mode === 'dark')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setDarkMode(theme.palette.mode === 'dark')
  }, [theme.palette.mode])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = (event.target.checked ? 'dark' : 'light')
    setDarkMode(event.target.checked)
    setMode(newMode)
  }

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // SVGs das bandeiras
  const BrazilFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504">
      <rect width="720" height="504" fill="#009b3a" />
      <polygon points="360,72 648,252 360,432 72,252" fill="#ffdf00" />
      <circle cx="360" cy="252" r="108" fill="#002776" />
      <path d="M255 237a120 120 0 0 1 210 0" fill="none" stroke="#fff" strokeWidth="15" />
    </svg>
  );

  const USAFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900">
      <rect width="7410" height="3900" fill="#b22234" />
      <g fill="#fff">
        <rect y="300" width="7410" height="300" />
        <rect y="900" width="7410" height="300" />
        <rect y="1500" width="7410" height="300" />
        <rect y="2100" width="7410" height="300" />
        <rect y="2700" width="7410" height="300" />
        <rect y="3300" width="7410" height="300" />
      </g>
      <rect width="2964" height="2100" fill="#3c3b6e" />
    </svg>
  );

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
        sx={{
          height: '60px',
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color .3s ease-in-out',
        }}
        component="header"
      >
        <Stack
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
          direction="row"
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo Site - Desenvolvedor Otávio"
            onDragStart={(e: React.DragEvent<HTMLImageElement>) => e.preventDefault()}
            sx={{
              height: '100%',
              width: 'fit-content',
            }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ position: 'absolute', right: '10px', }}
          >
            <Tooltip title={t('header.changeLanguage')}>
              <LanguageFlag onClick={toggleLanguage}>
                {i18n.language === 'en' ? <USAFlag /> : <BrazilFlag />}
              </LanguageFlag>
            </Tooltip>
            <StyledSwitch>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={darkMode}
                  aria-label='Switch Dark Mode'
                />
                <span className="slider" />
              </label>
            </StyledSwitch>
          </Stack>
        </Stack>
      </AppBar>
    </>
  )
}

export default Header
