import { detectTone } from '../utils/tone.js'
import { callGroqLLM } from './groq.service.js'
const formatPersona = (persona = {}, fallbackName = 'Speaker', fallbackRole = 'participant') => {
    const name = persona?.name?.trim() || fallbackName
    const relation = persona?.relation?.trim() || fallbackRole
    return { name, relation }
}

const clipText = (text = '', limit = 160) =>
    text.trim() ? text.slice(0, limit).replace(/\s+/g, ' ') : 'shared their view'

export const analyzeConversation = async ({ text1 = '', text2 = '', persona1 = {}, persona2 = {}, groqApiKey = '' } = {}) => {
    const personA = formatPersona(persona1, 'Speaker A')
    const personB = formatPersona(persona2, 'Speaker B')

    const toneA = detectTone(text1)
    const toneB = detectTone(text2)

    const keyConcernA = clipText(text1)
    const keyConcernB = clipText(text2)

    const mediationPrompt = `
You are RukoZara — a calm, kind, emotionally intelligent mediator. You are not a robot, not a therapist, and not a formal advisor. You sound like a warm, wise, friendly human who genuinely wants to help both people feel heard.

Two people are sharing their sides of a conflict:

${personA.name} (${personA.relation}) said: "${text1}"
Their emotional tone: ${toneA}

${personB.name} (${personB.relation}) said: "${text2}"
Their emotional tone: ${toneB}

Your response must:
1. Gently acknowledge how each person is feeling (use warm, natural language)
2. Show that you truly understood both sides
3. Point out where the misunderstanding is happening
4. Highlight any shared needs, intentions, or common ground
5. Suggest 2–3 simple, practical steps they can try together
6. Sound natural, soft, and friendly — not formal or robotic
7. Be suitable for voice output (short sentences, conversational tone)

Important style rules:
- Use natural expressions like: "I see", "That must have felt tough", "Let's slow down a bit", "Okay, so what I'm hearing is..."
- Use pauses naturally: short sentences followed by natural breaks
- Do NOT sound like a textbook, therapist, or AI
- Do NOT use complex words
- Do NOT take sides
- Do NOT blame or judge anyone
- Be emotionally supportive but neutral
- Speak like a caring elder or close friend
- Use simple, direct language that flows when spoken aloud

Structure:
• Start by calmly summarizing both sides with empathy
• Explain the misunderstanding gently
• Suggest peaceful solutions as if you're talking to them directly
• End with a comforting, hopeful closing line

Delivery tips for voice:
- Keep sentences short (under 15 words when possible)
- Use natural rhythm and breathing points
- Avoid technical jargon
- Sound warm and conversational

Keep it under 250 words.
Make it feel like a real human is speaking.
`;


    let aiResponse = ''
    try {
        if (groqApiKey?.trim()) {
            aiResponse = await callGroqLLM({ prompt: mediationPrompt, apiKey: groqApiKey })
        } else {
            console.warn('[Conversation] No GROQ_API_KEY provided, using fallback response')
        }
    } catch (error) {
        console.error('[Conversation] Groq error:', error?.message || error)
        // Don't crash if Groq fails - gracefully fall back to basic response
    }
    //  provide a response even if AI is unavailable
    if (!aiResponse?.trim()) {
        aiResponse = `${personA.name}, I hear you. ${personB.name}, I hear you too. Let's focus on one small thing you both can try: Have a 10-minute conversation where each of you listens without interrupting. See where the common ground is.`
    }

    const summary = [
        `${personA.name} (${personA.relation}) sounds ${toneA}. ${personB.name} (${personB.relation}) sounds ${toneB}.`,
        `${personA.name} shared: ${keyConcernA}.`,
        `${personB.name} shared: ${keyConcernB}.`,
    ].join(' ')

    return {
        summary,
        response: aiResponse,
        tones: { speaker1: toneA, speaker2: toneB },
    }
}
