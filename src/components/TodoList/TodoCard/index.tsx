import './TodoCard.scss';
import { Todo } from '../../../types/Todo';

interface Props {
	readonly todo: Todo;
}

export const TodoCard = (props: Props) => {
	const titleClass = {
		Complete: props.todo.isComplete
	};
	return (
		<div class="TodoCard">
			<div class="TodoCheckbox">
				<input
					type="checkbox"
					name="complete"
					checked={props.todo.isComplete}
				/>
			</div>
			<div class="TodoTitle">
				<h2 classList={titleClass}>{props.todo.title}</h2>
			</div>
		</div>
	);
};
