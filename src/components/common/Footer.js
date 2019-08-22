import React from 'react'
import GitHub from '../../assets/GitHub-Mark-32px.png'
import Linkedin from '../../assets/LI-In-Bug.png'

const Footer = () => {
  return (

    <footer className="footer" id="footer">
      <div className="content">
        <h2>The Creators</h2>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Prab Singh</p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={Linkedin} name="Icon" />
                </span>
                <a href='https://linkedin.com/in/prabhdeeps'> Linkedin</a>
              </p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={GitHub} name="Icon" />
                </span>
                <a href='https://github.com/Lifearoundhere'>   GitHub</a></p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Daniel H Cohen</p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={Linkedin} name="Icon" />
                </span>
                <a href='http://www.linkedin.com/in/daniel-hof-cohen-143aa1185'> Linkedin</a>
              </p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={GitHub} name="Icon" />
                </span>
                <a href='https://github.com/Mathsteacher7'>   GitHub</a></p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Elliott M Chick</p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={Linkedin} name="Icon" />
                </span>
                <a href='https://www.linkedin.com/in/elliott-chick-790b63a2/'> Linkedin</a>
              </p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={GitHub} name="Icon" />
                </span>
                <a href='https://github.com/herrchick'> GitHub</a></p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Dmitrii Solomatin</p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={Linkedin} name="Icon" />
                </span>
                <a href='#'> Linkedin</a>
              </p>
              <p className="subtitle is-vertical-center">
                <span className="icon">
                  <img src={GitHub} name="Icon" />
                </span>
                <a href='https://github.com/DmitriiUK'>   GitHub</a></p>
            </article>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
