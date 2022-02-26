import { useRoutes, Router } from 'solid-app-router';
import { routes } from '../routes';
import './App.scss';
import { createEffect } from 'solid-js';
import { loadedTodos } from '../services/PersistenceService';
import { setTodoState } from '../store/todoStore';

export const App = () => {
	const Routes = useRoutes(routes);
	createEffect(() => {
		const theTodos = loadedTodos();
		setTodoState(() => ({
			todos: theTodos
		}));
	});
	return (
		<Router>
			<div class="App">
				<h1>My TODO List</h1>
				<Routes />
			</div>
		</Router>
	);
};
