import React from 'react'
import StarRatings from 'react-star-ratings'



const Ratings2 = ({ size, overall, fullness, healthiness }) => {
  return (
    <div>
      <h4 className="title is-4">Overall Rating</h4>
      <StarRatings
        rating={overall}
        starDimension={size || '20px'}
        starSpacing="5px"
        starRatedColor="orange"
      />
      <h4 className="title is-4">Fullness</h4>
      <StarRatings
        rating={fullness}
        starDimension={size || '20px'}
        starSpacing="5px"
        starRatedColor="red"
      />
      <h4 className="title is-4">Healthiness</h4>
      <StarRatings
        rating={healthiness}
        starDimension={size || '20px'}
        starSpacing="5px"
        starRatedColor="green"
      />
    </div>
  )
}

export default Ratings2
