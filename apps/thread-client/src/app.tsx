import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ChatPage } from './routes/chat'
import { ConversationsPage } from './routes/conversations'
import { RootLayout } from './routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ConversationsPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'chat/:conversationId',
        element: <ChatPage />,
      },
    ],
  },
])

export function App() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </>
  )
}
