import { Todo } from '../types/Todo';
import * as Json from '@craigmiller160/ts-functions/Json';
import * as Sleep from '@craigmiller160/ts-functions/Sleep';
import { pipe } from 'fp-ts/function';
import * as TaskEither from 'fp-ts/TaskEither';
import { TaskT } from '@craigmiller160/ts-functions/types';
import * as Option from 'fp-ts/Option';

const TODOS_KEY = 'SolidJS_Todos';

const sleep2Sec = Sleep.sleep(2000);

const setInLocalStorage = (json: string): string => {
	localStorage.setItem(TODOS_KEY, json);
	return json;
};

const getFromLocalStorage = (): string =>
	pipe(
		localStorage.getItem(TODOS_KEY),
		Option.fromNullable,
		Option.getOrElse(() => '[]')
	);

export const persistTodos = (
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
