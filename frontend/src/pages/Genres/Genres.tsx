import { useEffect, useState } from "react"
import { fetchGenresDetails } from "./GenresServices"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import HeaderBar from "../../components/Header"


function Genres() {

  const [genres, setGenres] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchGenresDetails().then((res) => {
      if (res.data) {
        setGenres(res.data)
      }
      if (res.error) {
        setError(res.error)
      }
      setIsLoading(false)
    });
  }, [])
  
  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  if (isLoading) {
    return <div>The Page is Loading ...</div>;
  }
  return (
    <>
      <HeaderBar />
      <Container>
        <div className="mt-3">
          <h1> Genres</h1>
          <ol className="fs-3 ms-3">
            {genres.map((genre: any) => (
              <li key={genre.id}>
                <Link
                  to={`/genre/${genre.id}`}
                  style={{
                    textDecoration: "underlined",
                    color: "black",
                  }}>
                  {genre.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
}

export default Genres