import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Profile from '../pages/profile/profile';
import Feed from '../pages/feed/feed';

const IndexRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
			<Route path="/Feed" element={<Feed />} />
		</Routes>
	);
};

export default IndexRouter;