import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const translateText = async (text: string, lang: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "developer",
          content: `Translate the following text from english to ${lang}`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("error", error);
    return "Error";
  }
};
