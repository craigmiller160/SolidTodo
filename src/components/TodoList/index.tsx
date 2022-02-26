import { TodoCard } from './TodoCard';
import { For } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { todoState } from '../../store/todoStore';
import { loadedTodos } from '../../services/PersistenceService';

export const TodoList = () => {
	const navigate = useNavigate();
	const addTodo = () => navigate('/add');

	return (
		<div>
			<div>
				{loadedTodos.loading && <p>Loading...</p>}
				{!loadedTodos.loading && (
					<For each={todoState.todos}>
						{(todo, index) => (
							<TodoCard todo={todo} index={index()} />
						)}
					</For>
				)}
			</div>
			{!loadedTodos.loading && (
				<button type="button" onClick={addTodo}>
					Add TODO
				</button>
			)}
		</div>
	);
};
