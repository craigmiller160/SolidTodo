import './TodoCard.scss';
import { Todo } from '../../../types/Todo';

interface Props {
	readonly todo: Todo;
}

export const TodoCard = (props: Props) => (
	<div class="TodoCard">
		<div class="TodoCheckbox">
			<input type="checkbox" name="complete" />
		</div>
		<div class="TodoTitle">
			<h2>{props.todo.title}</h2>
		</div>
	</div>
);
