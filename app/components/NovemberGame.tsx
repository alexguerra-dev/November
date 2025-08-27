'use client'

import { useState, useEffect } from 'react'
import { GameState, Player, Die, ScoringResult } from '../types/game'
import {
    rollAllDice,
    rollUnfrozenDice,
    calculateScore,
    freezeScoringDice,
    checkGameEnd,
} from '../utils/gameLogic'
import Dice from './Dice'
import PlayerScore from './PlayerScore'
import GameControls from './GameControls'
import GameMessage from './GameMessage'
import GameRules from './GameRules'

export default function NovemberGame() {
    const [gameState, setGameState] = useState<GameState>(() => {
        // Initialize with dice ready to roll
        const initialDice = Array.from({ length: 5 }, (_, i) => ({
            id: i,
            value: Math.floor(Math.random() * 6) + 1,
            isFrozen: false,
        }))

        return {
            players: [
                { id: 1, name: 'Player 1', score: 0, isCurrentTurn: true },
                { id: 2, name: 'Player 2', score: 0, isCurrentTurn: false },
            ],
            currentPlayerIndex: 0,
            dice: initialDice,
            turnScore: 0,
            gameEnded: false,
            winner: null,
            gamePhase: 'rolling',
        }
    })

    const [currentMessage, setCurrentMessage] = useState<{
        text: string
        type: 'info' | 'success' | 'warning' | 'error'
    }>({
        text: 'Welcome to November! Click "Roll Dice" to start your turn.',
        type: 'info',
    })

    const [showMessage, setShowMessage] = useState(true)
    const [isRolling, setIsRolling] = useState(false)

    // Initialize game - start with dice already rolled
    useEffect(() => {
        // Don't call startNewTurn here since we want to start with dice ready to roll
    }, [])

    const startNewTurn = () => {
        setGameState((prev) => ({
            ...prev,
            dice: rollAllDice(),
            turnScore: 0,
            gamePhase: 'rolling',
        }))
        setCurrentMessage({
            text: `${
                gameState.players[gameState.currentPlayerIndex].name
            }'s turn! Roll the dice to begin.`,
            type: 'info',
        })
        setShowMessage(true)
    }

    const rollDice = () => {
        if (gameState.gameEnded) return

        setIsRolling(true)
        let newDice: Die[]
        let newTurnScore = gameState.turnScore

        if (gameState.dice.length === 0 || gameState.gamePhase === 'rolling') {
            // First roll of the turn
            newDice = rollAllDice()
        } else {
            // Rolling unfrozen dice
            newDice = rollUnfrozenDice(gameState.dice)
        }

        const scoringResult = calculateScore(newDice)
        newTurnScore += scoringResult.score

        // Check for instant win (five 1s)
        if (scoringResult.score === 5000) {
            endGame(gameState.players[gameState.currentPlayerIndex])
            return
        }

        // Update dice with frozen state
        const updatedDice = freezeScoringDice(
            newDice,
            scoringResult.scoringDice,
        )

        setGameState((prev) => ({
            ...prev,
            dice: updatedDice,
            turnScore: newTurnScore,
            gamePhase: scoringResult.canContinue ? 'scoring' : 'rolling',
        }))

        // Show message
        setCurrentMessage({
            text: scoringResult.message,
            type: scoringResult.score > 0 ? 'success' : 'error',
        })
        setShowMessage(true)

        // Stop rolling animation
        setTimeout(() => setIsRolling(false), 600)

        // Auto-hide message after 3 seconds
        setTimeout(() => setShowMessage(false), 3000)

        // If no scoring dice (brick), end turn
        if (scoringResult.scoringDice.length === 0) {
            setTimeout(() => {
                endTurn()
            }, 2000)
        }
    }

    const bankPoints = () => {
        if (gameState.turnScore === 0) return

        // Add turn score to current player
        const updatedPlayers = gameState.players.map((player, index) => {
            if (index === gameState.currentPlayerIndex) {
                return { ...player, score: player.score + gameState.turnScore }
            }
            return player
        })

        // Check if game should end
        const winner = checkGameEnd(updatedPlayers)
        if (winner) {
            endGame(winner)
            return
        }

        // Move to next player
        const nextPlayerIndex =
            (gameState.currentPlayerIndex + 1) % updatedPlayers.length
        const nextPlayers = updatedPlayers.map((player, index) => ({
            ...player,
            isCurrentTurn: index === nextPlayerIndex,
        }))

        setGameState((prev) => ({
            ...prev,
            players: nextPlayers,
            currentPlayerIndex: nextPlayerIndex,
            dice: [],
            turnScore: 0,
            gamePhase: 'rolling',
        }))

        setCurrentMessage({
            text: `${
                updatedPlayers[gameState.currentPlayerIndex].name
            } banked ${gameState.turnScore} points!`,
            type: 'success',
        })
        setShowMessage(true)

        setTimeout(() => {
            startNewTurn()
        }, 1500)
    }

    const endTurn = () => {
        setCurrentMessage({
            text: `${
                gameState.players[gameState.currentPlayerIndex].name
            } bricked! Turn over.`,
            type: 'warning',
        })
        setShowMessage(true)

        setTimeout(() => {
            const nextPlayerIndex =
                (gameState.currentPlayerIndex + 1) % gameState.players.length
            const nextPlayers = gameState.players.map((player, index) => ({
                ...player,
                isCurrentTurn: index === nextPlayerIndex,
            }))

            setGameState((prev) => ({
                ...prev,
                players: nextPlayers,
                currentPlayerIndex: nextPlayerIndex,
                dice: [],
                turnScore: 0,
                gamePhase: 'rolling',
            }))

            startNewTurn()
        }, 2000)
    }

    const endGame = (winner: Player) => {
        setGameState((prev) => ({
            ...prev,
            gameEnded: true,
            winner,
            gamePhase: 'ended',
        }))

        setCurrentMessage({
            text: `🎉 ${winner.name} wins with ${winner.score} points! 🎉`,
            type: 'success',
        })
        setShowMessage(true)
    }

    const startNewGame = () => {
        setGameState({
            players: [
                { id: 1, name: 'Player 1', score: 0, isCurrentTurn: true },
                { id: 2, name: 'Player 2', score: 0, isCurrentTurn: false },
            ],
            currentPlayerIndex: 0,
            dice: [],
            turnScore: 0,
            gameEnded: false,
            winner: null,
            gamePhase: 'rolling',
        })
        setCurrentMessage({
            text: 'New game started! Player 1 goes first.',
            type: 'info',
        })
        setShowMessage(true)
        setTimeout(() => startNewTurn(), 1000)
    }

    const canRoll =
        !gameState.gameEnded &&
        (gameState.dice.length === 0 ||
            gameState.gamePhase === 'rolling' ||
            gameState.gamePhase === 'scoring')

    const canBank = !gameState.gameEnded && gameState.turnScore > 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">
                        November 🎲
                    </h1>
                    <p className="text-xl text-gray-600">
                        A five-dice game of risk, reward, and strategy
                    </p>
                </div>

                {/* Game Rules */}
                <div className="mb-6">
                    <GameRules />
                </div>

                {/* Game Message */}
                <div className="mb-6">
                    <GameMessage
                        message={currentMessage.text}
                        type={currentMessage.type}
                        show={showMessage}
                    />
                </div>

                {/* Player Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {gameState.players.map((player, index) => (
                        <PlayerScore
                            key={player.id}
                            player={player}
                            isCurrentTurn={
                                index === gameState.currentPlayerIndex
                            }
                        />
                    ))}
                </div>

                {/* Dice Area */}
                <div className="bg-white rounded-lg p-8 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        {gameState.players[gameState.currentPlayerIndex]?.name}
                        's Turn
                    </h2>

                    {gameState.dice.length > 0 && (
                        <Dice
                            dice={gameState.dice}
                            clickable={false}
                            isRolling={isRolling}
                        />
                    )}

                    {gameState.dice.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            Click "Roll Dice" to start your turn
                        </div>
                    )}
                </div>

                {/* Game Controls */}
                <div className="mb-8">
                    <GameControls
                        onRoll={rollDice}
                        onBank={bankPoints}
                        onNewGame={startNewGame}
                        canRoll={canRoll}
                        canBank={canBank}
                        turnScore={gameState.turnScore}
                        gameEnded={gameState.gameEnded}
                    />
                </div>

                {/* Game Status */}
                {gameState.gameEnded && gameState.winner && (
                    <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-800 mb-2">
                            🏆 Game Over! 🏆
                        </h3>
                        <p className="text-lg text-green-700">
                            {gameState.winner.name} wins with{' '}
                            {gameState.winner.score} points!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
