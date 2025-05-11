import React from 'react';
import './styles.css';

interface FeedbackCellProps {
  value: string | number;
  result: 'correct' | 'partial' | 'higher' | 'lower' | 'wrong';
}

const FeedbackCell: React.FC<FeedbackCellProps> = ({ value, result }) => {
  const getColorClass = () => {
    switch (result) {
      case 'correct':
        return 'feedback-correct';
      case 'partial':
        return 'feedback-partial';
      case 'higher':
      case 'lower':
        return 'feedback-directional';
      case 'wrong':
      default:
        return 'feedback-wrong';
    }
  };

  return (
    <div className={`feedback-cell ${getColorClass()}`}>
      {value}
      {(result === 'higher' || result === 'lower') && (
        <span className="arrow">{result === 'higher' ? '⬆' : '⬇'}</span>
      )}
    </div>
  );
};

export default FeedbackCell;
