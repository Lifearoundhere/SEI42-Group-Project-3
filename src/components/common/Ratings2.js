import React from 'react'
import StarRatings from 'react-star-ratings'



const Ratings2 = ({overall, fullness, healthiness}) => {
  return (
    <div>
      <h3 className="title is-5">Overall Rating</h3>
      <StarRatings
        rating={overall}
        starDimension="40px"
        starSpacing="15px"
        starRatedColor="orange"
      />
      <h3 className="title is-5">Fullness</h3>
      <StarRatings
        rating={fullness}
        starDimension="40px"
        starSpacing="15px"
        starRatedColor="red"
      />
      <h3 className="title is-5">Healthiness</h3>
      <StarRatings
        rating={healthiness}
        starDimension="40px"
        starSpacing="15px"
        starRatedColor="green"
      />
    </div>
  )
}

export default Ratings2
