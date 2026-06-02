import {
    createTheme,
    CssBaseline,
    Theme,
    ThemeOptions,
    ThemeProvider,
} from '@mui/material'
import { deepmerge } from '@mui/utils'
import React, { useCallback, useEffect, useState } from 'react'

const createCustomTheme = (mode: 'light' | 'dark') => {
    const colorMode: {
        light: ThemeOptions['palette'];
        dark: ThemeOptions['palette'];
    } = {
        light: {
            mode: 'light',
            primary: {
                main: '#F25424'
            },
            secondary: {
                main: '#244CF2'
            },
            background: {
                default: '#FFFFFF',
                paper: '#FFFFFF'
            },
            text: {
                primary: '#222222',
                secondary: '#FFFFFF',
            }
        },
        dark: {
            mode: 'dark',
            primary: {
                main: '#F25424'
            },
            secondary: {
                main: '#244CF2'
            },
            background: {
                default: '#222222',
                paper: '#222222'
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#161616',
            }
        }
    }

    const defaultTheme = createTheme({
        palette: {
            ...colorMode[mode]
        }
    })

    const customTheme = createTheme({
        palette: { ...defaultTheme.palette },
        typography: {
            fontFamily: ['"Poppins"', 'sans-serif'].join(','),
            h1: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '2rem',
                fontWeight: 700
            },
            h2: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '1.5rem',
                fontWeight: 700
            },
            h3: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700
            },
            h4: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '1rem',
                fontWeight: 700
            },
            h5: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 700
            },
            h6: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700
            },
            body1: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1rem',
                fontWeight: 400
            },
            body2: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 400
            },
            subtitle1: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'inline'
            },
            subtitle2: {
                fontFamily: '"Druk Wide", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 700,
                display: 'inline'
            },
            button: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 700
            },
            caption: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: defaultTheme.palette.grey[400]
            },
            overline: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: defaultTheme.palette.grey[400]
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '*': {
                        transition: 'background-color .3s ease-in-out',
                    },
                },
            },
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h1',
                        h2: 'h2',
                        h3: 'h3',
                        h4: 'h4',
                        h5: 'h5',
                        h6: 'h6',
                        subtitle1: 'h2',
                        subtitle2: 'h2',
                        body1: 'p',
                        body2: 'p',
                        button: 'span',
                        caption: 'p',
                        overline: 'span'
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            color: defaultTheme.palette.text.primary,
                        }
                    }
                }
            }
        }
    })

    return createTheme(deepmerge(defaultTheme, customTheme))
}

const CustomThemeProvider = (
    { children, mode }: { children: React.ReactNode, mode: 'light' | 'dark' }
) => {
    const [theme, setTheme] = useState<Theme>(() => createCustomTheme(mode))

    useEffect(() => {
        console.log('%cSeja Bem vindo!', 'color: #F25424; font-size: 32px; width: 100%;, text-align: center;')
    }, [])

    const generateCSS = useCallback((theme: Theme) => {
        return `
            :root {
            --primary-main: ${theme.palette.primary.main};
            --primary-dark: ${theme.palette.primary.dark};
            --primary-contrastText: ${theme.palette.primary.contrastText};
            --primary-light: ${theme.palette.primary.light};
            --secondary-main: ${theme.palette.secondary.main};
            --background-default: ${theme.palette.background.default};
            --background-paper: ${theme.palette.background.paper};
            --text-primary: ${theme.palette.text.primary};
            --text-secondary: ${theme.palette.text.secondary};
            }

            body {
            font-family: ${theme.typography.fontFamily};
            background-color: var(--background-default);
            color: var(--text-primary);
            }

            h1 {
            font-size: ${theme.typography.h1.fontSize};
            font-weight: ${theme.typography.h1.fontWeight};
            }
        `
    }, [])

    useEffect(() => {
        const finalTheme = createCustomTheme(mode)
        setTheme(finalTheme)
        if (typeof window !== 'undefined') window.theme = finalTheme
    }, [mode])

    useEffect(() => {
        const styleCustom = document.getElementById('style-css')
        if (styleCustom) document.head.removeChild(styleCustom)
        const cssText = generateCSS(theme)
        const styleCss = document.createElement('style')
        styleCss.id = 'style-css'
        styleCss.innerHTML = cssText
        document.head.appendChild(styleCss)
    }, [theme, generateCSS])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default CustomThemeProvider
