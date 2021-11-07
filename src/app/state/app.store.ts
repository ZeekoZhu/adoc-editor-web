import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AppState {
    content: string;
}

export function createInitialState(): AppState {
    return {
        content: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {

    constructor() {
        super(createInitialState());
    }

}
