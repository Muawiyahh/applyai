import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface AnalysisResult {
  score: number;
  keywords: string[];
  strengths: string[];
  improvements: string[];
  summary: string;
}

export async function analyzeCV(cv: string, jd: string): Promise<AnalysisResult> {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a professional career coach. Analyze this CV against the job description and return ONLY valid JSON with no markdown, no code blocks, just raw JSON.

Return exactly this shape:
{"score":number,"keywords":string[],"strengths":string[],"improvements":string[],"summary":string}

- score: 0-100 match percentage
- keywords: up to 8 important keywords from the JD missing from the CV
- strengths: up to 4 things the CV does well for this role
- improvements: up to 4 specific things to improve
- summary: one sentence overall assessment

CV:
${cv}

Job Description:
${jd}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text) as AnalysisResult;
}

export async function generateCoverLetter(
  cv: string,
  jd: string,
  analysis: AnalysisResult
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Write a professional, tailored cover letter for this candidate applying to this role. Be specific, confident, and concise — 3 paragraphs maximum. Do not include a subject line or date, just the letter body starting with "Dear Hiring Manager,".

CV:
${cv}

Job Description:
${jd}

Key strengths to highlight: ${analysis.strengths.join(", ")}`,
      },
    ],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}
