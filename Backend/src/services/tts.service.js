const ELEVENLABS_URL = 'https://api.elevenlabs.io/v1/text-to-speech'

// Add natural pauses and prosody to text for human-like delivery
const addSSMLPacing = (text = '') => {
    // Replace double periods and section breaks with pause markup
    return text
        .replace(/\.\s+(?=[A-Z])/g, '.<break time="500ms"/>\n') // Add 500ms pause after sentence
        .replace(/,\s+/g, ',<break time="200ms"/>') // Add 200ms pause after commas in some cases
}

export const synthesizeElevenLabs = async ({
    text = '',
    voiceId,
    apiKey,
    modelId = 'eleven_turbo_v2_5',
    stability = 0.5,
    similarityBoost = 0.75,
} = {}) => {
    if (!text.trim()) {
        const error = new Error('Text is required')
        error.statusCode = 400
        throw error
    }

    if (!apiKey) {
        const error = new Error('Missing ELEVENLABS_API_KEY. Set it in the backend environment.')
        error.statusCode = 400
        throw error
    }

    const targetVoice = voiceId || '21m00Tcm4TlvDq8ikWAM'

    // Add natural pacing while keeping text readable
    const pacedText = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join(' ')

    const ttsResponse = await fetch(`${ELEVENLABS_URL}/${targetVoice}`, {
        method: 'POST',
        headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
            text: pacedText,
            model_id: modelId,
            voice_settings: {
                stability,
                similarity_boost: similarityBoost,
            },
        }),
    })

    console.log('[TTS] Response status:', ttsResponse.status)

    if (!ttsResponse.ok) {
        const message = await ttsResponse.text()
        console.error('[TTS] Error response:', ttsResponse.status, message)
        const error = new Error(message || 'TTS failed')
        error.statusCode = ttsResponse.status || 500
        throw error
    }

    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer())
    const audioBase64 = audioBuffer.toString('base64')

    return {
        audio: audioBase64,
        mimeType: 'audio/mpeg',
    }
}
