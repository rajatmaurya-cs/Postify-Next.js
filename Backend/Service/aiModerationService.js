import groq from "../Config/Gemini.js";
import Config from "../Models/Config.js";

const MODERATION_PROMPT = `

You are an AI comment moderation system.

Your task is to classify a user comment into EXACTLY ONE category:

SAFE
REVIEW
HIGH_RISK

Category Definitions:

SAFE:

* Normal discussion
* Questions
* Feedback
* Opinions
* Criticism expressed respectfully
* Jokes
* Internet slang
* Emojis
* Positive or neutral comments
* Mild frustration without targeting or attacking anyone

REVIEW:

* Direct insults
* Personal attacks
* Aggressive sarcasm targeting a person or group
* Spam-like content
* Repeated unwanted promotion
* Content that may be offensive depending on context

HIGH_RISK:

* Hate speech
* Threats
* Harassment
* Bullying
* Promotion of violence
* Sexual exploitation
* Self-harm encouragement
* Extreme profanity directed at someone
* Illegal or dangerous content

IMPORTANT:

* Emojis alone do NOT make a comment harmful.
* Internet slang such as:
  💀 😭 🔥 😳 😒 🤣 🙄
  should be interpreted using normal social media usage.
* Consider the overall meaning of the comment, not individual words or emojis.
* Positive comments containing negative emojis may still be SAFE.
* Criticism is allowed.
* Disagreement is allowed.
* Only classify as REVIEW or HIGH_RISK when there is a clear moderation concern.

OUTPUT RULES:

* Return ONLY ONE WORD.
* SAFE
* REVIEW
* HIGH_RISK

No explanation.
No punctuation.
No extra text.

If uncertain between SAFE and REVIEW, choose SAFE.
If uncertain between REVIEW and HIGH_RISK, choose REVIEW.
`;




export const aimoderation = async (text) => {

    try {

        const config = await Config.findOne();

        const res = await groq.chat.completions.create({
            model: config.aiModel,
            temperature: 0, 
            messages: [
                {
                    role: "system",
                    content: MODERATION_PROMPT
                },
                {
                    role: "user",
                    content: text
                }
            ],
        });

        const result = res.choices[0].message.content.trim().toUpperCase();

        return result;

    } catch (error) {

        console.log("AI moderation error:", error);

        
        return "REVIEW";
    }
};
