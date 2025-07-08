import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { fetchTabela } from '../lib/api';
import Pericias from '../components/Pericias';

export default function PagPericias() {
  const [pericias, setPericias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabela('pericias')
      .then(setPericias)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#fdbe00" />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 20 }}
      data={pericias}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Pericias pericias={item} />}
    />
  );
}
