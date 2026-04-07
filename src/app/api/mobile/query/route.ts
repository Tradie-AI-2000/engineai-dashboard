import { ceoAgent } from "@/agents/ceo-agent";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid query payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = streamText({
      model: ceoAgent.model,
      system: ceoAgent.system,
      messages: await convertToModelMessages(messages),
      tools: ceoAgent.tools,
      stopWhen: stepCountIs(5), // Allow up to 5 LLM steps for tool execution
    });

    return response.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Mobile Query Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
