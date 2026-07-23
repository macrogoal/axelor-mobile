/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Platform} from 'react-native';

interface InternalStorage {
  set(key: string, value: any): void;
  getString(key: string): string | undefined;
  contains(key: string): boolean;
  clearAll(): void;
  getAllKeys(): string[];
  delete(key: string): void;
}

class MMKVStorage implements InternalStorage {
  private mmkv: any;

  constructor() {
    try {
      const {MMKV} = require('react-native-mmkv');
      this.mmkv = new MMKV();
    } catch {
      throw new Error(
        'MMKVStorage: react-native-mmkv is not available on this platform',
      );
    }
  }

  set(key: string, value: any): void {
    this.mmkv.set(key, value);
  }

  getString(key: string): string | undefined {
    return this.mmkv.getString(key);
  }

  contains(key: string): boolean {
    return this.mmkv.contains(key);
  }

  clearAll(): void {
    this.mmkv.clearAll();
  }

  getAllKeys(): string[] {
    return this.mmkv.getAllKeys();
  }

  delete(key: string): void {
    this.mmkv.delete(key);
  }
}

class HarmonyOSStorage implements InternalStorage {
  private cache: Map<string, string> = new Map();
  private filePath: string;
  private initPromise: Promise<void>;

  constructor() {
    const RNFS = require('react-native-fs');
    this.filePath = `${RNFS.CachesDirectoryPath}/harmony_storage.json`;
    this.initPromise = this.load(RNFS);
  }

  private async load(RNFS: any): Promise<void> {
    try {
      const exists = await RNFS.exists(this.filePath);
      if (exists) {
        const data = await RNFS.readFile(this.filePath, 'utf8');
        const parsed = JSON.parse(data);
        for (const [key, value] of Object.entries(parsed)) {
          this.cache.set(key, value as string);
        }
      }
    } catch (e) {
      console.warn('HarmonyOSStorage: load failed', e);
    }
  }

  private async persist(): Promise<void> {
    await this.initPromise;
    try {
      const RNFS = require('react-native-fs');
      const obj: Record<string, string> = {};
      this.cache.forEach((v, k) => { obj[k] = v; });
      await RNFS.writeFile(this.filePath, JSON.stringify(obj), 'utf8');
    } catch (e) {
      console.warn('HarmonyOSStorage: persist failed', e);
    }
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
    this.persist();
  }

  getString(key: string): string | undefined {
    return this.cache.get(key);
  }

  contains(key: string): boolean {
    return this.cache.has(key);
  }

  clearAll(): void {
    this.cache.clear();
    this.persist();
  }

  getAllKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  delete(key: string): void {
    this.cache.delete(key);
    this.persist();
  }
}

function createStorage(): InternalStorage {
  if (Platform.OS === 'harmony') {
    return new HarmonyOSStorage();
  }
  return new MMKVStorage();
}

export class Storage {
  constructor(private storage: InternalStorage) {}

  contains(key: string): boolean {
    return this.storage.contains(key);
  }

  setItem(key: string, value: any) {
    if (value instanceof Object || value instanceof Array) {
      this.storage.set(key, JSON.stringify(value));
    } else {
      this.storage.set(key, value);
    }
  }

  getItem(key: string) {
    const strItem = this.storage.getString(key);
    try {
      const item = JSON.parse(strItem);
      return item;
    } catch {
      return strItem;
    }
  }

  getAllKeys() {
    return this.storage.getAllKeys();
  }

  clearAll() {
    this.storage.clearAll();
  }

  deleteItem(key: string) {
    this.storage.delete(key);
  }
}

export const storage = new Storage(createStorage());

export function useStorage() {
  return storage;
}
