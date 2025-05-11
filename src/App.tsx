import './App.css';
import AutocompleteInput from './components/AutocompleteInput';
import GuessRow from './components/GuessRow';
import { useCineguessGame } from './hooks/useCineguessGame';

function App() {
  const { guesses, guessMovie, isWinner, resetGame, error, answer, devMode } = useCineguessGame();

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">🎬 Cineguess</h1>
        <p className="subtitle">Tente adivinhar o filme secreto com base nas pistas!</p>
        {devMode && answer && (
          <p className="dev-hint">🔦 Filme secreto: <em>{answer.title}</em></p>
        )}
      </header>

      {!isWinner ? (
        <div className="input-section">
          <AutocompleteInput onSelect={(title) => guessMovie(title)} />
        </div>
      ) : (
        <div className="input-section">
          <button onClick={resetGame} className="play-again-btn">🔁 Jogar novamente</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {isWinner && (
        <div className="win-message">
          🎉 Parabéns! Você acertou o filme!
        </div>
      )}

      {guesses.length > 0 && (
        <div className="guess-header">
          <div className="guess-label">🎮</div>
          <div className="guess-label">Gênero</div>
          <div className="guess-label">Franquia</div>
          <div className="guess-label">Estúdio</div>
          <div className="guess-label">País</div>
          <div className="guess-label">Ano</div>
          <div className="guess-label">Duração</div>
          <div className="guess-label">Nota</div>
        </div>
      )}

      <div className="guesses-section">
        {[...guesses].reverse().map((guess, index) => (
          <GuessRow
            key={index}
            posterPath={guess.movie.poster_path}
            feedbacks={guess.feedbacks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
