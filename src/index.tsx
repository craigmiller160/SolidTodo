import { render } from 'solid-js/web';

const Hello = () => (
    <h1>Hello World</h1>
)

const dispose = render(() => <Hello />, document.getElementById('root')!);
if (import.meta.hot) {
    import.meta.hot.dispose(dispose);
}