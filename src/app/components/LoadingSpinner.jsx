import React from 'react'
import './styles/spinner.css'

export default function LoadingSpinner({ width = 24, color, strokeWidth = 2 }) {
    return (
        <div className="spinner flex-cent">
            <svg width={width} viewBox="25 25 50 50">
                <circle
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    cx="50" cy="50" r="20" />
            </svg>
        </div>
    )
}
