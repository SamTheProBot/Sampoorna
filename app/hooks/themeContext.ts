import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface themeType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<themeType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const system = useColorScheme();
    const [theme, setTheme] = useState<'light' | 'dark'>(system);

    return (
        { children }
    )
})
