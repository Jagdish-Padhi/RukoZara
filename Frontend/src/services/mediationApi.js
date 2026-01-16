const BACKEND_URL = 'http://localhost:5000';

export const analyzeConversation = async ({ text1, text2, persona1, persona2, language = 'en-IN' }) => {
    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text1, text2, persona1, persona2, language }),
    });
    return response.json();
};

export const textToSpeech = async (text) => {
    const response = await fetch(`${BACKEND_URL}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    return response.json();
};
