// Example: How to use Vercel AI Gateway
//
// This is a template for future AI features. Currently unused.
// To activate:
// 1. Remove this comment block
// 2. Add VERCEL_AI_GATEWAY_KEY to Vercel environment variables
// 3. Call this route from your frontend or other endpoints
//
// Example usage:
//   const response = await fetch('/api/ai-example?prompt=Explain QueryArc in one sentence')
//   const result = await response.json()
//   console.log(result.message)

import { streamText } from "ai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") || "Hello, world!";

  // TODO: Implement using Vercel AI Gateway when ready
  // const result = await streamText({
  //   model: 'openai/gpt-4o',
  //   prompt,
  //   apiKey: process.env.VERCEL_AI_GATEWAY_KEY,
  // });

  return Response.json({
    success: false,
    message: "AI Gateway template ready but not yet activated. Ask to integrate when needed.",
  });
}
