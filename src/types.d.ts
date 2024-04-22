declare module 'js-storage' {
  interface IstorageGet {
    <T>(key: string | string[]): T;
  }
  interface IstorageSet {
    (key: string, value: any): any;
  }
  interface IstorageSet {
    (obj: Record<string, any>): any;
  }

  interface IStorage {
    set: IstorageSet;
    get: IstorageGet;
  }

  export const sessionStorage: IStorage;
  export const localStorage: IStorage;
}

declare type AccessType = string | string[] | boolean | undefined;

declare interface TlLvlItem {
  lvl: string;
  lang: string;
  access?: AccessType;
  sub: (TlLvlItem | TlFieldItem)[];
}

declare interface TlFieldItem {
  name: string;
  lang: string;
  tip?: string;
  access?: AccessType;
  el: string;
  opts?: Array<{ v: string; t?: string; s?: string; access?: AccessType }>;
}

declare type AnyKey = string | symbol | number;

declare const _STAMP_: string;
