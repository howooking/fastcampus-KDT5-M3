import { Metadata } from 'next';
import Image from 'next/image';

const TECHS = [
  'react',
  'typescript',
  'nextjs',
  'tailwind',
  'react-query',
  'sortablejs',
];

export const metadata: Metadata = {
  title: 'About',
  description: 'Super Fast Campus Personal Todo Application Project',
  authors: { name: 'howoo', url: 'https://github.com/howooking' },
  creator: 'howoo',
  applicationName: 'Fast Campus Todo App',
  keywords: [
    'fast campus frontend boot camp',
    'todo',
    'react todo',
    'next13 todo',
  ],
};

const page = () => {
  return (
    <div className="flex-1 select-none p-8">
      <div className="flex h-full w-full flex-col items-center justify-center gap-20 rounded-lg bg-muted shadow-md ">
        <a
          className="relative transition duration-300 hover:scale-105"
          href="https://github.com/howooking/fastcampus-KDT5-M3"
          target="_blank"
        >
          <Image
            alt="visit"
            src="/visit.gif"
            width={300}
            height={100}
            className="absolute -right-24 -top-8"
          />
          <Image
            alt="profile"
            src="/hprofile.jpg"
            width={300}
            height={300}
            className="rounded-full shadow-2xl"
          />
        </a>
        <div>
          <h2 className="p-5 text-center text-3xl font-bold">
            Techs Used In This Project
          </h2>
          <ul className="flex gap-2">
            {TECHS.map((tech) => (
              <li key={tech}>
                <Image
                  alt="logo"
                  src={`/${tech}.svg`}
                  width={80}
                  height={80}
                  className="h-20"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
