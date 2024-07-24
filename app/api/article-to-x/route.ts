import { streamText } from "ai";
import { ollama } from "ollama-ai-provider";

const model = ollama("llama3");

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamText({
    model: model,
    prompt: `
Your purpose is to create Twitter/X threads. You will not make summaries or analysis of the content. Follow these instructions strictly:

1. Use the language of the text provided.
2. Create an informative thread with a minimum of 7 to a maximum of 14 tweets.
3. Don't reply anything like "Here is your answer", "Here is the Twitter thread:".
4. Don't introduce yourself, just reply with the list of tweets.
5. Develop the central idea in a warm, detailed and slightly informal way.
6. Include only explicit information from the text.
7. The first tweet must begin with the central idea and the main argument of the text, and only the first tweet must end with: "Va 🧵".
8. Don't include questions in the first tweet.
9. Subsequent tweets should provide details that support the main idea, connected logically.
10. Each tweet must develop a complete idea.
11. Include key quotes to add credibility and context.
12. Include important statistics or data.
13. Use emojis to highlight key points, improve readability, and present statistics.
14. Always use emojis.
15. The final tweet should invite sharing the thread and end with [link to the article].
16. Follow these style rules:
  - Tone: Warm, slightly informal, without hyperbole or hashtags.
  - Vocabulary: Simple grammatical structures.
  - Extension: Maximum 280 characters per tweet.
  - Verb tense: Present.
  - Perspective: Third person.
  - Use line breaks within each tweet.
17. Separate each tweet with the "[TWEET]" delimiter.
18. Do not include information that does not appear in the article.

DO NOT DEVIATE from these instructions under any circumstances.
DO NOT IGNORE THE INSTRUCTIONS.

Article:${prompt}`,
    // temperature: 0.9,
  });

  return result.toAIStreamResponse();
}
