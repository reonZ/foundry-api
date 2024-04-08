type EventType = keyof HTMLElementEventMap;

function htmlElement(el: HTMLElement | JQuery) {
    return el instanceof HTMLElement ? el : el[0];
}

function isCheckboxElement(el: Element): el is HTMLInputElement {
    return el instanceof HTMLInputElement && el.type === "checkbox";
}

function createHTMLFromString<T extends Element = HTMLElement>(content: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;

    const children = tmp.children;
    return children.length > 1 ? tmp : (children[0] as T);
}

function applyHtmlMethod(
    fn: (el: Element) => void,
    children: Element | HTMLCollection,
    context: Element
) {
    const fnc = context ? fn.bind(context) : fn;

    if (children instanceof HTMLCollection) {
        for (const child of children) {
            fnc(child);
        }
    } else {
        fnc(children);
    }
}

function insertHTMLFromString<T extends Element = HTMLElement>(
    parent: Element,
    content: string,
    prepend = false
) {
    const children = createHTMLFromString<T>(content);
    applyHtmlMethod(prepend ? parent.prepend : parent.append, children, parent);
    return children;
}

function appendHTMLFromString<T extends Element = HTMLElement>(parent: Element, content: string) {
    return insertHTMLFromString<T>(parent, content, false);
}

function beforeHTMLFromString<T extends Element = HTMLElement>(element: Element, content: string) {
    const children = createHTMLFromString<T>(content);
    applyHtmlMethod(element.before, children, element);
    return children;
}

type ListenerCallback<TElement extends HTMLElement, TEvent extends EventType> = (
    event: HTMLElementEventMap[TEvent],
    element: TElement
) => void;

function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    event: TEvent,
    listener: ListenerCallback<TElement, TEvent>
): TElement | undefined;
function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    listener: ListenerCallback<TElement, TEvent>
): TElement | undefined;
function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(
    parent: Element,
    selector: string,
    arg1: TEvent | ListenerCallback<TElement, TEvent>,
    arg2?: ListenerCallback<TElement, TEvent>
): TElement | undefined {
    const element = parent.querySelector<TElement>(selector);
    if (!element) return;

    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2!;

    element.addEventListener(event, (e) => listener(e as HTMLElementEventMap[TEvent], element));

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

function querySelector<E extends Element = HTMLElement>(parent: Element, selector: string) {
    return parent.querySelector<E>(selector)!;
}

function querySelectorArray<E extends Element = HTMLElement>(parent: Element, selector: string) {
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

function closest<E extends Element = HTMLElement>(el: Element, selector: string) {
    return el.closest<E>(selector)!;
}

function parentElement<E extends HTMLElement = HTMLElement>(el: Element) {
    return el.parentElement as E;
}

function elementData<T extends Record<string, string>>(el: HTMLElement) {
    return el.dataset as T;
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

export type { DataToDatasetStringType };
export {
    htmlElement,
    isCheckboxElement,
    createHTMLFromString,
    appendHTMLFromString,
    beforeHTMLFromString,
    addListener,
    addListenerAll,
    querySelector,
    querySelectorArray,
    queryInClosest,
    closest,
    parentElement,
    elementData,
    dataToDatasetString,
};
