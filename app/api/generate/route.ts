import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter, AnalysisResult } from "@/lib/claude";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cv, jd, analysis } = body as { cv: string; jd: string; analysis: AnalysisResult };

  if (!cv?.trim() || !jd?.trim() || !analysis) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const letter = await generateCoverLetter(cv, jd, analysis);
    return NextResponse.json({ letter });
  } catch {
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
