import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { todoIds } = await request.json();
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
        username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
      },
      body: JSON.stringify({ todoIds }),
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
