import React from 'react';
import Rating from '../Rating';
import './style.css';

const MAX_RATING = 5;
function Rate({reviews, rate, onChangeRate}) {
    return (
        <div className="rate">
            <div>
                <span className="rate__title">
                    average rating
                </span>
                <span className="rate__reviews">({reviews} reviews)</span>
            </div>
            <div className="rate__rating">
                <Rating value={rate} max={MAX_RATING} onChange={onChangeRate}/>
                <span>{rate} out of {MAX_RATING}</span>
            </div>
        </div>
    );
};

export default Rate;
