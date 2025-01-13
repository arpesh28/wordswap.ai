import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
