import { RouteDefinition } from 'solid-app-router';
import { Index } from '../components/TodoList';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: Index
	}
];
