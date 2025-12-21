import { Link } from 'react-router'

export function Sidebar() {
  return (
    <aside
      style={{
        width: '250px',
        background: '#f5f5f5',
        borderRight: '1px solid #ddd',
        padding: '1rem',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>Thread</div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <Link
              to="/"
              style={{
                display: 'block',
                padding: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: '4px',
              }}
            >
              Conversations
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              style={{
                display: 'block',
                padding: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: '4px',
              }}
            >
              New Chat
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
