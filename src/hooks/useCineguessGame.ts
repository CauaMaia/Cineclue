import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { compareMovies } from '../utils/compareMovies';
import {
  fetchMovieById,
  searchMovieByTitle,
  suggestClosestMovie,
  fetchPopularMovieIds
} from '../services/movieService';

interface Feedback {
  field: string;
  value: string | number;
  result: 'correct' | 'partial' | 'higher' | 'lower' | 'wrong';
}

interface Guess {
  movie: Movie;
  feedbacks: Feedback[];
}

export function useCineguessGame() {
  const [answer, setAnswer] = useState<Movie | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<number[]>([]); // para evitar repetições


  const devMode = false;
  


  useEffect(() => {
    loadRandomPopularMovie();
  }, []);

  async function loadRandomPopularMovie() {
    const popularIds = await fetchPopularMovieIds();
    let idToUse: number | null = null;

    for (let i = 0; i < 10; i++) {
      const candidate = popularIds[Math.floor(Math.random() * popularIds.length)];
      if (!history.includes(candidate)) {
        idToUse = candidate;
        break;
      }
    }

    if (!idToUse) idToUse = popularIds[0]; 

    const movie = await fetchMovieById(idToUse);
    if (movie) {
      setAnswer(movie);
      setHistory((prev) => [...prev.slice(-5), movie.id]); 
      setGuesses([]);
      setIsWinner(false);
      setError(null);
    }
  }

  async function guessMovie(title: string) {
    if (!answer) return;
    setError(null);

    const normalizedTitle = title.trim().toLowerCase();

    const alreadyTried = guesses.some(
      (g) => g.movie.title.toLowerCase().trim() === normalizedTitle
    );
    if (alreadyTried) {
      setError('⚠️ Você já tentou esse filme!');
      return;
    }

    const movie = await searchMovieByTitle(title);
    if (!movie) {
      const suggestion = await suggestClosestMovie(title);
      setError(`❓ Nenhum resultado exato. Você quis dizer "${suggestion}"?`);
      return;
    }

    const feedbacks = compareMovies(movie, answer);
    const isCorrect = movie.id === answer.id;

    setGuesses((prev) => [...prev, { movie, feedbacks }]);
    if (isCorrect) {
      setIsWinner(true);
    }
  }

  function resetGame() {
    loadRandomPopularMovie();
  }


  return {
    answer,
    guesses,
    isWinner,
    guessMovie,
    resetGame,
    error,
    devMode,
  };
}
