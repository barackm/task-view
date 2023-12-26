"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

type GenerateDescAction = {
  type: "project" | "task";
  name: string;
  projectName?: string;
  projectDescription?: string;
};

export const generateDescription = async (args: GenerateDescAction) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content: `You help genarate descriptions for projects and tasks on a Task management app and return only the HTML in a json { content: "<p>html content</p>" } just like a rich text editor content, remeber that you can use any html elements to format the content the way it should make it look well formated. for tasks, you need to define a well detailed steps to complete the task and add bullet points to define professional user stories. For projects be as descriptive as possible. Ensure that you return a valid JSON`,
      },
      {
        role: "user",
        content: `I need a description for a ${args.type} called ${
          args.name
        }. ${
          args.projectName
            ? `It is part of the project ${args.projectName}`
            : ""
        } ${
          args.projectDescription ? `which is ${args.projectDescription}` : ""
        }`,
      },
    ],
    max_tokens: 300,
    response_format: {
      type: "json_object",
    },
  });

  const { choices } = completion;
  const { message } = choices[0];
  const { content } = message;

  return JSON.parse(content || "") as { content: string };
};
