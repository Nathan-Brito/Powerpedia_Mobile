import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFavoritos } from '../context/FavoritosContext';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

interface ArquetipoProps {
  arquetipos: {
    id: number;
    titulo: string;
    descricao: string;
    custo: string;
  };
}

export default function Arquetipos({ arquetipos }: ArquetipoProps) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const isFavorito = favoritos.some(
    (fav) => fav.item.titulo === arquetipos.titulo
  );

  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: '#fd00ac',
        margin: 8,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>{arquetipos.titulo}</Text>

        <TouchableOpacity
          onPress={() => toggleFavorito(arquetipos, 'Arquetipo')}
        >
          <Text style={{ fontSize: 24, color: 'white' }}>
            {isFavorito ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>
        {arquetipos.custo}
      </Text>

      <RenderHtml
        contentWidth={width}
        source={{ html: arquetipos.descricao }}
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
