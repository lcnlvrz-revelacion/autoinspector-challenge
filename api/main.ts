import * as express from 'express'
import type { Request, Response } from 'express'
import * as http from 'http'
import { Server } from 'socket.io'

//@ts-ignore
const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const generateRandomMessage = () => {
  const messages = [
    'Hello!',
    'How are you?',
    'Nice to meet you.',
    "What's your favorite color?",
    'Have a great day!',
    'This is a random message.',
    'Coding is fun!',
    'The weather is nice today.',
    "What's your favorite food?",
    'I love learning new things.',
    'Stay positive!',
    'Enjoy your weekend.',
    'Technology is amazing.',
    "Let's go on an adventure!",
    'Life is beautiful.',
    'Do what makes you happy.',
    'Keep up the good work!',
    'Dream big, work hard.',
    'Be kind to others.',
    'Never give up!',
  ]

  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}

setInterval(() => {
  const message = {
    content: generateRandomMessage(),
  }

  io.emit('message', message)

  console.log('published message', message)
}, 3000)

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})
