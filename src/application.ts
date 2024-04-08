function openApplication<TApplication extends Application>(
    constructor: ConstructorOf<TApplication>,
    ...args: [...any[], options: ApplicationOptions]
): TApplication {
    const id = args.at(-1).id;
    const app = Object.values(ui.windows).find((a) => a instanceof constructor && a.id === id);

    if (app) {
        app.bringToTop();
        return app as TApplication;
    }

    return new constructor(...args).render(true);
}

function refreshApplication(app: Application) {
    app.setPosition({ height: "auto" });
}

function canRender(app: Application, force?: boolean) {
    return force || app._state <= Application.RENDER_STATES.NONE;
}

function renderApplication(id: string) {
    const app = Object.values(ui.windows).find((app) => app.id === id);
    app?.render();
}

export { openApplication, refreshApplication, canRender, renderApplication };
