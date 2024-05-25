type EventType = keyof HTMLElementEventMap;

function htmlElement(el: HTMLElement | JQuery) {
    return el instanceof HTMLElement ? el : el[0];
}

function isCheckboxElement(el: Element): el is HTMLInputElement {
    return el instanceof HTMLInputElement && el.type === "checkbox";
}

function createHTMLFromString<T extends HTMLElement>(content: string, wrap = true) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;

    const children = tmp.children;
    return (children.length === 1 ? children[0] : wrap ? tmp : children) as T;
}

function applyHtmlMethod(
    fn: (...el: Element[]) => void,
    children: Element | HTMLCollection,
    context: Element
) {
    const fnc = context ? fn.bind(context) : fn;

    if (children instanceof HTMLCollection) {
        fnc(...children);
    } else {
        fnc(children);
    }
}

function insertHTMLFromString<T extends HTMLElement>(
    parent: Element | null,
    content: string,
    prepend = false
) {
    if (!parent) return;

    const html = createHTMLFromString<T>(content, false);
    applyHtmlMethod(prepend ? parent.prepend : parent.append, html, parent);

    return html;
}

function appendHTMLFromString<T extends HTMLElement>(parent: Element | null, content: string) {
    return insertHTMLFromString<T>(parent, content, false);
}

function prependHTMLFromString<T extends HTMLElement>(parent: Element | null, content: string) {
    return insertHTMLFromString<T>(parent, content, true);
}

function beforeHTMLFromString<T extends HTMLElement>(element: Element | null, content: string) {
    if (!element) return;

    const html = createHTMLFromString<T>(content, false);
    applyHtmlMethod(element.before, html, element);

    return html;
}

function afterHTMLFromString<T extends HTMLElement>(element: Element | null, content: string) {
    if (!element) return;

    const html = createHTMLFromString<T>(content, false);
    applyHtmlMethod(element.after, html, element);

    return html;
}

type ListenerCallback<TElement extends HTMLElement, TEvent extends EventType> = (
    event: HTMLElementEventMap[TEvent],
    element: TElement
) => void;

function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    event: TEvent,
    listener: ListenerCallback<TElement, TEvent>,
    useCapture?: boolean
): TElement | undefined;
function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    listener: ListenerCallback<TElement, TEvent>,
    useCapture?: boolean
): TElement | undefined;
function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    arg1: TEvent | ListenerCallback<TElement, TEvent>,
    arg2?: ListenerCallback<TElement, TEvent> | boolean,
    arg3?: boolean
): TElement | undefined {
    const element = parent.querySelector<TElement>(selector);
    if (!element) return;

    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener =
        typeof arg1 === "function" ? arg1 : (arg2 as ListenerCallback<TElement, TEvent>);
    const useCapture = typeof arg2 === "boolean" ? arg2 : arg3;

    element.addEventListener(
        event,
        (e) => listener(e as HTMLElementEventMap[TEvent], element),
        useCapture
    );

    return element;
}

function addListenerAll<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    event: TEvent,
    listener: ListenerCallback<TElement, TEvent>
): NodeListOf<TElement> | undefined;
function addListenerAll<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    listener: ListenerCallback<TElement, TEvent>
): NodeListOf<TElement> | undefined;
function addListenerAll<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    arg1: TEvent | ListenerCallback<TElement, TEvent>,
    arg2?: ListenerCallback<TElement, TEvent>
): NodeListOf<TElement> | undefined {
    const elements = parent.querySelectorAll<TElement>(selector);
    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2!;

    for (const element of elements) {
        element.addEventListener(event, (e) => listener(e as HTMLElementEventMap[TEvent], element));
    }

    return elements;
}

function querySelector<E extends Element = HTMLElement>(parent: Element | null, selector: string) {
    if (!parent) return null;
    return parent.querySelector<E>(selector);
}

function querySelectorArray<E extends Element = HTMLElement>(
    parent: Element | null,
    selector: string
) {
    if (!parent) return [];
    return Array.from(parent.querySelectorAll<E>(selector));
}

function queryInClosest<E extends Element = HTMLElement>(
    el: Element,
    parentSelector: string,
    childSelector: string
) {
    const parent = closest(el, parentSelector);
    return querySelector<E>(parent, childSelector);
}

function queryInParent<E extends Element = HTMLElement>(el: Element, childSelector: string) {
    return querySelector<E>(el.parentElement, childSelector);
}

function closest<E extends Element = HTMLElement>(el: Element | null, selector: string) {
    if (!el) return null;
    return el.closest<E>(selector);
}

function replaceChild(parent: Element | null, selector: string, el: Element | null) {
    if (!parent || !el) return;

    const child = parent.querySelector(selector);
    if (child) {
        child.replaceWith(el);
    }
}

function parentElement<E extends HTMLElement = HTMLElement>(el: Element) {
    return el.parentElement as E | null;
}

function elementData<T extends Record<string, string>>(el: Element) {
    return (el as HTMLElement).dataset as T;
}

type DataToDatasetStringType<TKey extends string = string> = Partial<
    Record<TKey, string | number | boolean | object>
>;

function dataToDatasetString<TKey extends string>(data: DataToDatasetStringType<TKey>) {
    return Object.entries(data)
        .map(([key, value]) => {
            const stringified = typeof value === "object" ? JSON.stringify(value) : value;
            return `data-${key}='${stringified}'`;
        })
        .join(" ");
}

function createGlobalEvent<TEvent extends keyof DocumentEventMap>(
    event: TEvent,
    listener: (this: Document, ev: DocumentEventMap[TEvent]) => any,
    options?: boolean | AddEventListenerOptions
) {
    let enabled = false;

    return {
        activate() {
            if (enabled) return;
            document.addEventListener(event, listener, options);
            enabled = true;
        },
        disable() {
            if (!enabled) return;
            document.removeEventListener(event, listener, options);
            enabled = false;
        },
        toggle(enabled: boolean) {
            if (enabled) this.activate();
            else this.disable();
        },
    };
}

export type { DataToDatasetStringType };
export {
    addListener,
    addListenerAll,
    afterHTMLFromString,
    appendHTMLFromString,
    beforeHTMLFromString,
    closest,
    createGlobalEvent,
    createHTMLFromString,
    dataToDatasetString,
    elementData,
    htmlElement,
    isCheckboxElement,
    parentElement,
    prependHTMLFromString,
    querySelector,
    querySelectorArray,
    queryInClosest,
    queryInParent,
    replaceChild,
};
