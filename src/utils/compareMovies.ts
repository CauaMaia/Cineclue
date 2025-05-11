import { Movie } from '../types/movie';

type FeedbackResult = 'correct' | 'partial' | 'higher' | 'lower' | 'wrong';

interface Feedback {
  field: string;
  value: string | number;
  result: FeedbackResult;
}

export function compareMovies(guess: Movie, answer: Movie): Feedback[] {
  const guessYear = new Date(guess.release_date).getFullYear();
  const answerYear = new Date(answer.release_date).getFullYear();

  const getRelation = (a: number, b: number): FeedbackResult => {
    if (a === b) return 'correct';
    return a > b ? 'lower' : 'higher';
  };

  return [
    {
      field: 'genre',
      value: guess.genres.map((g) => g.name).join(', '),
      result: guess.genres.some((g) =>
        answer.genres.find((ag) => ag.id === g.id)
      )
        ? guess.genres.length === answer.genres.length &&
          guess.genres.every((g) =>
            answer.genres.find((ag) => ag.id === g.id)
          )
          ? 'correct'
          : 'partial'
        : 'wrong',
    },
    {
      field: 'franchise',
      value: guess.belongs_to_collection?.name || 'Nenhuma',
      result:
        guess.belongs_to_collection?.name ===
        answer.belongs_to_collection?.name
          ? 'correct'
          : 'wrong',
    },
    {
      field: 'studio',
      value: guess.production_companies[0]?.name || 'Desconhecido',
      result:
        guess.production_companies[0]?.name ===
        answer.production_companies[0]?.name
          ? 'correct'
          : 'wrong',
    },
    {
      field: 'country',
      value: guess.origin_country[0] || 'Desconhecido',
      result:
        guess.origin_country[0] === answer.origin_country[0]
          ? 'correct'
          : 'wrong',
    },
    {
      field: 'year',
      value: guessYear,
      result: getRelation(guessYear, answerYear),
    },
    {
      field: 'duration',
      value: guess.runtime,
      result: getRelation(guess.runtime, answer.runtime),
    },
    {
      field: 'score',
      value: guess.vote_average,
      result: getRelation(guess.vote_average, answer.vote_average),
    },
  ];
}
