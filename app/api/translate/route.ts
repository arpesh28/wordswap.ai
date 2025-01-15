import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:
    "https://gateway.ai.cloudflare.com/v1/59ab2bc2a5cd4af205f2b018f61f0f97/translator-ai/openai/",
});

export async function POST(request: Request) {
  const { lang, text } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content: `Translate the following text from English to ${lang}`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 20,
    });
    return new Response(
      JSON.stringify({ message: response?.choices?.[0]?.message?.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("error", error);
    return new Response("Error", { status: 500 });
  }
}
