import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { fetchBooksDetails } from '../../util/api';
import { useQuery } from '@tanstack/react-query';

const statuses = ['Available', 'Loaned', 'Reserved'];

const BookinstanceCreateModal = (props: any) => {
	const BookinstanceSchema = Yup.object().shape({
		book_id: Yup.string().required('Please choose the book'),
		imprint: Yup.string().required('Please input the imprint the book copy'),
		status: Yup.string().required('Status of the copy is required'),
		due_back: Yup.date().required('Please input the due back date'),
	});

	const {
		data: books,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['books'],
		queryFn: fetchBooksDetails,
	});

	const formik = useFormik({
		initialValues: {
			book_id: props.book_id || '',
			imprint: props.imprint || '',
			status: props.status || '',
			due_back: props.dueback || '',
		},
		validationSchema: BookinstanceSchema,
		onSubmit: props.onSubmit,
	});
	const { values, errors, handleChange, handleSubmit } = formik;

	if (error) return <p>{error.message}</p>;
	if (isLoading) return <p>Loading...</p>;

	return (
		<Modal show={props.show} onHide={props.handleCloseCreate}>
			<Modal.Header closeButton>
				<Modal.Title>New Copy</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								as={'select'}
								name='book_id'
								onChange={handleChange}
								isInvalid={!!errors.book_id}
							>
								<option value=''>Choose your book</option>
								{books.data?.map((book: any) => (
									<option key={book.id} value={book.id}>
										{book.title}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type='invalid'>
								{String(errors.book_id)}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='imprint'>
							<Form.Label>Imprint</Form.Label>
							<Form.Control
								type='text'
								name='imprint'
								onChange={handleChange}
								value={values.imprint}
								placeholder='Enter imprint'
								isInvalid={!!errors.imprint}
							/>
							<Form.Control.Feedback type='invalid'>
								{String(errors.imprint)}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId='status'>
							<Form.Label>Status</Form.Label>
							<Form.Control
								as={'select'}
								name='status'
								onChange={handleChange}
								isInvalid={!!errors.status}
							>
								<option value=''>Choose status</option>
								{statuses.map((status: string) => (
									<option key={status} value={status}>
										{status}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type='invalid'>
								{String(errors.status)}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Due Back</Form.Label>
							<Form.Control
								type='date'
								name='due_back'
								onChange={handleChange}
								value={String(values.due_back)}
								isInvalid={!!errors.due_back}
							/>
							<Form.Control.Feedback>
								{String(errors.due_back)}
							</Form.Control.Feedback>
						</Form.Group>
						<Button type='submit' className='btn btn-primary mt-3'>
							Create new copy
						</Button>
					</Form>
				</Container>
			</Modal.Body>
		</Modal>
	);
};

export default BookinstanceCreateModal;
