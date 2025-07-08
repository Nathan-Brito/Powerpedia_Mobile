import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { fetchTabela } from '../lib/api';
import Arquetipos from '../components/Arquetipos';
import Pericias from '../components/Pericias';
import Vantagens from '../components/Vantagens';
import Desvantagens from '../components/Desvantagens';

export default function Home() {
  const [pericias, setPericias] = useState([]);
  const [vantagens, setVantagens] = useState([]);
  const [desvantagens, setDesvantagens] = useState([]);
  const [arquetipos, setArquetipos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const [p, v, d, a] = await Promise.all([
        fetchTabela('pericias'),
        fetchTabela('vantagens'),
        fetchTabela('desvantagens'),
        fetchTabela('arquetipos'),
      ]);
      setPericias(p);
      setVantagens(v);
      setDesvantagens(d);
      setArquetipos(a);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff853b" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView
      style={{ paddingHorizontal: 20, paddingVertical: 24 }}
      contentContainerStyle={{ gap: 16 }}
    >
      <View>
        <Text style={{ fontSize: 26, color: '#fdbe00', fontWeight: 'bold', marginBottom: 8 }}>
          Perícias
        </Text>
        {pericias.map((item) => (
          <Pericias key={item.id} pericias={item} />
        ))}
      </View>

      <View>
        <Text style={{ fontSize: 26, color: '#00fd90', fontWeight: 'bold', marginBottom: 8 }}>
          Vantagens
        </Text>
        {vantagens.map((item) => (
          <Vantagens key={item.id} vantagens={item} />
        ))}
      </View>

      <View>
        <Text style={{ fontSize: 26, color: '#fd0046', fontWeight: 'bold', marginBottom: 8 }}>
          Desvantagens
        </Text>
        {desvantagens.map((item) => (
          <Desvantagens key={item.id} desvantagens={item} />
        ))}
      </View>

      <View>
        <Text style={{ fontSize: 26, color: '#fd00ac', fontWeight: 'bold', marginBottom: 8 }}>
          Arquétipos
        </Text>
        {arquetipos.map((item) => (
          <Arquetipos key={item.id} arquetipos={item} />
        ))}
      </View>
    </ScrollView>
  );
}
