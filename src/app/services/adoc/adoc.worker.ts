/// <reference lib="webworker" />
importScripts('/assets/asciidoctor.min.js');
import { AdocConverter } from './adoc-converter';
// @ts-ignore
const converter = new AdocConverter(Asciidoctor());

addEventListener('message', ({ data }) => {
    const { id, request } = data;
    const result = converter.convert(request);
    postMessage({ id, response: result });
});
