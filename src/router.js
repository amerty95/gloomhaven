import { store } from './store.js';

const routes = {};

export function registerRoute(path, component) {
    routes[path] = component;
}

export function navigate(path) {
    window.location.hash = path;
}

export function initRouter(containerId) {
    const container = document.getElementById(containerId);

    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const component = routes[hash] || routes['home'];

        if (component) {
            container.innerHTML = '';
            const view = component();
            if (view instanceof Node) {
                container.appendChild(view);
            } else if (typeof view === 'string') {
                container.innerHTML = view;
            }
        }
    }

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);

    // Initial load
    handleRoute();
}
