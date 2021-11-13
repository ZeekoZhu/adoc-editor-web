import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdocAsyncConverterService {
    private readonly worker: Worker;
    private msgId = 0;
    private tasks = new Map<number, (value: any) => void>();

    constructor() {
        const tasks = this.tasks;
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(new URL('./adoc.worker', import.meta.url));
            this.worker.onmessage = ({ data }) => {
                const { id, response } = data;
                tasks.get(id)?.(response);
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
            throw new Error('Web workers are not supported in this environment.');
        }

    }
}

