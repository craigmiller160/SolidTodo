import './TodoCard.scss';
import { Todo } from '../../../types/Todo';
import { formatTimestampForDisplay } from '../../../utils/timeUtils';
import { setTodoState } from '../../../store/todoStore';
import { useNavigate } from 'solid-app-router';

interface Props {
	readonly todo: Todo;
	readonly index: number;
}

const createOnInput = (props: Props) => (event: InputEvent) =>
	setTodoState((state) => {
		const todos = [...state.todos];
		todos[props.index] = {
			...todos[props.index],
			isComplete:
				(event.currentTarget as HTMLInputElement | undefined)
					?.checked ?? false
		};
		return {
			todos
		};
	});

const createOnDelete = (props: Props) => () => {
	setTodoState((state) => {
		const start = state.todos.slice(0, props.index);
		const end = state.todos.slice(props.index + 1);
		return {
			todos: start.concat(end)
		};
	});
};

export const TodoCard = (props: Props) => {
	const navigate = useNavigate();
	const titleClass = () => ({
		Title: true,
		Complete: props.todo.isComplete
	});
	const timestampClass = () => ({
		Timestamp: true,
		Complete: props.todo.isComplete
	});
	const timestamp = () => formatTimestampForDisplay(props.todo.timestamp);
	const onInput = createOnInput(props);
	const edit = () => navigate(`/${props.index}`);
	const onDelete = createOnDelete(props);

	return (
		<div class="TodoCard">
			<div class="TodoCheckbox">
				<input
					type="checkbox"
					name="complete"
					checked={props.todo.isComplete}
					onInput={onInput}
				/>
			</div>
			<div class="TodoCardContent">
				<h2 classList={titleClass()}>{props.todo.title}</h2>
				<p classList={timestampClass()}>{timestamp()}</p>
			</div>
			<div class="Actions">
				<button type="button" onClick={edit}>
					Edit
				</button>
				<button type="button" onClick={onDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};
