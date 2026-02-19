const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateRewrite = async (bulletPoint, keyword) => {

//   const promptTemplate = `
// You are an expert resume writer.

// Task:
// Rewrite the following resume bullet point to sound authoritative, confident,
// and impact-driven.

// IMPORTANT:
// - You MUST include the keyword "${keyword}" naturally.
// - Make it action-oriented.
// - Add measurable impact if possible.
// - Keep it concise (1-2 lines).
// - Do NOT explain anything.

// Original Bullet Point:
// "${bulletPoint}"
// `;

const promptTemplate = `
You are an expert resume writer.

Rewrite the resume bullet point.

STRICT RULES:
- Return ONLY the rewritten bullet point.
- Do NOT add any introduction text.
- Do NOT say "Here is".
- Do NOT add quotes.
- Do NOT use new lines.
- Keep it 1 sentence only.
- Must include the keyword "${keyword}" naturally.
- Make it measurable and impactful.

Bullet Point:
${bulletPoint}
`;


  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a professional ATS resume optimization assistant."
      },
      {
        role: "user",
        content: promptTemplate
      }
    ],
    temperature: 0.6,
  });

  return response.choices[0].message.content;
};
