import React from 'react';
import { Users, UserMinus, UserPlus, Play } from 'lucide-react';

const SetupScreen = ({
    playerCount,
    setPlayerCount,
    spyCount,
    setSpyCount,
    whiteboardEnabled,
    setWhiteboardEnabled,
    onStart
}) => {
    const [stats, setStats] = React.useState({ total: 0, used: 0, remaining: 0 });

    React.useEffect(() => {
        import('../utils/WordManager').then(({ wordManager }) => {
            setStats(wordManager.getProgress());
        });
    }, []);

    const handleReset = () => {
        if (window.confirm('确定要重置所有词汇的使用记录吗？')) {
            import('../utils/WordManager').then(({ wordManager }) => {
                wordManager.resetHistory();
                setStats(wordManager.getProgress());
                alert('历史记录已重置！');
            });
        }
    };

    const handlePlayerChange = (delta) => {
        const newCount = playerCount + delta;
        if (newCount >= 3 && newCount <= 20) {
            setPlayerCount(newCount);
            // Adjust spy count if needed to maintain valid ratio
            if (spyCount >= newCount / 2) {
                setSpyCount(Math.max(1, Math.floor((newCount - 1) / 2)));
            }
        }
    };

    const handleSpyChange = (delta) => {
        const newCount = spyCount + delta;
        if (newCount >= 1 && newCount < playerCount / 2) {
            setSpyCount(newCount);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
            <h1 className="text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 drop-shadow-lg">
                谁是卧底
            </h1>

            <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">

                {/* Player Count */}
                <div className="space-y-4">
                    <label className="flex items-center justify-between text-lg font-medium text-purple-200">
                        <span className="flex items-center gap-2"><Users size={20} /> 玩家人数</span>
                        <span className="text-3xl font-bold text-white">{playerCount}</span>
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handlePlayerChange(-1)}
                            className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all p-4 rounded-xl border border-white/10"
                        >
                            <UserMinus className="mx-auto" />
                        </button>
                        <button
                            onClick={() => handlePlayerChange(1)}
                            className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 transition-all p-4 rounded-xl border border-white/10"
                        >
                            <UserPlus className="mx-auto" />
                        </button>
                    </div>
                </div>

                {/* Spy Count */}
                <div className="space-y-4">
                    <label className="flex items-center justify-between text-lg font-medium text-pink-200">
                        <span className="flex items-center gap-2"><Users size={20} className="text-pink-400" /> 卧底人数</span>
                        <span className="text-3xl font-bold text-pink-400">{spyCount}</span>
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleSpyChange(-1)}
                            className="flex-1 bg-pink-500/20 hover:bg-pink-500/30 active:scale-95 transition-all p-4 rounded-xl border border-pink-500/20"
                        >
                            <UserMinus className="mx-auto text-pink-300" />
                        </button>
                        <button
                            onClick={() => handleSpyChange(1)}
                            className="flex-1 bg-pink-500/20 hover:bg-pink-500/30 active:scale-95 transition-all p-4 rounded-xl border border-pink-500/20"
                        >
                            <UserPlus className="mx-auto text-pink-300" />
                        </button>
                    </div>
                </div>

                {/* Whiteboard Toggle */}
                {playerCount >= 5 && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-lg font-medium text-cyan-200">启用白板</span>
                        <button
                            onClick={() => setWhiteboardEnabled(!whiteboardEnabled)}
                            className={`w-14 h-8 rounded-full transition-colors relative ${whiteboardEnabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${whiteboardEnabled ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                )}

                <button
                    onClick={onStart}
                    className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white text-xl font-bold py-5 rounded-2xl shadow-lg hover:shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <Play fill="currentColor" /> 开始游戏
                </button>

                {/* Vocabulary Stats */}
                <div className="pt-4 border-t border-white/10 text-center space-y-2">
                    <div className="flex justify-between text-sm text-gray-300 px-2">
                        <span>总词汇: {stats.total}</span>
                        <span>已使用: {stats.used}</span>
                        <span className="text-pink-300">剩余: {stats.remaining}</span>
                    </div>
                    <button
                        onClick={handleReset}
                        className="text-xs text-gray-400 hover:text-white underline decoration-dotted"
                    >
                        重置历史记录
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SetupScreen;
