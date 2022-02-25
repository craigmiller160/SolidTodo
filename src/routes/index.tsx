import { RouteDefinition } from 'solid-app-router';
import { TodoList } from '../components/TodoList';
import { TodoDetails } from '../components/TodoDetails';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		children: [
			{
				path: '/',
				component: TodoList
			},
			{
				path: '/:id',
				component: TodoDetails
			}
		]
	}
];
