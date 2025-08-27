'use client'

import { Player } from '../types/game'

interface PlayerScoreProps {
    player: Player
    isCurrentTurn: boolean
}

export default function PlayerScore({
    player,
    isCurrentTurn,
}: PlayerScoreProps) {
    return (
        <div
            className={`
      p-4 rounded-lg border-2 transition-all duration-200
      ${
          isCurrentTurn
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-200 bg-white'
      }
    `}
        >
            <div className="flex items-center justify-between mb-2">
                <h3
                    className={`
          font-bold text-lg
          ${isCurrentTurn ? 'text-blue-700' : 'text-gray-800'}
        `}
                >
                    {player.name}
                </h3>
                {isCurrentTurn && (
                    <span className="text-blue-600 text-sm font-medium bg-blue-100 px-2 py-1 rounded-full">
                        Current Turn
                    </span>
                )}
            </div>

            <div className="text-3xl font-bold text-gray-900">
                {player.score.toLocaleString()}
            </div>

            {player.score >= 5000 && (
                <div className="mt-2 text-green-600 font-semibold text-sm">
                    🎉 Winner! 🎉
                </div>
            )}
        </div>
    )
}
