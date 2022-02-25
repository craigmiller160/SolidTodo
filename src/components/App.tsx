import { useRoutes, Router } from 'solid-app-router';
import { routes } from '../routes';
import './App.scss';

export const App = () => {
	const Routes = useRoutes(routes);
	return (
		<Router>
			<div class="App">
				<h1>My TODO List</h1>
				<Routes />
			</div>
		</Router>
	);
};
