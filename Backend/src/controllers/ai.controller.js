import { analyzeConversation } from '../services/conversation.service.js';
import { synthesizeElevenLabs } from '../services/tts.service.js';

export const health = (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
};

export const analyze = async (req, res) => {
  const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
  const { text1 = '', text2 = '', persona1 = {}, persona2 = {}, language = 'en-IN' } = req.body || {};

  try {
    const { summary, response, tones } = await analyzeConversation({ text1, text2, persona1, persona2, groqApiKey: GROQ_API_KEY });
    res.json({ ok: true, language, tones, summary, response });
  } catch (error) {
    console.error('[Controller] Analyze error:', error?.message);
    res.status(500).json({ ok: false, error: error?.message || 'Analysis failed' });
  }
};

export const tts = async (req, res) => {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || '';
  const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
  const { text = '', voiceId = ELEVENLABS_VOICE_ID } = req.body || {};

  try {
    const { audio, mimeType } = await synthesizeElevenLabs({ text, voiceId, apiKey: ELEVENLABS_API_KEY });
    res.json({ ok: true, audio, mimeType });
  } catch (error) {
    console.error('[Controller] TTS error:', error?.message);
    const status = error?.statusCode || 500;
    res.status(status).json({ ok: false, error: error?.message || 'TTS failed' });
  }
};
