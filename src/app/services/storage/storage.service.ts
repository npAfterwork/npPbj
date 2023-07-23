import {inject, Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable({providedIn: 'root'})
export class StorageService {
  private storage = inject(Storage);
  private _storage: Storage | null = null;

  private t = Math.random();

  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  public async get<T = any>(key: string, value: T) {
    return (await this._storage?.get(key) as T) ?? value;
  }

  async initialize() {
    this._storage = await this.storage.create();
  }

  dump() {
    console.log(this._storage);
  }
}
