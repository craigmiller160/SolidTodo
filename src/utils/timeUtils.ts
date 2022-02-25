import * as Time from '@craigmiller160/ts-functions/Time';
import { pipe } from 'fp-ts/function';

const TIMESTAMP_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
const DISPLAY_FORMAT = 'MMM dd, yyyy hh:mm a';

const parseTimestamp = Time.parse(TIMESTAMP_FORMAT);
const formatDisplay = Time.format(DISPLAY_FORMAT);
const formatTimestamp = Time.format(TIMESTAMP_FORMAT);

export const formatTimestampForDisplay = (timestamp: string): string =>
	pipe(parseTimestamp(timestamp), formatDisplay);

export const getCurrentTimestamp = (): string => formatTimestamp(new Date());
