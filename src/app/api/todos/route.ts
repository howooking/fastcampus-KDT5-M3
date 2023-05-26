import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
        username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
      },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const res = await fetch(
    'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
        username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
      },
      body: JSON.stringify({ title }),
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const todoId = searchParams.get('id');

  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
        username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
      },
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const { title, done, todoId } = await request.json();
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
        username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
      },
      body: JSON.stringify({ title, done }),
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
