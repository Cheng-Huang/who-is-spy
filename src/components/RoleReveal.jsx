import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import WordCard from './WordCard';

const RoleReveal = ({ players, onRevealComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    const currentPlayer = players[currentIndex];
    const isLastPlayer = currentIndex === players.length - 1;

    const handleNext = () => {
        if (isRevealed) {
            if (isLastPlayer) {
                onRevealComplete();
            } else {
                setIsRevealed(false);
                setCurrentIndex(prev => prev + 1);
            }
        } else {
            setIsRevealed(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl min-h-[500px] flex flex-col items-center justify-between">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium text-purple-200">
                        玩家 {currentIndex + 1} / {players.length}
                    </div>
                    <h2 className="text-3xl font-bold">
                        {isRevealed ? "请记住你的词语" : "请传递给下一位"}
                    </h2>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex items-center justify-center w-full py-8">
                    {isRevealed ? (
                        <div className="animate-in fade-in zoom-in duration-300 w-full">
                            <WordCard
                                word={currentPlayer.word}
                                image={currentPlayer.image}
                                isWhiteboard={currentPlayer.role === 'whiteboard'}
                            />
                        </div>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="group relative w-48 h-48 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-pulse" />
                            <div className="flex flex-col items-center gap-2">
                                <Eye size={48} className="text-white" />
                                <span className="font-bold text-lg">点击查看</span>
                            </div>
                        </button>
                    )}
                </div>

                {/* Action Button */}
                {isRevealed && (
                    <button
                        onClick={handleNext}
                        className="w-full bg-white text-indigo-900 text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isLastPlayer ? (
                            <>
                                <CheckCircle size={24} /> 开始游戏
                            </>
                        ) : (
                            <>
                                <EyeOff size={24} /> 隐藏并传递
                                <ArrowRight size={24} />
                            </>
                        )}
                    </button>
                )}

            </div>
        </div>
    );
};

export default RoleReveal;
