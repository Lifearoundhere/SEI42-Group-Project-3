import React from 'react'
import Ratings2 from './Ratings2'
// import Auth from '../../lib/Auth'

// <div className="media-right">
//   <Ratings2
//     overall={ratings.overall}
//     fullness={ratings.fullness}
//     healthiness={ratings.healthiness} />
// </div>

// ratings,


// fullness={fullness}
// healthiness={healthiness}

const Comment = (({ user, createdAt, content, overall, fullness, healthiness }) => {

  return (
    <article className="media">
      <div className="media-left is-48x48">
        {user && <img src={user.img} />}
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            {user && <strong>{user.username}</strong>}
            {' '}
            <small>{(new Date(createdAt)).toLocaleString()}</small>
            <br />
            {content}
          </p>
        </div>
      </div>

      <div className="media-right">
        <Ratings2
          overall={overall}
          fullness={fullness}
          healthiness={healthiness}
        />
      </div>



    </article>
  )
})

export default Comment
