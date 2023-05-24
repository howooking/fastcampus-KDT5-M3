import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DarkmodeSwitch from '@/components/darkmodeSwitch';
import Quote from '@/components/quote';
import { Suspense } from 'react';
import Loading from './loading';

const Sidebar = () => {
  return (
    <aside className="flex w-80 select-none flex-col gap-5 p-8 shadow-xl">
      {/* main logo */}
      <h1 className="text-center text-5xl font-bold">Do or Die</h1>

      {/* nav menu */}
      <div className="flex-1">
        <ul className="flex flex-col gap-3">
          <li>
            <Link href="/">
              <Button variant="outline" className="w-full text-lg">
                Todo
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <Button variant="outline" className="w-full text-lg">
                About
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      {/* quote */}
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Loading size={60} />
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <Quote />
      </Suspense>

      {/* dark mode switch */}
      <div className="flex justify-end">
        <DarkmodeSwitch />
      </div>
    </aside>
  );
};

export default Sidebar;
