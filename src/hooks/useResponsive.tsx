import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react'

const useResponsive = (): { isMobile: boolean; isDesktop: boolean } => {
    const [isMobile, setIsMobile] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)
    const theme = useTheme()

    function match(query: string): boolean {
        return window.matchMedia(query).matches
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        function handleResize() {
            setIsMobile(match(`(max-width: ${theme.breakpoints.values.md}px)`))
            setIsDesktop(match('(min-width: ${theme.breakpoints.values.md}px)`)'))
        }
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [theme.breakpoints.values.md])
    return {
        isMobile,
        isDesktop,
    }
}

export default useResponsive
