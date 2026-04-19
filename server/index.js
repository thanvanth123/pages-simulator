import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import quizRoutes from './routes/quiz.js'
import leaderboardRoutes from './routes/leaderboard.js'
import pagingRoutes from './routes/paging.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/paging', pagingRoutes)

// Serve static files from the React app build directory (always, not just production)
const distPath = path.join(__dirname, '../client/dist')
app.use(express.static(distPath))

// Handle React routing - return index.html for any route that's not an API
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
