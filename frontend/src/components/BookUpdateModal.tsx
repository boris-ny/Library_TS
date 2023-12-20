import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAuthorsDetails } from '../pages/Authors/AuthorsService';
import { fetchGenresDetails } from '../pages/Genres/GenresServices';
import { Book } from '../types/common';

interface BookUpdateModalProps {
	book?: Book;
	show: boolean;
	handleClose: () => void;
	onSubmit: (values: Book, { resetForm }) => void;
}

const BookUpdateModal = (props: BookUpdateModalProps) => {
	const [authors, setAuthors] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		fetchAuthorsDetails().then((res) => {
			if (res.data) {
				setAuthors(res.data);
			}
		});

		fetchGenresDetails().then((res) => {
			if (res.data) {
				setGenres(res.data);
			}
		});
	}, []);

	const BookSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		summary: Yup.string().required('Summary is required'),
		genreId: Yup.string().required('Author is required'),
		isbn: Yup.string().required('ISBN is required'),
		authorId: Yup.string().required('Genre is required'),
	});

	const { values, errors, handleChange, handleSubmit } = formik.useFormik({
		initialValues: {
			title: props.book?.title || '',
			summary: props.book?.summary || '',
			genreId: props.book?.genreId || 0,
			isbn: props.book?.isbn || '',
			authorId: props.book?.authorId || 0,
		},
		validationSchema: BookSchema,
		onSubmit: props.onSubmit,
	});

	if (!props.book) {
		return null;
	}
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className=" ">Update Book</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container className="d-flex justify-content-between align-items-center flex-column">
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									name="title"
									placeholder="Enter title"
									value={values?.title}
									onChange={handleChange}
									isInvalid={!!errors.title}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.title}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="summary">
								<Form.Label>Summary</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="summary"
									placeholder="Enter summary"
									value={values.summary}
									onChange={handleChange}
									isInvalid={!!errors.summary}
								/>
								<Form.Control.Feedback type="invalid">{}</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="author">
								<Form.Label>Author</Form.Label>
								<Form.Control
									as="select"
									name="authorId"
									onChange={handleChange}
									isInvalid={!!errors.authorId}
								>
									<option value="">Select author</option>
									{authors.map((author: any) => (
										<option key={author.id} value={author.id}>
											{author.first_name} {author.family_name}
										</option>
									))}
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.authorId}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="isbn">
								<Form.Label>ISBN</Form.Label>
								<Form.Control
									type="text"
									name="isbn"
									placeholder="Enter ISBN"
									value={values?.isbn}
									onChange={handleChange}
									isInvalid={!!errors.isbn}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.isbn}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="genre">
								<Form.Label>Genre</Form.Label>
								<Form.Control
									as="select"
									name="genreId"
									onChange={handleChange}
									isInvalid={!!errors.genreId}
								>
									<option value="">Select genre</option>
									{genres.map((genre: any) => (
										<option value={genre.id} key={genre.id}>
											{genre.name}
										</option>
									))}
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.genreId}
								</Form.Control.Feedback>
							</Form.Group>
							<div className="d-flex mt-4">
								<Button variant="primary" type="submit">
									Save Changes
								</Button>
								<Button
									className="ms-5"
									variant="secondary"
									onClick={props.handleClose}
								>
									Close
								</Button>
							</div>
						</Form>
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default BookUpdateModal;
