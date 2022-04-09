import {Pbj} from './model';

export class UnsupportedItemType extends Error {
  constructor(type: Pbj.ItemType) {
    super(`unsupported type: ${type}`);
  }
}

export class UnsupportedIndexType extends Error {
  constructor(type: Pbj.IndexType) {
    super(`unsupported index: ${type}`);
  }
}
