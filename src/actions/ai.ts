"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

type GenerateDescAction = {
  type: "project" | "task";
  name: string;
};

export const generateDescription = async (args: GenerateDescAction) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content: `You help genarate descriptions for projects and tasks on a Task management app and return only the HTML in a json { content: "<p>html content</p>" } just like a rich text editor content.`,
      },
      {
        role: "user",
        content: `I need a description for a ${args.type} called ${args.name}.`,
      },
    ],
    max_tokens: 150,
    response_format: {
      type: "json_object",
    },
  });

  const { choices } = completion;
  const { message } = choices[0];
  const { content } = message;

  return JSON.parse(content || "") as { content: string };
};
