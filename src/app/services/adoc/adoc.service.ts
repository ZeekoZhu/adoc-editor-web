import { Injectable } from '@angular/core';
import { AdocConverter } from './adoc-converter';

import asciidoctor from 'asciidoctor';

@Injectable({
    providedIn: 'root',
})
export class AdocService {
    private converter = new AdocConverter(asciidoctor());
    private readonly worker: Worker;
    private msgId = 0;
    private tasks = new Map<number, (value: any) => void>();

    constructor() {
        const tasks = this.tasks;
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker('./adoc.worker', { type: 'module' });
            this.worker.onmessage = ({ data }) => {
                const { id, response } = data;
                tasks.get(id)(response);
                tasks.delete(id);
            };

        }
    }

    convert(content: string) {
        if (this.worker) {
            const id = this.msgId++;
            this.worker.postMessage({ id, request: content });
            return new Promise<string>((resolve => {
                this.tasks.set(id, resolve);
            }));
        } else {
            return Promise.resolve(this.converter.convert(content));
        }

    }
}

