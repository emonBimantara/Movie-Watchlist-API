import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body

    // Verify Movie Exist
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    })

    if (!movie) {
        return res.status(404).json({ error: "Movie Not Found" })
    }

    // Check If Already Added
    const existingInWatchList = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    })

    if (existingInWatchList) {
        return res.status(400).json({ error: "Movie Already In The Watchlist" })
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    res.status(201).json({
        status: "SUCCESS",
        data: { watchlistItem }
    })
}

export { addToWatchList }