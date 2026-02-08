import React from 'react';
import { EyeOff, Users, Shield, User, Eraser, ArrowRight } from 'lucide-react';

const roleMeta = (role) => {
  switch (role) {
    case 'spy':
      return { label: '卧底', Icon: Shield, className: 'bg-rose-500/20 text-rose-200 border-rose-500/30' };
    case 'whiteboard':
      return { label: '白板', Icon: Eraser, className: 'bg-gray-500/20 text-gray-200 border-gray-500/30' };
    case 'civilian':
    default:
      return { label: '平民', Icon: User, className: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30' };
  }
};

const AudienceOverview = ({ players, onClose }) => {
  const shouldScroll = players.length > 12;
  const minCardWidth =
    players.length <= 6 ? 200 :
    players.length <= 10 ? 195 :
    players.length <= 16 ? 185 :
    165;

  const gridStyle =
    players.length <= 5
      ? { gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))` }
      : { gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))` };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col gap-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 rounded-full text-sm font-medium text-purple-200">
            <Users size={16} />
            观众视角
          </div>
          <h2 className="text-3xl font-bold">本局所有玩家的牌</h2>
          <p className="text-white/70 text-sm">尽量一屏显示；人数太多时建议横屏观看。</p>
        </div>

        <div className={shouldScroll ? 'max-h-[70vh] overflow-auto pr-1' : 'pr-1'}>
          <div
            className="grid gap-3 sm:gap-4"
            style={gridStyle}
          >
            {players.map((player, index) => {
              const { label, Icon, className } = roleMeta(player.role);
              const displayWord = player.role === 'whiteboard' ? '（无词）' : (player.word || '（无词）');
              return (
                <div
                  key={`${player.role}-${index}`}
                  className="rounded-2xl border border-white/15 bg-white/5 p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xl sm:text-2xl font-extrabold text-white/95">玩家 {index + 1}</div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xl sm:text-2xl font-extrabold ${className}`}>
                      <Icon size={20} />
                      {label}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/10 border border-white/10 flex items-center justify-center">
                      {player.image ? (
                        <img src={player.image} alt={displayWord} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/40 text-xs sm:text-sm">暂无图片</span>
                      )}
                    </div>

                    <div className="mt-3 bg-white px-3 py-3 rounded-2xl shadow-lg border border-gray-100">
                      <div
                        className="text-center text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={player.role === 'whiteboard' ? '白板' : displayWord}
                      >
                        {player.role === 'whiteboard' ? '白板' : displayWord}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-white text-indigo-900 text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <EyeOff size={22} />
          关闭并开始发牌（请传递给下一位）
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default AudienceOverview;
