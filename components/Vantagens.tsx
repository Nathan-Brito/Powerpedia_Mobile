import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useFavoritos } from '../context/FavoritosContext';

interface VantagemProps {
  vantagens: {
    id: number;
    titulo: string;
    descricao: string;
    custo: string;
  };
}

export default function Vantagens({ vantagens }: VantagemProps) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const isFavorito = favoritos.some(
    (fav) => fav.item.titulo === vantagens.titulo
  );

  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: '#00fd90',
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
        <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{vantagens.titulo}</Text>

        <TouchableOpacity onPress={() => toggleFavorito(vantagens, 'Vantagem')}>
          <Text style={{ fontSize: 24, color: 'black' }}>
            {isFavorito ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'black', fontSize: 18, fontStyle: 'italic' }}>
        {vantagens.custo}
      </Text>

      <RenderHtml
        contentWidth={width}
        source={{ html: vantagens.descricao }}
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
