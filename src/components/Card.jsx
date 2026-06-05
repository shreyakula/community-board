import React from 'react'

function Card({ title, genre, episodes, status, rating, year, description, image, link }) {
  const isAiring = status === 'Airing'

  return (
    <div className="card">
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={image}
          alt={title}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <span className={`card-status ${isAiring ? 'airing' : ''}`}>
          {isAiring ? 'Airing' : 'Finished'}
        </span>
      </div>

      <div className="card-body">
        <p className="card-genre">{genre}</p>
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="card-footer">
          <div>
            <div className="card-rating">
              <span>&#9733;</span>{rating.toFixed(1)}
            </div>
            <div className="card-eps">{episodes} eps &middot; {year}</div>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-read"
          >
            Read more &#8599;
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
