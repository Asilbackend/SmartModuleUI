import { useContext } from 'react';
import { ModuleContext } from 'src/context/ModuleContext';

export const useModule = () => {
  return useContext(ModuleContext);
};
