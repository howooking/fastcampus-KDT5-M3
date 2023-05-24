'use client'; // 상위 컴포넌트가 server component이므로 반드시 경계가 되는 부위에 'use client'명시
// 하위 컴포넌트(아이콘 컴포넌트)들에는 'use client'가 명시되어 있지 않(겠)지만 상위 컴포넌트가 client component이므로 괜찮다.

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

export default function DarkmodeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <>
      {currentTheme === 'dark' ? (
        <BsFillSunFill
          size={30}
          className="cursor-pointer hover:text-accent"
          onClick={() => setTheme('light')}
        />
      ) : (
        <BsFillMoonFill
          size={30}
          className="cursor-pointer hover:text-accent"
          onClick={() => setTheme('dark')}
        />
      )}
    </>
  );
}
