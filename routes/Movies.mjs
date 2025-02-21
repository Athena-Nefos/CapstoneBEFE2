// routes/movies.mjs
import express from 'express';
import Movie from '../models/MoviesSchema.mjs';
const router = express.Router();

// GET all movies
router.get('/', async (req, res) => {
    try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// GET a single movie
router.get('/:id', async (req, res) => {
    try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});


// CREATE a new movie
router.post('/', async (req, res) => {
    const movie = new Movie({
    title: req.body.title,
    imdbID: req.body.imdbID,
    year: req.body.year,
    poster: req.body.poster,
    genre: req.body.genre,
    plot: req.body.plot,
    rating: req.body.rating,
    watchStatus: req.body.watchStatus,
    userNotes: req.body.userNotes
    });
    try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

// UPDATE a movie
router.put('/:id', async (req, res) => {
    try {
    const movie = await Movie.findById(req.params.id);
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

// DELETE a movie
router.delete('/:id', async (req, res) => {
    try {
    const movie = await Movie.findById(req.params.id);
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