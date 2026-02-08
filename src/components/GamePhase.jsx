import React, { useState } from 'react';
import { Skull, RotateCcw, Trophy } from 'lucide-react';

const GamePhase = ({ players, onRestart }) => {
    const [alivePlayers, setAlivePlayers] = useState(players.map((p, i) => ({ ...p, id: i, alive: true })));
    const [winner, setWinner] = useState(null);
    const minCardWidth =
        players.length <= 5 ? 0 :
        players.length <= 8 ? 160 :
        150;

    const gridStyle =
        players.length <= 5
            ? { gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))` }
            : { gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))` };

    const toggleStatus = (id) => {
        if (winner) return;

        const newPlayers = alivePlayers.map(p =>
            p.id === id ? { ...p, alive: !p.alive } : p
        );
        setAlivePlayers(newPlayers);
        checkWinCondition(newPlayers);
    };

    const checkWinCondition = (currentPlayers) => {
        const activePlayers = currentPlayers.filter(p => p.alive);
        const spies = activePlayers.filter(p => p.role === 'spy');
        const civilians = activePlayers.filter(p => p.role === 'civilian');
        const whiteboards = activePlayers.filter(p => p.role === 'whiteboard');

        // Spy wins if spies >= civilians + whiteboards
        if (spies.length >= civilians.length + whiteboards.length) {
            setWinner('spy');
        }
        // Civilians win if all spies are out
        else if (spies.length === 0) {
            setWinner('civilian');
        } else {
            setWinner(null);
        }
    };

    const getRoleName = (role) => {
        switch (role) {
            case 'spy': return '卧底';
            case 'whiteboard': return '白板';
            default: return '平民';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-8 text-xl sm:text-2xl">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl sm:text-6xl font-black text-indigo-900">游戏进行中</h1>
                    <button
                        onClick={onRestart}
                        className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-100 text-gray-600"
                    >
                        <RotateCcw size={28} />
                    </button>
                </div>

                {/* Winner Banner */}
                {winner && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-center gap-4 animate-in slide-in-from-top duration-500">
                        <Trophy size={48} className="text-yellow-100" />
                        <div>
                            <h2 className="text-5xl sm:text-6xl font-black">
                                {winner === 'spy' ? '卧底胜利!' : '平民胜利!'}
                            </h2>
                            <p className="text-yellow-100 opacity-90 text-xl sm:text-2xl">点击下方卡片查看所有身份</p>
                        </div>
                    </div>
                )}

                {/* Player Grid */}
                <div className="grid gap-3 sm:gap-4" style={gridStyle}>
                    {alivePlayers.map((player) => (
                        <button
                            key={player.id}
                            onClick={() => toggleStatus(player.id)}
                            disabled={!!winner}
                            className={`relative group p-3 sm:p-4 rounded-2xl transition-all duration-300 border-2 text-left
                ${!player.alive
                                    ? 'bg-gray-200 border-gray-200 opacity-60 grayscale'
                                    : 'bg-white border-white shadow-md hover:shadow-xl hover:-translate-y-1'
                                }
                ${winner && player.role === 'spy' ? 'ring-4 ring-pink-500' : ''}
              `}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-black text-[clamp(18px,2vw,28px)]
                  ${player.alive ? 'bg-indigo-500' : 'bg-gray-400'}
                `}>
                                    {player.id + 1}
                                </div>
                                {!player.alive && <Skull size={28} className="text-gray-500" />}
                            </div>

                            <div className="space-y-1">
                                <div className="text-lg sm:text-xl text-gray-500 font-semibold">状态</div>
                                <div className={`font-black text-[clamp(28px,2.8vw,44px)] leading-none ${player.alive ? 'text-green-600' : 'text-red-500'}`}>
                                    {player.alive ? '存活' : '淘汰'}
                                </div>
                            </div>

                            {/* Reveal Role on Game Over */}
                            {winner && (
                                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in">
                                    <div className="text-lg sm:text-xl text-gray-500 font-semibold tracking-wide">身份</div>
                                    <div className="mt-1 font-black text-indigo-900 text-[clamp(24px,2.4vw,40px)] leading-none">
                                        {getRoleName(player.role)}
                                    </div>
                                    <div
                                        className="mt-2 text-xl sm:text-2xl font-bold text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis"
                                        title={player.word || '无'}
                                    >
                                        {player.word || '无'}
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Restart Button (Large) */}
                {winner && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={onRestart}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <RotateCcw /> 再来一局
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default GamePhase;
