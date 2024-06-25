import { IndicesOf } from '@types';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const MMKVStorageHelper = {
  delete: [],
  keys: [
    { key: 'screen_height', type: Number() },
    // Advertising
    { key: 'track_idfa', type: String() },
    { key: 'track_aaid', type: String() },
    // These should stay here
    // to avoid any typescript error
    { key: 'test0', type: Number() },
    { key: 'test1', type: Boolean() },
    { key: 'test2', type: String() },
  ],
} as const;

type MMKVStorageKeysType = (typeof MMKVStorageHelper.keys)[number]['key'];
type StorageValuesType = (typeof MMKVStorageHelper.keys)[number]['type'];

type StorageKeysIndices = IndicesOf<typeof MMKVStorageHelper.keys>;
type StorageKeysValueTypeMapper = {
  [KType in StorageKeysIndices as (typeof MMKVStorageHelper.keys)[KType]['key']]: (typeof MMKVStorageHelper.keys)[KType]['type'];
};

const MMKVStorage = {
  getValues: () => {
    return MMKVStorageHelper.keys.reduce((acc, curr) => {
      const key = curr.key as MMKVStorageKeysType;
      const value = curr.type;

      acc[key] = value;

      return acc;
    }, {} as Record<MMKVStorageKeysType, StorageValuesType>);
  },
  setValue: <T extends MMKVStorageKeysType>(
    key: T,
    value?: StorageKeysValueTypeMapper[T],
  ) => {
    if (value === undefined) {
      storage.delete(key);
    } else {
      storage.set(key, value);
    }
  },
  getValue: <T extends MMKVStorageKeysType>(
    key: T,
  ): StorageKeysValueTypeMapper[T] | undefined => {
    const type = MMKVStorage.getValues()[key];

    switch (typeof type) {
      case 'number':
        return storage.getNumber(key) as StorageKeysValueTypeMapper[T];
      case 'boolean':
        return storage.getBoolean(key) as StorageKeysValueTypeMapper[T];
      case 'string':
      default:
        return storage.getString(key) as StorageKeysValueTypeMapper[T];
    }
  },
  clear: () => {
    MMKVStorageHelper.delete.forEach((key) => {
      if (Object.keys(MMKVStorage.getValues()).includes(key)) {
        MMKVStorage.setValue(key, undefined);
      }
    });
  },
};

export default MMKVStorage;
