import { TodoCard } from './TodoCard';
import { For } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { todoStore } from '../../store/todoStore';

export const TodoList = () => {
	const navigate = useNavigate();
	const addTodo = () => navigate('/add');
	return (
		<div>
			<div>
				<For each={todoStore.todos}>
					{(todo) => <TodoCard todo={todo} />}
				</For>
			</div>
			<button type="button" onClick={addTodo}>
				Add TODO
			</button>
		</div>
	);
};
