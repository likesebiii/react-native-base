import {
  UserVortexContext,
  UserVortexMapperContextType,
} from './user/user.vortex';

export type VortexContextPropsMapper = {
  'user-vortex': UserVortexMapperContextType;
};
export type VortexContextType = keyof VortexContextPropsMapper;

export const VortexContexts: {
  [K in VortexContextType]: {
    initial: VortexContextPropsMapper[K]['type'];
    blacklist: (keyof VortexContextPropsMapper[K]['type'])[];
    selectors: VortexContextPropsMapper[K]['selectors'];
    actions: VortexContextPropsMapper[K]['actions'];
  };
} = {
  'user-vortex': UserVortexContext,
};
