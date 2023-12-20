import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Authors from './pages/Authors/Authors';
import AuthorDetail from './pages/Authors/AuthorDetail';
import Books from './pages/Books/Books';
import Bookdetail from './pages/Books/Bookdetail';
import Bookinstances from './pages/Bookinstances/Bookinstances';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Genres from './pages/Genres/Genres';
import GenreDetails from './pages/Genres/GenreDetails';
import BookCreate from './pages/Books/BookCreate';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import ErrorPage from './pages/error-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route element={<PublicRoutes />} errorElement={<ErrorPage />}>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Route>

					<Route element={<PrivateRoutes />} errorElement={<ErrorPage />}>
						<Route index path='/' element={<Dashboard />} />
						<Route path='/authors' element={<Authors />} />
						<Route path='/books' element={<Books />} />
						<Route path='/books/create' element={<BookCreate />} />
						<Route path='/book/:id' element={<Bookdetail />} />
						<Route path='/authors/:id' element={<AuthorDetail />} />
						<Route path='/bookinstances' element={<Bookinstances />} />
						<Route path='/genres' element={<Genres />} />
						<Route path='/genre/:id' element={<GenreDetails />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</>
	);
}
export default App;
