import './TodoCard.scss';
import { Todo } from '../../../types/Todo';
import { formatTimestampForDisplay } from '../../../utils/timeUtils';

interface Props {
	readonly todo: Todo;
}

export const TodoCard = (props: Props) => {
	const titleClass = () => ({
		Title: true,
		Complete: props.todo.isComplete
	});
	const timestamp = () => formatTimestampForDisplay(props.todo.timestamp);
	return (
		<div class="TodoCard">
			<div class="TodoCheckbox">
				<input
					type="checkbox"
					name="complete"
					checked={props.todo.isComplete}
				/>
			</div>
			<div class="TodoCardContent">
				<h2 classList={titleClass()}>{props.todo.title}</h2>
				<p>{timestamp()}</p>
			</div>
		</div>
	);
};
