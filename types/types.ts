import { NAVIGATION_TABS } from '@utils';
import { PropsWithChildren } from 'react';
import { NativeEventSubscription } from 'react-native';

export type BaseStatus = 'loading' | 'success' | 'failure';
export type Status = 'initial-loading' | BaseStatus | undefined;

export type AuthenticateType = 'apple' | 'google' | 'email';

// Forgot where the source was, a good example though
// and a good use case
export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
type ElementOf<T> = T extends (infer E)[]
  ? E
  : T extends readonly (infer E)[]
  ? E
  : never;
type AsFunctionWithArgsOf<T extends unknown[] | readonly unknown[]> = (
  ...args: T
) => any;
type TailArgs<K> = K extends (x: any, ...args: infer T) => any ? T : never;
type Tail<T extends unknown[] | readonly unknown[]> = TailArgs<
  AsFunctionWithArgsOf<T>
>;
type AsDescendingLengths<T extends unknown[] | readonly unknown[]> =
  [] extends T
    ? [0]
    : [ElementOf<ElementOf<AsDescendingLengths<Tail<T>>[]>>, T['length']];
export type IndicesOf<T extends unknown[] | readonly unknown[]> =
  number extends T['length']
    ? number
    : [] extends T
    ? never
    : ElementOf<AsDescendingLengths<Tail<T>>>;

export type AnalyticsType = 'amplitude' | 'firebase';

export type ThemeType = 'light' | 'dark';

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type Listener = NativeEventSubscription | any;

export type FunctionalComponent<ComponentProps = unknown> = React.FC<
  PropsWithChildren<ComponentProps>
>;

export type NavigationType = 'rebrand';

export type NavigationTabType = (typeof NAVIGATION_TABS)[number];

export type PaywallLocationType =
  | 'setup'
  | 'settings'
  | 'other'
  | 'lives-drawer-blocking'
  | 'lives-drawer-info';
