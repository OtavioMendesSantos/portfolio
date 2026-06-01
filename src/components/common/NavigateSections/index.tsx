import { Box, Theme } from '@mui/material'
import { handleOpacityColor } from '../../../utils/utils'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useResponsive from '../../../hooks/useResponsive'
import { useTranslation } from 'react-i18next'

interface NavigateSectionProps {
  elements: NodeListOf<Element> | null
}

const NavigateSection = ({ elements }: NavigateSectionProps) => {
  const [active, setActive] = useState<string>('')
  const { isMobile } = useResponsive()
  const { t } = useTranslation()

  useEffect(() => {
    if (!elements) return
    const handleScroll = () => {
      const hasActive = Array.from(elements).find((section) => {
        const sectionRect = section.getBoundingClientRect();
        return sectionRect.top < 100 && sectionRect.bottom > 60 // Header
      })
      if (hasActive) {
        const sectionName = hasActive.getAttribute('data-section-name')
        setActive(sectionName ?? '')
      } else {
        setActive('')
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [elements, t])

  const handleClick = (element: Element) => {
    const elementRect = element.getBoundingClientRect()
    const offset = 60 // Header
    const top = elementRect.top + window.scrollY - offset
    window.scrollTo({ behavior: 'smooth', top: top })
  }

  return (
    <AnimatePresence>
      {!active || !elements
        ? null
        : <motion.div
          style={{ position: 'fixed', top: '10px', right: '10px' }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={(theme: Theme) => ({
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              backgroundColor: handleOpacityColor(theme.palette.background.paper, 0.6),
              borderRadius: '5px',
              padding: '5px',
              gap: '.5rem',
              zIndex: 1000,
            })}
          >
            {Array.from(elements).map((element, index) => {
              const sectionName = element.getAttribute('data-section-name');
              if (!sectionName) return null;
              const isActive = sectionName === active
              return (
                <Box
                  key={`${sectionName}-${index}`}
                  onClick={() => handleClick(element)}
                  sx={{
                    cursor: 'pointer',
                    color: isActive ? 'primary.main' : 'text.primary',
                    transform: isActive ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.2s ease',
                    userSelect: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      transform: !isMobile ? 'scale(1.05)' : undefined,
                    }
                  }}
                  role="button"
                  aria-label={`Navigate to ${sectionName}`}
                >
                  {isMobile
                    ? <Box
                      sx={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'primary.main' : 'text.disabled',
                        transition: 'all 0.2s ease',
                      }}
                    />
                    : sectionName}
                </Box>
              )
            })}
          </Box>
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default NavigateSection
