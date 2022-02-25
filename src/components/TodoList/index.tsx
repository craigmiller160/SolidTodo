import { TodoCard } from './TodoCard';
import { For } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { todoState } from '../../store/todoStore';

export const TodoList = () => {
	const navigate = useNavigate();
	const addTodo = () => navigate('/add');
	return (
		<div>
			<div>
				<For each={todoState.todos}>
					{(todo, index) => <TodoCard todo={todo} index={index()} />}
				</For>
			</div>
			<button type="button" onClick={addTodo}>
				Add TODO
			</button>
		</div>
	);
};
