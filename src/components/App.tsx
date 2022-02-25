import { useRoutes, Router } from 'solid-app-router';
import { routes } from '../routes';

export const App = () => {
	const Routes = useRoutes(routes);
	return (
		<Router>
			<div>
				<h1>Hello World</h1>
				<Routes />
			</div>
		</Router>
	);
};
