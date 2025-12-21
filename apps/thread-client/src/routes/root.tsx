import { Outlet } from 'react-router'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

export function RootLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
