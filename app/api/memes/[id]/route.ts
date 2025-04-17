import { NextResponse } from "next/server";
import { memes } from "../db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const index = memes.findIndex((meme) => meme.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });
    }

    memes[index] = { ...memes[index], ...body };

    return NextResponse.json(memes[index]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
