import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState
} from 'react';

type FavoritesContextType = {
  ids: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addItem: () => {},
  removeItem: () => {}
});

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  return context;
};

const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  function addItem(id: string) {
    setFavorites((prev) => [...prev, id]);
  }

  function removeItem(id: string) {
    setFavorites((prev) => prev.filter((i) => i !== id));
  }

  return (
    <FavoritesContext.Provider value={{ ids: favorites, addItem, removeItem }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
