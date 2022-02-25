import './TodoCard.scss';

export const TodoCard = () => (
	<div class="TodoCard">
		<div class="TodoCheckbox">
			<input type="checkbox" name="complete" />
		</div>
		<div class="TodoTitle">
			<h2>Title</h2>
		</div>
	</div>
);
