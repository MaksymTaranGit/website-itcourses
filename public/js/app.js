import { Router } from './lib/Router.js';

class App {
    constructor() {
        this.router = new Router();
    }

    init() {
        console.log('SPA App initialized with Router');
    }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});