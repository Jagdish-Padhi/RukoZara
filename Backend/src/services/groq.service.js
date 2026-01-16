const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const callGroqLLM = async ({ prompt, apiKey, model = 'llama-3.3-70b-versatile' } = {}) => {
    if (!prompt?.trim()) {
        const error = new Error('Text is required');
        error.statusCode = 400;
        throw error;
    }

    if (!apiKey) {
        const error = new Error('Missing GROQ_API_KEY...');
        error.statusCode = 400;
        throw error;
    }

    const groqResponse = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 500,
        }),
    });

    if (!groqResponse.ok) {
        const errorData = await groqResponse.json().catch(() => ({}));
        console.error('[Groq] Error response:', groqResponse.status, errorData);
        const message = errorData?.error?.message || 'Groq LLM failed';
        const error = new Error(message);
        error.statusCode = groqResponse.status || 500;
        throw error;
    }

    // Extract AI-generated text from response
    // Response format: { choices: [{ message: { content: "text" } }] }
    const result = await groqResponse.json();
    const responseText = result?.choices?.[0]?.message?.content || '';
    return responseText;
};
