import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useFavoritos } from '../context/FavoritosContext';

interface DesvantagensProps {
  desvantagens: {
    id: number;
    titulo: string;
    descricao: string;
    ganho: string;
  };
}

export default function Desvantagens({ desvantagens }: DesvantagensProps) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const isFavorito = favoritos.some(
    (fav) => fav.item.titulo === desvantagens.titulo
  );

  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: '#fd0046',
        margin: 8,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>{desvantagens.titulo}</Text>

        <TouchableOpacity onPress={() => toggleFavorito(desvantagens, 'Desvantagem')}>
          <Text style={{ fontSize: 24, color: 'white' }}>
            {isFavorito ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>
        {desvantagens.ganho}
      </Text>

      <RenderHtml
        contentWidth={width}
        source={{ html: desvantagens.descricao }}
        tagsStyles={{
          p: { color: 'white', fontSize: 16, marginBottom: 6 },
          b: { fontWeight: 'bold', color: 'white' },
          i: { fontStyle: 'italic', color: 'white' },
          br: { height: 10 },
        }}
      />
    </View>
  );
}
