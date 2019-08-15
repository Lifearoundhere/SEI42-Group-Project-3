import React from 'react'
// import Auth from '../../lib/Auth'

const Comment = (({ user, createdAt, content}) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDate()}</small>
            <br />
            {content}
          </p>
        </div>
      </div>
    </article>
  )
})

export default Comment
