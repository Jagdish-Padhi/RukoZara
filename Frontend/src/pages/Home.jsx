import { useEffect, useState } from 'react';
import { useWebSpeech } from '../hooks/useWebSpeech';
import { useAvatarMouth } from '../hooks/useAvatarMouth';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { MicCard } from '../components/MicCard';
import { Avatar } from '../components/Avatar';
import { analyzeConversation, textToSpeech } from '../services/mediationApi';
import { DEFAULT_PERSONAS, STATUS_MESSAGES } from '../utils/constants';

export const Home = () => {
    const mic1 = useWebSpeech();
    const mic2 = useWebSpeech();
    const avatar = useAvatarMouth();
    const audio = useAudioPlayer();
    const [persona1, setPersona1] = useState(DEFAULT_PERSONAS.persona1);
    const [persona2, setPersona2] = useState(DEFAULT_PERSONAS.persona2);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(STATUS_MESSAGES.READY);
    const [aiText, setAiText] = useState('');

    const canRecord = mic1.supported && mic2.supported;

    const handleSubmit = async () => {
        if (!mic1.text.trim() || !mic2.text.trim()) {
            setStatus(STATUS_MESSAGES.NEED_BOTH_VOICES);
            return;
        }
        setLoading(true);
        setStatus(STATUS_MESSAGES.ANALYZING);
        try {
            const analyzeRes = await analyzeConversation({
                text1: mic1.text,
                text2: mic2.text,
                persona1,
                persona2,
            });

            if (!analyzeRes.ok) throw new Error(analyzeRes.error || 'Analyze failed');

            setAiText(analyzeRes.response);
            setStatus(STATUS_MESSAGES.GENERATING_VOICE);

            const ttsRes = await textToSpeech(analyzeRes.response);

            if (!ttsRes.ok) throw new Error(ttsRes.error || 'TTS failed');

            avatar.start();
            audio.playBase64(ttsRes.audio, ttsRes.mimeType, () => {
                avatar.stop();
                setStatus(STATUS_MESSAGES.READY);
            });
            setStatus(STATUS_MESSAGES.PLAYING);
        } catch (err) {
            avatar.stop();
            setStatus(err?.message || STATUS_MESSAGES.ERROR);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!canRecord) {
            setStatus(STATUS_MESSAGES.BROWSER_NOT_SUPPORTED);
        }
    }, [canRecord]);

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-white">
            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold text-slate-900">RukoZara — Mediation Voice</p>
                        <p className="text-sm text-slate-600">Two voices in, AI mediates, human-like voice out (11Labs)</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">Web Speech API</span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">11Labs TTS</span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">Indian EN locale</span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <MicCard
                        label="Mic 1"
                        placeholder="Hold and speak your perspective..."
                        onRecordStart={mic1.start}
                        onRecordStop={mic1.stop}
                        recording={mic1.recording}
                        text={mic1.text}
                        persona={persona1}
                        onPersonaChange={setPersona1}
                    />

                    <MicCard
                        label="Mic 2"
                        placeholder="Hold and speak your perspective..."
                        onRecordStart={mic2.start}
                        onRecordStop={mic2.stop}
                        recording={mic2.recording}
                        text={mic2.text}
                        persona={persona2}
                        onPersonaChange={setPersona2}
                    />

                    <Avatar
                        speaking={avatar.speaking}
                        aiText={aiText}
                        status={status}
                        loading={loading}
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!canRecord || loading}
                    >
                        {loading ? 'Processing' : 'Submit & Play'}
                    </button>
                </div>
            </div>
        </div>
    );
};