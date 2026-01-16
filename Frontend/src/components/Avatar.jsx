export const Avatar = ({ speaking, aiText, status, loading }) => {
    return (
        <div className="min-h-[260px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">AI Avatar</h3>
            <div className="avatar-stage">
                <div className="avatar">
                    <div className="eyes">
                        <div className="eye" />
                        <div className="eye" />
                    </div>
                    <div className={`mouth ${speaking ? 'speaking' : ''}`} />
                </div>
            </div>
            <div className="mt-3">
                <span className="mb-1 block text-xs font-medium text-slate-600">AI Response</span>
                <textarea className="h-28 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm" value={aiText} readOnly placeholder="AI reply will appear here" />
            </div>
            <div className="mt-2 text-sm text-slate-600">{loading ? 'Working...' : status}</div>
        </div>
    );
};
