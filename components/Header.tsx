import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const goToScreen = (screen: string) => {
    closeMenu();
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    closeMenu();
    try {
      await signOut();
    } catch {
      Alert.alert('Erro', 'Não foi possível sair, tente novamente.');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/Powerpedia.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            {[
              { label: 'Perícias', screen: 'Pericias' },
              { label: 'Vantagens', screen: 'Vantagens'},
              { label: 'Desvantagens', screen: 'Desvantagens'},
              { label: 'Arquetipos', screen: 'Arquetipos'},
              { label: 'Favoritos', screen: 'Favoritos'},
            ].map(({ label, screen, color }) => (
              <TouchableOpacity
                key={screen}
                onPress={() => goToScreen(screen)}
                style={styles.menuItem}
              >
                <Text style={[styles.menuText, { color }]}>{label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleLogout} style={[styles.menuItem, { borderTopWidth: 1, borderColor: '#ddd' }]}>
              <Text style={[styles.menuText, { color: '#ff3b30', fontWeight: 'bold' }]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    width: 200,
    marginTop: 80,
    marginRight: 10,
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
