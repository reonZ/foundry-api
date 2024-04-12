"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderApplication = exports.canRender = exports.refreshApplication = exports.openApplication = void 0;
function openApplication(constructor, ...args) {
    const id = args.at(-1).id;
    const app = Object.values(ui.windows).find((a) => a instanceof constructor && a.id === id);
    if (app) {
        app.bringToTop();
        return app;
    }
    return new constructor(...args).render(true);
}
exports.openApplication = openApplication;
function refreshApplication(app) {
    app.setPosition({ height: "auto" });
}
exports.refreshApplication = refreshApplication;
function canRender(app, force) {
    return force || app._state <= Application.RENDER_STATES.NONE;
}
exports.canRender = canRender;
function renderApplication(id) {
    const app = Object.values(ui.windows).find((app) => app.id === id);
    app?.render();
}
exports.renderApplication = renderApplication;
