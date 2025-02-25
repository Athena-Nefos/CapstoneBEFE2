// routes/movies.mjs
import express from 'express';
import Movie from '../models/MoviesSchema.mjs';
import auth from '../middleware/auth.mjs';

const router = express.Router();

// Get all movies (protected)
router.get('/', auth, async (req, res) => {
    try {
    // Only fetch movies added by the current user
    const movies = await Movie.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(movies);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// GET a single movie (protected)
router.get('/:id', auth, async (req, res) => {
    try {
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user.id });
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// CREATE a new movie (protected)
router.post('/', auth, async (req, res) => {
    const movie = new Movie({
    title: req.body.title,
    imdbID: req.body.imdbID,
    year: req.body.year,
    poster: req.body.poster,
    genre: req.body.genre,
    plot: req.body.plot,
    rating: req.body.rating,
    watchStatus: req.body.watchStatus,
    userNotes: req.body.userNotes,
    user: req.user.id // Associate movie with the current user
    });

    try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

// UPDATE a movie (protected)
router.put('/:id', auth, async (req, res) => {
    try {
    // Check if movie exists and belongs to user
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user.id });
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    
    const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
        req.body,
        { new: true }
    );
    
    res.json(updatedMovie);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

// DELETE a movie (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
    // Check if movie exists and belongs to user
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user.id });
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

export default router;