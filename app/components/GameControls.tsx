'use client'

interface GameControlsProps {
    onRoll: () => void
    onBank: () => void
    onNewGame: () => void
    canRoll: boolean
    canBank: boolean
    turnScore: number
    gameEnded: boolean
}

export default function GameControls({
    onRoll,
    onBank,
    onNewGame,
    canRoll,
    canBank,
    turnScore,
    gameEnded,
}: GameControlsProps) {
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Turn Score</div>
                <div className="text-3xl font-bold text-blue-600">
                    {turnScore.toLocaleString()}
                </div>
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
                {!gameEnded ? (
                    <>
                        <button
                            onClick={onRoll}
                            disabled={!canRoll}
                            className={`
                px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
                ${
                    canRoll
                        ? 'bg-green-500 hover:bg-green-600 hover:scale-105 shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'
                }
              `}
                        >
                            🎲 Roll Dice
                        </button>

                        <button
                            onClick={onBank}
                            disabled={!canBank}
                            className={`
                px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
                ${
                    canBank
                        ? 'bg-blue-500 hover:bg-blue-600 hover:scale-105 shadow-lg'
                        : 'bg-gray-400 cursor-not-allowed'
                }
              `}
                        >
                            💰 Bank Points
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onNewGame}
                        className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                        🎮 New Game
                    </button>
                )}
            </div>

            {gameEnded && (
                <div className="text-center text-gray-600">
                    <p className="text-lg font-semibold">Game Over!</p>
                    <p className="text-sm">Click "New Game" to play again</p>
                </div>
            )}
        </div>
    )
}
