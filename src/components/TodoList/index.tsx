import { TodoCard } from './TodoCard';
import { Todo } from '../../types/Todo';
import { For } from 'solid-js';
import { useNavigate } from 'solid-app-router';

const tempList: ReadonlyArray<Todo> = [
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
];

export const TodoList = () => {
	const navigate = useNavigate();
	const addTodo = () => navigate('/add');
	return (
		<div>
			<div>
				<For each={tempList}>{(todo) => <TodoCard todo={todo} />}</For>
			</div>
			<button type="button" onClick={addTodo}>
				Add TODO
			</button>
		</div>
	);
};
