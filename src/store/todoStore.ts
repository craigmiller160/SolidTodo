import { createStore } from 'solid-js/store';
import { Todo } from '../types/Todo';

export interface TodoState {
	readonly todos: ReadonlyArray<Todo>;
}

export const [todoState, setTodoState] = createStore<TodoState>({
	todos: [
		{
			timestamp: '2022-01-01T00:00:00',
			title: 'First TODO',
			description: '',
			isComplete: false
		},
		{
			timestamp: '2022-01-02T00:00:00',
			title: 'Second TODO',
			description: '',
			isComplete: true
		},
		{
			timestamp: '2022-01-03T00:00:00',
			title: 'Third TODO',
			description: '',
			isComplete: false
		}
	]
});
