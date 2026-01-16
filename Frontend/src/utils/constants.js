export const DEFAULT_PERSONAS = {
    persona1: { name: 'Person A', relation: 'partner' },
    persona2: { name: 'Person B', relation: 'partner' }
}

export const STATUS_MESSAGES = {
    READY: 'Ready',
    ANALYZING: 'Analyzing...',
    GENERATING_VOICE: 'Generating voice...',
    PLAYING: 'Playing response',
    NEED_BOTH_VOICES: 'Need both voices recorded',
    BROWSER_NOT_SUPPORTED: 'This browser needs Web Speech API (try Chrome).',
    ERROR: 'Something went wrong'
}

export const APP_CONFIG = {
    AVATAR_MOUTH_INTERVAL: 140,
    SPEECH_LANG: 'en-IN'
}