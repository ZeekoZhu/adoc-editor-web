/// <reference lib="webworker" />
importScripts('/assets/asciidoctor.min.js');
import { AdocConverter } from './adoc-converter';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const converter = new AdocConverter(new Asciidoctor());

addEventListener('message', ({ data }) => {
    const { id, request } = data;
    const result = converter.convert(request);
    postMessage({ id, response: result });
});
