import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Profile from '../pages/profile/profile';
import Feed from '../pages/feed/feed';
import Login from '../pages/login/login';
import Register from '../pages/register/register';

const IndexRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/Cadastro" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
			<Route path="/Feed" element={<Feed />} />
		</Routes>
	);
};

export default IndexRouter;