import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Profile from '../pages/profile/profile';

const IndexRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
		</Routes>
	);
};

export default IndexRouter;