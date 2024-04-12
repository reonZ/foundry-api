declare function openApplication<TApplication extends Application>(constructor: ConstructorOf<TApplication>, ...args: [...any[], options: ApplicationOptions]): TApplication;
declare function refreshApplication(app: Application): void;
declare function canRender(app: Application, force?: boolean): boolean;
declare function renderApplication(id: string): void;
export { openApplication, refreshApplication, canRender, renderApplication };
