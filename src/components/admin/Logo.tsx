import React from 'react'

export default function Logo() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '20px 0',
            }}
        >
            <img
                src="/images/byd-logo.png"
                alt="BYD Việt Nam"
                style={{
                    height: '48px',
                    width: 'auto',
                }}
            />
            <span
                style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748B',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                }}
            >
                Hệ thống quản trị
            </span>
        </div>
    )
}
