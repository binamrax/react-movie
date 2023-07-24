const movieLength = (l) => {
    let hr = Math.floor(l / 60);
    let min = l % 60;
    return `${hr} h ${min} min`
}

const Card = ({ genres, title, year, background_image,medium_cover_image, language, rating, runtime }) => {
    let genresList;
    if (genres) {
        genresList = genres.map((g, i) => {
            return (
                <button type="button" key={i} className="btn btn-outline-primary m-1">{g} </button>
            )
        })
    }

    return (
        <div className="col">
            <div className="card h-100 movie-item">
                <img src={medium_cover_image} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title} ,{language}</h5>
                    <p>Length :{movieLength(runtime)} </p>
                    <p className="card-text">IMDB Rating :<small className="text-muted"> {rating} </small></p>
                    {genresList}
                </div>
                <div className="card-footer">
                    <small className="text-muted">{year}</small>
                </div>
            </div>
        </div>
    )
}

export default Card
