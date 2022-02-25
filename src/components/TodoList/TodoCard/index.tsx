import './TodoCard.scss';
import { Todo } from '../../../types/Todo';
import { formatTimestampForDisplay } from '../../../utils/timeUtils';
import { setTodoState } from '../../../store/todoStore';

interface Props {
	readonly todo: Todo;
	readonly index: number;
}

export const TodoCard = (props: Props) => {
	const titleClass = () => ({
		Title: true,
		Complete: props.todo.isComplete
	});
	const timestamp = () => formatTimestampForDisplay(props.todo.timestamp);
	const onInput = (event: InputEvent) => {
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
	};

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
				<p>{timestamp()}</p>
			</div>
		</div>
	);
};
