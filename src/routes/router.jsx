import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Profile from '../pages/profile/profile';
import Feed from '../pages/feed/feed';
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import { RequireAuth } from '../utils/RequireAuth';
import { AlreadyAuth } from '../utils/AlreadyAuth';
import OtherProfile from '../pages/otherProfile/otherProfile';

const IndexRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Login" element={<AlreadyAuth><Login /></AlreadyAuth> } />
			<Route path="/Cadastro" element={<Register />} />
            <Route path="/Profile" element={<RequireAuth><Profile /></RequireAuth>} />
			<Route path="/Profile/:name" element={<OtherProfile />} />
			<Route path="/Feed" element={<Feed />} />
		</Routes>
	);
};

export default IndexRouter;