import { render } from 'solid-js/web';
import { App } from './components/App';

const rootDiv = document.getElementById('root');
if (!rootDiv) {
	throw new Error('Unable to find root div');
}

const dispose = render(() => <App />, rootDiv);
if (import.meta.hot) {
	import.meta.hot.dispose(dispose);
}
