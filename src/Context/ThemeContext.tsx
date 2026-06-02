import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import CustomThemeProvider from '../styles/CustomThemeProvider';

type ThemeContextType = {
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<'light' | 'dark'>('light');

    const setMode = useCallback((newMode: 'light' | 'dark') => {
        setModeState(newMode);

        if (typeof window !== 'undefined') {
            window.localStorage.setItem('theme', newMode);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const storedMode = window.localStorage.getItem('theme');

        if (storedMode === 'light' || storedMode === 'dark') {
            setModeState(storedMode);
        } else {
            setModeState(mediaQuery.matches ? 'dark' : 'light');
        }

        const handleChange = (e: MediaQueryListEvent) => {
            const currentStoredMode = window.localStorage.getItem('theme');
            if (currentStoredMode === 'light' || currentStoredMode === 'dark') return;

            setModeState(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <CustomThemeProvider mode={mode}>
                {children}
            </CustomThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
