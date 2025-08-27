'use client'

interface GameMessageProps {
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    show: boolean
}

export default function GameMessage({ message, type, show }: GameMessageProps) {
    if (!show) return null

    const getMessageStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 border-green-400 text-green-800'
            case 'warning':
                return 'bg-yellow-100 border-yellow-400 text-yellow-800'
            case 'error':
                return 'bg-red-100 border-red-400 text-red-800'
            default:
                return 'bg-blue-100 border-blue-400 text-blue-800'
        }
    }

    return (
        <div
            className={`
      p-4 rounded-lg border-2 text-center font-medium text-lg
      ${getMessageStyles()}
      animate-in fade-in duration-300
    `}
        >
            {message}
        </div>
    )
}
