import OpenAI from "openai";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openAi = createOpenAI({
  apiKey: process.env.OPENAI,
});

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    // const prompt =
    //   "Create a random list of three open-ended and engaging questions fromatted a single string. Each question should be separated by '||'. These questions are for an annyomous social messaging platform, like Qooh.me, and should be suitable for a diverse audiance. Avoid personal or sensitive topics, focusing insted on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's hobby you've recently started? || If you could have dinner with any historical figure, who whould it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const prompt = `Create a random list of three open-ended and engaging questions fromatted a single string, each questions must be with in 300 characters. Separate each question with '||'. Make sure each response are unique. The questions should be for an anonymous social messaging platform and suitable for a diverse audience.`;

    const response = await streamText({
      model: openAi("gpt-3.5-turbo"),
      maxTokens: 400,
      prompt,
      temperature: 0.8,
      topP: 0.9,
    });

    return response.toTextStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.error("An unexpected error occurred --> ", error);
      return NextResponse.json(
        {
          success: false,
          message: "An unexpected error occurred.",
        },
        { status: 500 }
      );
    }
  }
}
