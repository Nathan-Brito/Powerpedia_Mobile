import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { fetchTabela } from '../lib/api';
import Arquetipos from '../components/Arquetipos';

export default function PagArquetipos() {
  const [arquetipos, setArquetipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabela('arquetipos')
      .then(setArquetipos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#fd00ac" />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 20 }}
      data={arquetipos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Arquetipos arquetipos={item} />}
    />
  );
}
