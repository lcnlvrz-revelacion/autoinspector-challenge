'use client'
import { useEffect } from 'react'
import { connect } from 'socket.io-client'

const SOCKET_URI = 'ws://localhost:3001'

export const connectToSocket = () => {
  const socket = connect(SOCKET_URI)

  socket.onAny((event, content) =>
    console.log('event received', event, content)
  )

  return socket
}

export default function Home() {
  useEffect(() => {
    connectToSocket()
  }, [])

  return (
    <div className='flex flex-col space-y-10'>
      <p>Chat</p>
    </div>
  )
}
