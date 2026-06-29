import { NextRequest, NextResponse } from "next/server";
import { analyzeCV } from "@/lib/claude";

const FREE_LIMIT = 3;
const usage = new Map<string, number>(); // in-memory for MVP; replace with Supabase later

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const count = usage.get(ip) ?? 0;

  if (count >= FREE_LIMIT) {
    return NextResponse.json(
      { error: "free_limit_reached", message: "You've used your 3 free analyses." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { cv, jd } = body as { cv: string; jd: string };

  if (!cv?.trim() || !jd?.trim()) {
    return NextResponse.json({ error: "Missing CV or job description." }, { status: 400 });
  }

  try {
    const result = await analyzeCV(cv, jd);
    usage.set(ip, count + 1);
    return NextResponse.json({ result, usesLeft: FREE_LIMIT - count - 1 });
  } catch {
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
