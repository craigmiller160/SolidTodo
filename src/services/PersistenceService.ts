import { Todo } from '../types/Todo';
import * as Json from '@craigmiller160/ts-functions/Json';
import * as Sleep from '@craigmiller160/ts-functions/Sleep';
import { identity, pipe } from 'fp-ts/function';
import * as TaskEither from 'fp-ts/TaskEither';
import { TaskT } from '@craigmiller160/ts-functions/types';
import * as Option from 'fp-ts/Option';
import { createResource } from 'solid-js';
import * as Either from 'fp-ts/Either';

const TODOS_KEY = 'SolidJS_Todos';

const sleep2Sec = Sleep.sleep(2000);

const setInLocalStorage = (json: string): string => {
	console.log('Setting in LocalStorage', json);
	localStorage.setItem(TODOS_KEY, json);
	return json;
};

const getFromLocalStorage = (): string =>
	pipe(
		localStorage.getItem(TODOS_KEY),
		Option.fromNullable,
		Option.getOrElse(() => '[]')
	);

export const persistTodos = (todos: ReadonlyArray<Todo>): string =>
	pipe(
		Json.stringifyE(todos),
		Either.map(setInLocalStorage),
		Either.fold((ex) => {
			alert(`Error: ${ex.message}`);
			return '';
		}, identity)
	);

export const persistTodos2 = (
	todos: ReadonlyArray<Todo>
): TaskT<ReadonlyArray<Todo>> =>
	pipe(
		sleep2Sec,
		TaskEither.rightTask,
		TaskEither.chainEitherK(() => Json.stringifyE(todos)),
		TaskEither.map(setInLocalStorage),
		TaskEither.map(() => todos),
		TaskEither.fold(
			(ex) => async () => {
				alert(`Error: ${ex.message}`);
				return [];
			},
			(todos) => async () => todos
		)
	);

export const loadTodos = (): TaskT<ReadonlyArray<Todo>> =>
	pipe(
		sleep2Sec,
		TaskEither.rightTask,
		TaskEither.map(getFromLocalStorage),
		TaskEither.chainEitherK((json) =>
			Json.parseE<ReadonlyArray<Todo>>(json)
		),
		TaskEither.fold(
			(ex) => async () => {
				alert(`Error: ${ex.message}`);
				return [];
			},
			(todos) => async () => todos
		)
	);

export const [loadedTodos] = createResource(loadTodos(), {
	initialValue: []
});
