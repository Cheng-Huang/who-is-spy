import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const WordCard = ({ word, image, isSpy, isWhiteboard }) => {
    if (isWhiteboard) {
        return (
            <div className="flex flex-col items-center justify-center h-64 w-full bg-white rounded-3xl shadow-inner p-6">
                <span className="text-4xl font-bold text-gray-400">白板</span>
                <p className="text-gray-400 mt-2">你没有词语</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full space-y-4">
            <div className="relative w-full aspect-square max-w-[280px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center border-4 border-white">
                {image ? (
                    <img src={image} alt={word} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon size={48} className="mb-2 opacity-50" />
                        <span className="text-sm font-medium">暂无图片</span>
                    </div>
                )}
            </div>

            <div className="bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {word}
                </h2>
            </div>
        </div>
    );
};

export default WordCard;
