import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Favorito = {
  item: any;
  categoria: string;
};

type FavoritosContextType = {
  favoritos: Favorito[];
  toggleFavorito: (item: any, categoria: string) => void;
};

const FavoritosContext = createContext<FavoritosContextType>({
  favoritos: [],
  toggleFavorito: () => {},
});

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        if (favoritosSalvos) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    carregarFavoritos();
  }, []);

  
  useEffect(() => {
    const salvarFavoritos = async () => {
      try {
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
      } catch (error) {
        console.error('Erro ao salvar favoritos:', error);
      }
    };

    salvarFavoritos();
  }, [favoritos]);

  const toggleFavorito = (item: any, categoria: string) => {
    setFavoritos((prev) => {
      const existe = prev.some(
        (fav) => fav.item.titulo === item.titulo && fav.categoria === categoria
      );

      const novoFavoritos = existe
        ? prev.filter(
            (fav) => !(fav.item.titulo === item.titulo && fav.categoria === categoria)
          )
        : [...prev, { item, categoria }];

      return novoFavoritos;
    });
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};
