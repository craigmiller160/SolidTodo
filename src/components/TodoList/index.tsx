import { TodoCard } from './TodoCard';
import { createEffect, For } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { setTodoState, todoState } from '../../store/todoStore';
import { loadedTodos } from '../../services/PersistenceService';

export const TodoList = () => {
	const navigate = useNavigate();
	const addTodo = () => navigate('/add');
	createEffect(() => {
		const theTodos = loadedTodos();
		console.log('Setting LoadedTodos', theTodos);
		setTodoState(() => ({
			todos: theTodos
		}));
	});

	return (
		<div>
			<div>
				{loadedTodos.loading && <p>Loading...</p>}
				<For each={todoState.todos}>
					{(todo, index) => <TodoCard todo={todo} index={index()} />}
				</For>
			</div>
			{!loadedTodos.loading && (
				<button type="button" onClick={addTodo}>
					Add TODO
				</button>
			)}
		</div>
	);
};
