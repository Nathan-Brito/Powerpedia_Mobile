import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://spztiessqczehcwttldv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwenRpZXNzcWN6ZWhjd3R0bGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NTkxMTQsImV4cCI6MjA0MjMzNTExNH0.zsRWhuzMBZVvoSMl-LgI3zp9yHFbyYT8iY8YNNInJ6M';

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

export const fetchTabela = async (tabela: string) => {
  const res = await fetch(`${supabaseUrl}/rest/v1/${tabela}?order=id.asc`, {
    headers,
  });
  if (!res.ok) throw new Error('Erro na requisição');
  return await res.json();
};
