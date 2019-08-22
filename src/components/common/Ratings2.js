import React from 'react'
import StarRatings from 'react-star-ratings'

const Ratings2 = ({overall, fullness, healthiness}) => {
  return (
    <div>
      <body>Overall Rating</body>
      <StarRatings
        rating={overall}
        starDimension="20px"
        starSpacing="5px"
        starRatedColor="orange"
      />
      <body>Fullness</body>
      <StarRatings
        rating={fullness}
        starDimension="20px"
        starSpacing="5px"
        starRatedColor="red"
      />
      <body>Healthiness</body>
      <StarRatings
        rating={healthiness}
        starDimension="20px"
        starSpacing="5px"
        starRatedColor="green"
      />
    </div>
  )
}

export default Ratings2
