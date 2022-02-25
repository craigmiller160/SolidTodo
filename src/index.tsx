import { render } from 'solid-js/web';

const Hello = () => (
    <h1>Hello World</h1>
)

const rootDiv = document.getElementById('root');
if (!rootDiv) {
    throw new Error('Unable to find root div');
}

const dispose = render(() => <Hello />, rootDiv);
if (import.meta.hot) {
    import.meta.hot.dispose(dispose);
}