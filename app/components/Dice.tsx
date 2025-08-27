'use client'

import { Die } from '../types/game'
import { useState, useEffect } from 'react'

interface DiceProps {
    dice: Die[]
    onDieClick?: (die: Die) => void
    clickable?: boolean
    isRolling?: boolean
}

export default function Dice({
    dice,
    onDieClick,
    clickable = false,
    isRolling = false,
}: DiceProps) {
    const [rollingDice, setRollingDice] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (isRolling) {
            // Add rolling animation to all dice
            const newRollingDice = new Set(dice.map((die) => die.id))
            setRollingDice(newRollingDice)

            // Remove rolling animation after animation completes
            setTimeout(() => {
                setRollingDice(new Set())
            }, 600)
        }
    }, [dice, isRolling])

    const getDieColor = (die: Die) => {
        if (die.isFrozen) {
            return 'bg-blue-500 text-white border-blue-600'
        }
        return 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
    }

    const getDieShadow = (die: Die) => {
        if (die.isFrozen) {
            return 'shadow-lg shadow-blue-500/50'
        }
        return 'shadow-md'
    }

    const getDieAnimation = (die: Die) => {
        if (rollingDice.has(die.id)) {
            return 'dice-rolling'
        }
        if (die.isFrozen) {
            return 'dice-pulse'
        }
        return ''
    }

    return (
        <div className="flex gap-3 justify-center flex-wrap">
            {dice.map((die) => (
                <div
                    key={die.id}
                    onClick={() => clickable && onDieClick?.(die)}
                    className={`
            w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl font-bold font-mono
            ${getDieColor(die)}
            ${getDieShadow(die)}
            ${getDieAnimation(die)}
            ${
                clickable && !die.isFrozen
                    ? 'cursor-pointer transition-all duration-200 hover:scale-110'
                    : ''
            }
            ${die.isFrozen ? 'ring-2 ring-blue-300' : ''}
            transform-gpu
          `}
                >
                    {rollingDice.has(die.id) ? '?' : die.value}
                </div>
            ))}
        </div>
    )
}
