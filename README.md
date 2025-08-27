# November 🎲

A five-dice game of risk, reward, and strategy built with Next.js, TypeScript, and Tailwind CSS.

## About the Game

November is a dice game where players race to accumulate points by rolling scoring combinations. The game blends luck with risk management — do you stop and bank your points, or keep rolling for more?

### Game Rules

- **Goal:** Be the first player to reach 5,000 points
- **Scoring:**
  - Single 1 = 100 points
  - Single 5 = 50 points
  - Three of a kind = face value × 100 (Three 1s = 1000)
  - Straights (1-2-3-4-5 or 2-3-4-5-6) = 1500 points
  - Five 1s = 5000 points (instant win!)

### How to Play

1. Roll all five dice
2. Freeze scoring dice and reroll the rest
3. Bank your points or keep rolling (but risk losing everything!)
4. If you roll no scoring dice, you lose your turn score

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lovelyvector/november.git
cd november
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Features

- 🎲 **Interactive Dice Rolling** - Beautiful 3D dice with rolling animations
- 🎮 **Complete Game Logic** - Full implementation of November rules
- 🎨 **Modern UI** - Built with Tailwind CSS for a responsive design
- 📱 **Mobile Friendly** - Works great on all device sizes
- ⚡ **Fast & Smooth** - Built with Next.js 15 and React 19
- 🎯 **Type Safe** - Full TypeScript implementation

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** React Hooks
- **Animations:** CSS keyframes with smooth transitions

## Game Components

- `NovemberGame` - Main game controller
- `Dice` - Interactive dice display with animations
- `PlayerScore` - Player information and score display
- `GameControls` - Game action buttons
- `GameMessage` - Status messages and feedback
- `GameRules` - Collapsible rules display

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the game!

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Enjoy playing November! 🎲✨**
