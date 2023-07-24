import { useState, useEffect } from 'react';
import Card from './Card';



const List = () => {
    const [movies, setMovies] = useState([]);
    const sortList = ["rating", "year", "peers", "seeds", "download_count", "like_count", "date_added"];
    const [sort, setSort] = useState(sortList[0]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotal] = useState(0)
    const pagelimit=60;
    const pagination = (current, total) => {
        let start = (current - 2 <= 0) ? 1 : (current + 2 > total) ? total - 4 : current - 2;
        let condition = (current - 2 <= 0) ? 5 : current + 2;
        let htm = [];
        for (let i = start; i <= condition && i <= total; i++) {
            htm.push(<li key={i} className={`page-item ${current === i ? 'active' : ''}`}><span className="page-link" style={{ cursor: 'pointer' }} onClick={() => setPage(i)}>{i}</span></li>)
        }
        return (<> <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><span className="page-link" style={{ cursor: 'pointer' }} onClick={() => setPage(page - 1)}>Previous</span></li>
            {htm}
            <li className={`page-item ${page >= totalPage ? 'disabled' : ''}`}><span className="page-link" style={{ cursor: 'pointer' }} onClick={() => setPage(page + 1)}>Next</span></li>
        </>)
    }
    useEffect(() => {
        setMovies([])
        fetch(`https://yts.mx/api/v2/list_movies.json?limit=${pagelimit}&sort_by=${sort}&page=${page}&genre=action`).then(r => r.json()).then(r => {
            if (r && r.data && r.data.movies) {
                setMovies(r.data.movies);
                setPage(r.data.page_number);
                setTotal(Math.ceil(r.data.movie_count / pagelimit));
            }
        }).catch(e => {
            console.log("API Not working.")
        })
    }, [sort, page])

    return (
        <>
            <h2>List</h2>
            <div className="row">
                <div className="col">
                    <select className="form-select mb-2" aria-label="Default select example" onChange={(e) => setSort(e.target.value)}>
                        {sortList.map((s, i) => {
                            return (
                                <option key={i}>{s}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col">
                    Total Pages:{totalPage}
                </div>
                <div className="col">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {pagination(page, totalPage)}

                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {movies.map(mov => {
                    return (
                        <Card key={mov.id} {...mov} />
                    )
                })}
            </div>
        </>
    )
}

export default List;