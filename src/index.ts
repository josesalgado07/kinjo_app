import { App } from './config/app';

async function main() {
    const app = new App(3000);
    app.start();
}

main();
