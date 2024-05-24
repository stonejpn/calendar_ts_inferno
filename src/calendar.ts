const app_root = document.getElementById('app-root');
if (app_root !== null) {
    const elem= document.createElement('div');
    elem.textContent = 'Hello World from calendar.ts';

    app_root.appendChild(elem);
}
