'use client'

import { useState } from 'react'

export default function GameRules() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            >
                <span className="font-semibold text-gray-800">
                    📖 Game Rules
                </span>
                <span
                    className={`transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="p-4 border-t border-gray-200 text-sm text-gray-700 space-y-3">
                    <div>
                        <strong>Goal:</strong> Be the first player to reach
                        5,000 points!
                    </div>

                    <div>
                        <strong>Scoring:</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li>• 1 = 100 points</li>
                            <li>• 5 = 50 points</li>
                            <li>
                                • Three of a kind = face value × 100 (Three 1s =
                                1000)
                            </li>
                            <li>
                                • Straights (1-2-3-4-5 or 2-3-4-5-6) = 1500
                                points
                            </li>
                            <li>• Five 1s = 5000 points (instant win!)</li>
                        </ul>
                    </div>

                    <div>
                        <strong>Gameplay:</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li>• Roll all 5 dice</li>
                            <li>• Freeze scoring dice and reroll the rest</li>
                            <li>
                                • Bank your points or keep rolling (but risk
                                losing everything!)
                            </li>
                            <li>
                                • If you roll no scoring dice, you lose your
                                turn score
                            </li>
                        </ul>
                    </div>

                    <div className="text-xs text-gray-500 mt-3">
                        <em>
                            November is a game of risk vs. reward. Push your
                            luck or play it safe!
                        </em>
                    </div>
                </div>
            )}
        </div>
    )
}
