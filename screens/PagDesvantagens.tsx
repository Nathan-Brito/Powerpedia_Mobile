import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { fetchTabela } from '../lib/api';
import Desvantagens from '../components/Desvantagens';

export default function PagDesvantagens() {
  const [desvantagens, setDesvantagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabela('desvantagens')
      .then(setDesvantagens)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#fd0046" />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 20 }}
      data={desvantagens}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Desvantagens desvantagens={item} />}
    />
  );
}
