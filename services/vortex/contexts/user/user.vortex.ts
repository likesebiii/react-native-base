import {
  UserVortexActions,
  UserVortexActionsType,
} from './user.vortex.actions';
import {
  UserVortexSelectors,
  UserVortexSelectorsType,
} from './user.vortex.selectors';
import {
  UserVortexBlacklist,
  UserVortexInitial,
  UserVortexType,
} from './user.vortex.state';

export type UserVortexMapperContextType = {
  type: UserVortexType;
  selectors: UserVortexSelectorsType;
  actions: UserVortexActionsType;
};

type UserVortexContextType = {
  initial: UserVortexMapperContextType['type'];
  blacklist: (keyof UserVortexMapperContextType['type'])[];
  selectors: UserVortexMapperContextType['selectors'];
  actions: UserVortexMapperContextType['actions'];
};

export const UserVortexContext: UserVortexContextType = {
  initial: UserVortexInitial,
  blacklist: UserVortexBlacklist,
  selectors: UserVortexSelectors,
  actions: UserVortexActions,
};
