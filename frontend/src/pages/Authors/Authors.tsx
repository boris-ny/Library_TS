import React, { useState } from 'react';
import { fetchAuthorsDetails } from './AuthorsService';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthorCreateModal from '../../components/AuthorCreateModal';
import { createAuthor } from '../../util/api';
import Swal from 'sweetalert2';
import { Author, PermissionLevel } from '../../types/common';
import Headerbar from '../../components/Header';
import { Guard } from '../../components/Guard.component';

function Authors() {
	const [authors, setAuthors] = useState([]);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [newAuthor, setNewAuthor] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleSubmit = (values: Author, { resetForm }) => {
		createAuthor(values)
			.then(() => {
				Swal.fire({
					title: 'Success!',
					text: 'You have successfully created a new author!',
					background: '#242424',
					icon: 'success',
					timer: 10000,
				});
				resetForm();
				setShow(false);
			})
			.catch((error) => {
				Swal.fire({
					title: 'Error!',
					text: error.message,
					icon: 'error',
					confirmButtonText: 'Ok',
				});
			});
	};

	React.useEffect(() => {
		setIsLoading(true);
		fetchAuthorsDetails().then((res) => {
			if (res.data) {
				setAuthors(res.data);
			}
			if (res.error) {
				setError(res.error);
			}
			setIsLoading(false);
		});
	}, []);

	if (error) {
		return <div>Something went wrong! Please try again.</div>;
	}

	if (isLoading) {
		return <div>The Page is Loading ...</div>;
	}

	return (
		<>
			<Headerbar />
			<Container>
				<div className='mt-5 d-flex mb-4 justify-content-between '>
					<h1 className='mx-4'>Authors</h1>
					<Guard requiredRoles={[PermissionLevel.ADMIN]}>
						<Button
							onClick={(e) => {
								e.preventDefault();
								setShow(true);
								setNewAuthor(true);
							}}
						>
							Add new Author
						</Button>
					</Guard>
					{newAuthor && (
						<AuthorCreateModal
							show={show}
							handleClose={handleClose}
							onSubmit={handleSubmit}
						/>
					)}
				</div>
				<ol className='fs-5'>
					{authors.map((author: any) => (
						<li key={author.id}>
							<div className='mt-2'>
								<Link
									to={`/authors/${author.id}`}
									style={{
										textDecoration: 'underlined',
										color: 'black',
									}}
								>
									<div style={{ color: 'black' }}>
										{author.first_name} {author.family_name}
									</div>
								</Link>
							</div>
						</li>
					))}
				</ol>
			</Container>
		</>
	);
}

export default Authors;
