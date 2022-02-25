import { createSignal } from 'solid-js';

export const TodoDetails = () => {
	const [title, setTitle] = createSignal('');
	return (
		<div>
			<h2>TODO Details</h2>
			<div class="form-group">
				<label for="title">Title</label>
				<input id="title" type="text" name="title" value={title()} />
			</div>
		</div>
	);
};
