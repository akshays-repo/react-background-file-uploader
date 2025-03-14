import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "File uploaded successfully",
  });
}
