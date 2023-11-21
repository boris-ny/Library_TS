import React, { useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export const GenreDetails = () => {
    const [genreDetail, setGenreDetail] = React.useState<any>({})
    const params = useParams<{ id: string }>()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchGenreDetail = async () => {
            if (!params.id) {
                return "Wrong ID";
            }
            try {
                const url = "http://localhost:5000/genres/" + params.id;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGenreDetail(response.data.data);
            } catch (error:any) {
                const errorMessage = error?.response?.data?.message;
                return errorMessage;
            }
        }
        fetchGenreDetail();
     }, )
    return (
      <>
        <Container className="fs-5 mt-5">
                <div>Genre Details</div>
                <ul className="mt-2" key={genreDetail.id}>
                    <h1>{genreDetail.name}</h1>
                    <div>
                        <strong>Book</strong> : {genreDetail.books && genreDetail.books.map((book:any)=>(
                            <div>{book.title}</div>
                        ))}
                    </div>
                    <div>{}</div>
                    </ul>
        </Container>
      </>
    );
}
export default GenreDetails