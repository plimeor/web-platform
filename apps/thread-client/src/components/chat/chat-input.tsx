import { type FormEvent, type KeyboardEvent, useState } from 'react'

interface ChatInputProps {
  onSend: (content: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim() && !disabled) {
      onSend(value.trim())
      setValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #ddd',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit'
          }}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#007bff',
            color: 'white',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
        >
          Send
        </button>
      </div>
    </form>
  )
}
