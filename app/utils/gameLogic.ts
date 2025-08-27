import { Die, ScoringResult, ScoringCombination } from '../types/game'

// Generate a random die value (1-6)
export const rollDie = (): number => Math.floor(Math.random() * 6) + 1

// Roll all dice and return new dice array
export const rollAllDice = (): Die[] => {
    return Array.from({ length: 5 }, (_, i) => ({
        id: i,
        value: rollDie(),
        isFrozen: false,
    }))
}

// Roll only non-frozen dice
export const rollUnfrozenDice = (dice: Die[]): Die[] => {
    return dice.map((die) => ({
        ...die,
        value: die.isFrozen ? die.value : rollDie(),
    }))
}

// Calculate score for a single roll
export const calculateScore = (dice: Die[]): ScoringResult => {
    const diceValues = dice.map((d) => d.value)
    const valueCounts = new Map<number, number>()

    // Count occurrences of each value
    diceValues.forEach((value) => {
        valueCounts.set(value, (valueCounts.get(value) || 0) + 1)
    })

    let totalScore = 0
    const scoringDice: Die[] = []
    const nonScoringDice: Die[] = []
    let canContinue = false

    // Check for five 1s (instant win)
    if (valueCounts.get(1) === 5) {
        return {
            score: 5000,
            scoringDice: dice,
            nonScoringDice: [],
            canContinue: false,
            message: 'Five 1s! Game Over!',
        }
    }

    // Check for straights
    const hasStraight1to5 = [1, 2, 3, 4, 5].every((val) => valueCounts.has(val))
    const hasStraight2to6 = [2, 3, 4, 5, 6].every((val) => valueCounts.has(val))

    if (hasStraight1to5 || hasStraight2to6) {
        return {
            score: 1500,
            scoringDice: dice,
            nonScoringDice: [],
            canContinue: true,
            message: `Straight! ${hasStraight1to5 ? '1-2-3-4-5' : '2-3-4-5-6'}`,
        }
    }

    // Check for three of a kind
    for (const [value, count] of valueCounts.entries()) {
        if (count >= 3) {
            const score = value === 1 ? 1000 : value * 100
            totalScore += score

            // Mark the first 3 dice as scoring
            const scoringIndices = dice
                .map((die, index) => ({ die, index }))
                .filter(({ die }) => die.value === value)
                .slice(0, 3)
                .map(({ index }) => index)

            dice.forEach((die, index) => {
                if (scoringIndices.includes(index)) {
                    scoringDice.push(die)
                } else {
                    nonScoringDice.push(die)
                }
            })

            canContinue = true
            break
        }
    }

    // Check for single 1s and 5s
    if (totalScore === 0) {
        dice.forEach((die) => {
            if (die.value === 1) {
                totalScore += 100
                scoringDice.push(die)
                canContinue = true
            } else if (die.value === 5) {
                totalScore += 50
                scoringDice.push(die)
                canContinue = true
            } else {
                nonScoringDice.push(die)
            }
        })
    }

    // If no scoring dice, it's a brick
    if (scoringDice.length === 0) {
        return {
            score: 0,
            scoringDice: [],
            nonScoringDice: dice,
            canContinue: false,
            message: 'Brick! No scoring dice.',
        }
    }

    return {
        score: totalScore,
        scoringDice,
        nonScoringDice,
        canContinue: nonScoringDice.length > 0 || scoringDice.length === 5,
        message: `Scored ${totalScore} points!`,
    }
}

// Check if all dice are scoring (must reroll)
export const allDiceScoring = (dice: Die[]): boolean => {
    const scoringResult = calculateScore(dice)
    return scoringResult.scoringDice.length === 5
}

// Freeze scoring dice for next roll
export const freezeScoringDice = (dice: Die[], scoringDice: Die[]): Die[] => {
    return dice.map((die) => ({
        ...die,
        isFrozen: scoringDice.some((scoring) => scoring.id === die.id),
    }))
}

// Check if game should end (someone reached 5000+)
export const checkGameEnd = (players: any[]): any | null => {
    const winner = players.find((player) => player.score >= 5000)
    return winner || null
}
