'use client';

import { ThemeProvider } from 'next-themes';

const DarkmodeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem attribute="class">
      <div className="h-full transition-colors duration-300">{children}</div>
    </ThemeProvider>
  );
};

export default DarkmodeProvider;
