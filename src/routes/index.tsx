import { RouteDefinition } from 'solid-app-router';
import { Home } from '../components/Home';

export const routes: RouteDefinition[] = [
	{
		path: '/',
		component: Home
	}
];
