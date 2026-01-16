export const MicCard = ({ label, placeholder, onRecordStart, onRecordStop, recording, text, persona, onPersonaChange }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{label}</h3>

            <div className="mt-3 space-y-3">
                <div>
                    <span className="mb-1 block text-xs font-medium text-slate-600">Name</span>
                    <input
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
                        placeholder="e.g. Aanya"
                        value={persona.name}
                        onChange={(e) => onPersonaChange({ ...persona, name: e.target.value })}
                    />
                </div>

                <div>
                    <span className="mb-1 block text-xs font-medium text-slate-600">Relation</span>
                    <input
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500"
                        placeholder="e.g. sister, partner, friend"
                        value={persona.relation}
                        onChange={(e) => onPersonaChange({ ...persona, relation: e.target.value })}
                    />
                </div>

                <div>
                    <span className="mb-1 block text-xs font-medium text-slate-600">Voice note</span>
                    <div className="flex items-center gap-2">
                        <button
                            className={`inline-flex items-center rounded-md border px-3 py-2 text-sm transition-colors ${recording ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                            onMouseDown={onRecordStart}
                            onMouseUp={onRecordStop}
                            onTouchStart={onRecordStart}
                            onTouchEnd={onRecordStop}
                        >
                            {recording ? 'Listening…' : 'Hold to speak'}
                        </button>
                    </div>
                </div>

                <textarea
                    className="mt-2 h-28 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none"
                    placeholder={placeholder}
                    value={text}
                    onChange={() => { }}
                    readOnly
                />
            </div>
        </div>
    );
};
