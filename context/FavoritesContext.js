
import {
  createContext,
  useContext,
  useState,
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (event) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === event.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.id !== event.id
        );
      }

      return [...currentFavorites, event];
    });
  };

  const isFavorite = (eventId) => {
    return favorites.some(
      (item) => item.id === eventId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
