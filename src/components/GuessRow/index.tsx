import React from 'react';
import FeedbackCell from '../FeedbackCell';
import './styles.css';

interface Feedback {
  field: string;
  value: string | number;
  result: 'correct' | 'partial' | 'higher' | 'lower' | 'wrong';
}

interface GuessRowProps {
  posterPath: string;
  feedbacks: Feedback[];
}

const GuessRow: React.FC<GuessRowProps> = ({ posterPath, feedbacks }) => {
  return (
    <div className="guess-row">
      <img
        src={`https://image.tmdb.org/t/p/w92${posterPath}`}
        alt="poster do palpite"
        className="guess-poster"
      />
      {feedbacks.map((f) => (
        <FeedbackCell key={f.field} value={f.value} result={f.result} />
      ))}
    </div>
  );
};

export default GuessRow;
