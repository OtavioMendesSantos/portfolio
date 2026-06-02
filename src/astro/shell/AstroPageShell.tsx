import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import '../../App.css';
import '../../i18n';
import { ThemeProviderWrapper } from '../../Context/ThemeContext';

const AstroPageShell = ({ children }: { children: ReactNode }) => (
  <ThemeProviderWrapper>
    {children}
    <Analytics />
  </ThemeProviderWrapper>
);

export default AstroPageShell;
