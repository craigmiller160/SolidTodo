import { createSignal } from 'solid-js';
import './TodoDetails.scss';
import { getCurrentTimestamp } from '../../utils/timeUtils';
import { useNavigate } from 'solid-app-router';

export const TodoDetails = () => {
	const navigate = useNavigate();
	const [title, setTitle] = createSignal('');
	const [description, setDescription] = createSignal('');
	const [timestamp, setTimestamp] = createSignal(getCurrentTimestamp());

	const cancel = () => navigate('../');
	return (
		<div class="TodoDetails">
			<h2>TODO Details</h2>
			<div class="Form">
				<div class="form-group">
					<label for="title">Title</label>
					<input
						id="title"
						type="text"
						name="title"
						value={title()}
					/>
				</div>
				<div class="form-group">
					<label for="timestamp">Timestamp</label>
					<input
						id="timestamp"
						type="datetime-local"
						name="timestamp"
						value={timestamp()}
					/>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea
						id="description"
						name="description"
						rows="10"
						value={description()}
					/>
				</div>
			</div>
			<div class="Actions">
				<button type="button" onClick={cancel}>
					Cancel
				</button>
				<button type="button">Save</button>
			</div>
		</div>
	);
};
