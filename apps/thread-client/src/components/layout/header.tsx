import { UserButton } from '@clerk/clerk-react'

export function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #ddd',
      }}
    >
      <UserButton afterSignOutUrl="/" />
    </header>
  )
}
