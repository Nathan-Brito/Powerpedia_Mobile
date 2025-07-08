import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useFavoritos } from '../context/FavoritosContext';

interface PericiaProps {
  pericias: {
    id: number;
    titulo: string;
    descricao: string;
  };
}

export default function Pericias({ pericias }: PericiaProps) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const isFavorito = favoritos.some(
    (fav) => fav.item.titulo === pericias.titulo
  );

  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: '#fdbe00',
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
        <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{pericias.titulo}</Text>

        <TouchableOpacity onPress={() => toggleFavorito(pericias, 'Pericia')}>
          <Text style={{ fontSize: 24, color: 'black' }}>
            {isFavorito ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <RenderHtml
        contentWidth={width}
        source={{ html: pericias.descricao }}
        tagsStyles={{
          p: { color: 'black', fontSize: 16, marginBottom: 6 },
          b: { fontWeight: 'bold', color: 'black' },
          i: { fontStyle: 'italic', color: 'black' },
          br: { height: 10 },
        }}
      />
    </View>
  );
}
