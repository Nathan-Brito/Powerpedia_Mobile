import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useFavoritos } from '../context/FavoritosContext';

import Pericias from '../components/Pericias';
import Vantagens from '../components/Vantagens';
import Desvantagens from '../components/Desvantagens';
import Arquetipos from '../components/Arquetipos';

export default function PagFavoritos() {
  const { favoritos } = useFavoritos();

  const getFavoritosPorCategoria = (categoria: string) =>
    [...favoritos]
      .filter((fav) => fav.categoria === categoria)
      .sort((a, b) => a.item.id - b.item.id);

  const pericias = getFavoritosPorCategoria('Pericia');
  const vantagens = getFavoritosPorCategoria('Vantagem');
  const desvantagens = getFavoritosPorCategoria('Desvantagem');
  const arquetipos = getFavoritosPorCategoria('Arquetipo');

  return (
    <ScrollView
      style={{ paddingHorizontal: 20, paddingVertical: 24 }}
      contentContainerStyle={{ gap: 32 }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ff853b' }}>
        Favoritos
      </Text>

      {pericias.length > 0 && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fdbe00' }}>Perícias</Text>
          {pericias.map((fav) => (
            <Pericias key={`pericia-${fav.item.id}`} pericias={fav.item} />
          ))}
        </View>
      )}

      {vantagens.length > 0 && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#00fd90' }}>Vantagens</Text>
          {vantagens.map((fav) => (
            <Vantagens key={`vantagem-${fav.item.id}`} vantagens={fav.item} />
          ))}
        </View>
      )}

      {desvantagens.length > 0 && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fd0046' }}>Desvantagens</Text>
          {desvantagens.map((fav) => (
            <Desvantagens key={`desvantagem-${fav.item.id}`} desvantagens={fav.item} />
          ))}
        </View>
      )}

      {arquetipos.length > 0 && (
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fd00ac' }}>Arquétipos</Text>
          {arquetipos.map((fav) => (
            <Arquetipos key={`arquetipo-${fav.item.id}`} arquetipos={fav.item} />
          ))}
        </View>
      )}

      {favoritos.length === 0 && (
        <Text style={{ fontSize: 22, color: '#ff853b', marginTop: 20 }}>
          Nenhum favorito ainda...
        </Text>
      )}
    </ScrollView>
  );
}
