import { createEffect, createSignal, Setter } from 'solid-js';
import './TodoDetails.scss';
import { getCurrentTimestamp } from '../../utils/timeUtils';
import { Params, useNavigate, useParams } from 'solid-app-router';
import { todoState } from '../../store/todoStore';
import { match } from 'ts-pattern';

interface RouteParams extends Record<string, string> {
	readonly id: string;
}

const setTodoValues = (
	params: Params,
	setTitle: Setter<string>,
	setDescription: Setter<string>,
	setTimestamp: Setter<string>
) => {
	match(params.id)
		.with('add', () => {
			setTitle('');
			setDescription('');
			setTimestamp(getCurrentTimestamp());
		})
		.otherwise(() => {
			const todo = todoState.todos[parseInt(params.id)];
			setTitle(todo.title);
			setDescription(todo.description);
			setTimestamp(todo.timestamp);
		});
};

export const TodoDetails = () => {
	const navigate = useNavigate();
	const params = useParams<RouteParams>();
	const [title, setTitle] = createSignal('');
	const [description, setDescription] = createSignal('');
	const [timestamp, setTimestamp] = createSignal(getCurrentTimestamp());

	createEffect(() =>
		setTodoValues(params, setTitle, setDescription, setTimestamp)
	);

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
