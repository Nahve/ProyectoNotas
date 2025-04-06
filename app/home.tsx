import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type Recuerdo = {
  id: string;
  texto: string;
};

export default function App() {
  const [recuerdo, setRecuerdo] = useState('');
  const [recuerdos, setRecuerdos] = useState<Recuerdo[]>([]);

  const agregarRecuerdo = () => {
    if (recuerdo.trim()) {
      setRecuerdos([{ id: Date.now().toString(), texto: recuerdo }, ...recuerdos]);
      setRecuerdo('');
    }
  };

  const eliminarRecuerdo = (id: string) => {
    setRecuerdos(recuerdos.filter((r) => r.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>📓 Mis Recuerdos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un recuerdo..."
          placeholderTextColor="#999"
          value={recuerdo}
          onChangeText={setRecuerdo}
        />
        <TouchableOpacity style={styles.button} onPress={agregarRecuerdo}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recuerdos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.recuerdoCard}>
            <Text style={styles.recuerdoText}>{item.texto}</Text>
            <TouchableOpacity onPress={() => eliminarRecuerdo(item.id)}>
              <Ionicons name="trash" size={20} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe6',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 50,
  },
  recuerdoCard: {
    backgroundColor: '#e7ffe7',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recuerdoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
});
