export interface Die {
    id: number
    value: number
    isFrozen: boolean
}

export interface Player {
    id: number
    name: string
    score: number
    isCurrentTurn: boolean
}

export interface GameState {
    players: Player[]
    currentPlayerIndex: number
    dice: Die[]
    turnScore: number
    gameEnded: boolean
    winner: Player | null
    gamePhase: 'rolling' | 'scoring' | 'ended'
}

export interface ScoringResult {
    score: number
    scoringDice: Die[]
    nonScoringDice: Die[]
    canContinue: boolean
    message: string
}

export type ScoringCombination =
    | 'single-1'
    | 'single-5'
    | 'three-of-a-kind'
    | 'straight-1-5'
    | 'straight-2-6'
    | 'five-1s'
