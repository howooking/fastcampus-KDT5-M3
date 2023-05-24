'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <h2 className="text-4xl">Something went wrong!</h2>
      <h3 className="text-3xl">{error.message}</h3>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
