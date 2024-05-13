/// <reference types="jquery" />
/// <reference types="jquery" />
type EventType = keyof HTMLElementEventMap;
declare function htmlElement(el: HTMLElement | JQuery): HTMLElement;
declare function isCheckboxElement(el: Element): el is HTMLInputElement;
declare function createHTMLFromString<T extends Element = HTMLElement>(content: string, wrap?: boolean): T;
declare function appendHTMLFromString<T extends Element = HTMLElement>(parent: Element, content: string): T;
declare function prependHTMLFromString<T extends Element = HTMLElement>(parent: Element, content: string): T;
declare function beforeHTMLFromString<T extends Element = HTMLElement>(element: Element, content: string): T;
declare function afterHTMLFromString<T extends Element = HTMLElement>(element: Element, content: string): T;
type ListenerCallback<TElement extends HTMLElement, TEvent extends EventType> = (event: HTMLElementEventMap[TEvent], element: TElement) => void;
declare function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(parent: Element, selector: string, event: TEvent, listener: ListenerCallback<TElement, TEvent>, useCapture?: boolean): TElement | undefined;
declare function addListener<TElement extends HTMLElement, TEvent extends EventType = "click">(parent: Element, selector: string, listener: ListenerCallback<TElement, TEvent>, useCapture?: boolean): TElement | undefined;
declare function addListenerAll<TElement extends HTMLElement, TEvent extends EventType = "click">(parent: Element, selector: string, event: TEvent, listener: ListenerCallback<TElement, TEvent>): NodeListOf<TElement> | undefined;
declare function addListenerAll<TElement extends HTMLElement, TEvent extends EventType = "click">(parent: Element, selector: string, listener: ListenerCallback<TElement, TEvent>): NodeListOf<TElement> | undefined;
declare function querySelector<E extends Element = HTMLElement>(parent: Element | null, selector: string): E | null;
declare function querySelectorArray<E extends Element = HTMLElement>(parent: Element, selector: string): E[];
declare function queryInClosest<E extends Element = HTMLElement>(el: Element, parentSelector: string, childSelector: string): E | null;
declare function queryInParent<E extends Element = HTMLElement>(el: Element, childSelector: string): E | null;
declare function closest<E extends Element = HTMLElement>(el: Element | null, selector: string): E | null;
declare function parentElement<E extends HTMLElement = HTMLElement>(el: Element): E | null;
declare function elementData<T extends Record<string, string>>(el: Element): T;
type DataToDatasetStringType<TKey extends string = string> = Partial<Record<TKey, string | number | boolean | object>>;
declare function dataToDatasetString<TKey extends string>(data: DataToDatasetStringType<TKey>): string;
export type { DataToDatasetStringType };
export { addListener, addListenerAll, afterHTMLFromString, appendHTMLFromString, beforeHTMLFromString, closest, createHTMLFromString, dataToDatasetString, elementData, htmlElement, isCheckboxElement, parentElement, prependHTMLFromString, querySelector, querySelectorArray, queryInClosest, queryInParent, };
