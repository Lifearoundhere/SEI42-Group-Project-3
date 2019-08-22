import React from 'react'
import Ratings2 from './Ratings2'


const Comment = (({ user, createdAt, content, overall, fullness, healthiness }) => {

  return (
    <article className="media">
      <div className="media-left">
        <figure className="image is-128x128">
          {user && <img src={user.img} />}
        </figure>
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
