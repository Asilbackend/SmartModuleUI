import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { getAllModules } from 'src/api/modules.api';

export const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['module'],
    queryFn: async () => {
      const response = await getAllModules();
      return response.data.content || [];
    },
  });

  return (
    <ModuleContext.Provider value={{ module: data, isPending, error }}>
      {children}
    </ModuleContext.Provider>
  );
};
