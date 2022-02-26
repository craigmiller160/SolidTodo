import { Accessor, createEffect, createSignal, Setter } from 'solid-js';
import './TodoDetails.scss';
import { getCurrentTimestamp } from '../../utils/timeUtils';
import { Params, useNavigate, useParams, Navigator } from 'solid-app-router';
import { todoState, setTodoState } from '../../store/todoStore';
import { match } from 'ts-pattern';

interface RouteParams extends Record<string, string> {
	readonly id: string;
}

const setTodoValues = (
	params: Params,
	setTitle: Setter<string>,
	setDescription: Setter<string>,
	setTimestamp: Setter<string>
): void =>
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

const createSaveTodo =
	(
		params: Params,
		navigate: Navigator,
		title: Accessor<string>,
		description: Accessor<string>,
		timestamp: Accessor<string>
	) =>
	() => {
		setTodoState((state) => {
			const todos = [...state.todos];
			match(params.id)
				.with('add', () =>
					todos.push({
						title: title(),
						description: description(),
						timestamp: timestamp(),
						isComplete: false
					})
				)
				.otherwise(() => {
					todos[parseInt(params.id)] = {
						title: title(),
						description: description(),
						timestamp: timestamp(),
						isComplete: todos[parseInt(params.id)].isComplete
					};
				});
			return {
				todos
			};
		});
		navigate('../');
	};

const createUpdateStringSignal = (setter: Setter<string>) => (event: Event) => {
	const value = (event.currentTarget as HTMLInputElement | null)?.value ?? '';
	setter(value);
};

const createUpdateNonEmptyStringSignal =
	(setter: Setter<string>) => (event: Event) => {
		const value =
			(event.currentTarget as HTMLInputElement | null)?.value ?? '';
		if (value) {
			setter(value);
		}
	};

export const TodoDetails = () => {
	const navigate = useNavigate();
	const params = useParams<RouteParams>();
	const [title, setTitle] = createSignal('');
	const [description, setDescription] = createSignal('');
	const [timestamp, setTimestamp] = createSignal(getCurrentTimestamp());
	const saveTodo = createSaveTodo(
		params,
		navigate,
		title,
		description,
		timestamp
	);
	const updateTitle = createUpdateStringSignal(setTitle);
	const updateDescription = createUpdateStringSignal(setDescription);
	const updateTimestamp = createUpdateNonEmptyStringSignal(setTimestamp);

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
						onInput={updateTitle}
					/>
				</div>
				<div class="form-group">
					<label for="timestamp">Timestamp</label>
					<input
						id="timestamp"
						type="datetime-local"
						name="timestamp"
						value={timestamp()}
						onInput={updateTimestamp}
					/>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea
						id="description"
						name="description"
						rows="10"
						value={description()}
						onInput={updateDescription}
					/>
				</div>
			</div>
			<div class="Actions">
				<button type="button" onClick={cancel}>
					Cancel
				</button>
				<button type="button" onClick={saveTodo}>
					Save
				</button>
			</div>
		</div>
	);
};
