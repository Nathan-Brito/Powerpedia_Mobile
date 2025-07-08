import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import { fetchTabela } from '../lib/api';
import Vantagens from '../components/Vantagens';

export default function PagVantagens() {
  const [vantagens, setVantagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTabela('vantagens')
      .then(setVantagens)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#00fd90" />;

  return (
    <FlatList
      contentContainerStyle={{ padding: 20, gap: 20 }}
      data={vantagens}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Vantagens vantagens={item} />}
    />
  );
}
