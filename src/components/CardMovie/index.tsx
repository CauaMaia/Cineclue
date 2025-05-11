import React from 'react';
import './styles.css';

interface CardMovieProps {
    title: string;
    description: string;
    imageUrl: string;
}

const CardMovie: React.FC<CardMovieProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="card-movie">
            <div className="card-movie__content">
            <img src={imageUrl} alt={title} className="card-movie__image" />
            <div className='movie_information'>
             <h2 className="card-movie__title">{title}</h2>
                <p className="card-movie__description">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default CardMovie;