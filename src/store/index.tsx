import { FC, ReactElement, ReactNode, createContext, useContext } from 'react';
import { RootStore } from './RootStore';

export const StoreContext = createContext<RootStore>({} as RootStore)

export type StoreComponent = FC<{
  store: RootStore;
  children: ReactNode;
}>

export const StoreProvider: StoreComponent = ({
  children,
  store
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>
      { children }
    </StoreContext.Provider>
  )
}

export const initializeStore = () => {
  const rootStore = new RootStore()
  return rootStore
}

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider')
  }

  return store
}