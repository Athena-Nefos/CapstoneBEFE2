// models/Movie.mjs
import mongoose from 'mongoose';

// Define movie schema
const movieSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true
    },
    imdbID: {
    type: String,
    required: true
    },
    year: {
    type: String,
    required: true
    },
    poster: {
    type: String,
    },
    genre: {
    type: String,
    default: 'Not specified'
    },
    plot: {
    type: String,
    default: 'No plot description available'
    },
    rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
    },
    watchStatus: {
    type: String,
    enum: ['Want to Watch', 'Watched', 'Currently Watching'],
    default: 'Want to Watch'
    },
    userNotes: {
    type: String,
    default: ''
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});

// Create and export Movie model
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;