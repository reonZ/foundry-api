export function htmlElement(el: HTMLElement | JQuery) {
    return el instanceof HTMLElement ? el : el[0];
}

export function isCheckboxElement(el: Element): el is HTMLInputElement {
    return el instanceof HTMLInputElement && el.type === "checkbox";
}

export function createHTMLFromString<T extends Element | HTMLCollection>(content: string) {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;

    const children = tmp.children;
    return (children.length > 1 ? children : children[0]) as T;
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

function insertHTMLFromString<T extends Element | HTMLCollection>(
    parent: Element,
    content: string,
    prepend = false
) {
    const children = createHTMLFromString<T>(content);
    applyHtmlMethod(prepend ? parent.prepend : parent.append, children, parent);
    return children;
}

export function appendHTMLFromString<T extends Element | HTMLCollection>(
    parent: Element,
    content: string
) {
    return insertHTMLFromString<T>(parent, content, false);
}

export function beforeHTMLFromString<T extends Element | HTMLCollection>(
    element: Element,
    content: string
) {
    const children = createHTMLFromString<T>(content);
    applyHtmlMethod(element.before, children, element);
    return children;
}

type ListenerCallback<E extends Element = HTMLElement> = (event: Event, element: E) => void;

export function addListener<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    event: string,
    listener: ListenerCallback<E>
): E | undefined;
export function addListener<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    listener: ListenerCallback<E>
): E | undefined;
export function addListener<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    arg1: string | ListenerCallback<E>,
    arg2?: ListenerCallback<E>
): E | undefined {
    const element = parent.querySelector<E>(selector);
    if (!element) {
        return;
    }

    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2!;

    element.addEventListener(event, (e: Event) => listener(e, element));

    return element;
}

export function addListenerAll<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    event: string,
    listener: ListenerCallback<E>
): NodeListOf<E> | undefined;
export function addListenerAll<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    listener: ListenerCallback<E>
): NodeListOf<E> | undefined;
export function addListenerAll<E extends Element = HTMLElement>(
    parent: Element,
    selector: string,
    arg1: string | ListenerCallback<E>,
    arg2?: ListenerCallback<E>
): NodeListOf<E> | undefined {
    const elements = parent.querySelectorAll<E>(selector);
    const event = typeof arg1 === "string" ? arg1 : "click";
    const listener = typeof arg1 === "function" ? arg1 : arg2!;

    for (const element of elements) {
        element.addEventListener(event, (e) => listener(e, element));
    }

    return elements;
}

export function querySelector<E extends Element = HTMLElement>(parent: Element, selector: string) {
    return parent.querySelector<E>(selector)!;
}

export function querySelectorArray<E extends Element = HTMLElement>(
    parent: Element,
    selector: string
) {
    return Array.from(parent.querySelectorAll<E>(selector));
}

export function findInElementArray<E extends Element = HTMLElement>(
    arr: E[],
    fn: (el: E) => boolean
) {
    return arr.find((el) => fn(el))!;
}

export function closest<E extends Element = HTMLElement>(el: Element, selector: string) {
    return el.closest<E>(selector)!;
}

export function parentElement<E extends HTMLElement = HTMLElement>(el: Element) {
    return el.parentElement as E;
}
