import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { useHeader } from '@/hooks/useHeader';
import { EndPoint } from '@/constants/apiEndPoint';
import axios from 'axios';

export default function Transction() {
  const headers = useHeader();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get(`${EndPoint}/getlogs`, { headers })
        if (response.status === 200) {
          setData(response.data);
        }
      }
      catch (e) {
        console.log(`server error ${e}`);
      }
    }
    const Interval = setInterval(() => {
      func();
    }, 2500)
    return () => clearInterval(Interval)
  }, [])

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.label}>Your Transction History</ThemedText>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <ThemedText style={styles.eventType}>{item.eventType}</ThemedText>
                <ThemedText style={styles.text}>
                  From: {item.fromName}
                </ThemedText>
                <ThemedText style={styles.text}>
                  To: {item.toName}
                </ThemedText>
                <ThemedText style={styles.text}>
                  Amount: ${item.amount.toFixed(2)}
                </ThemedText>
                <ThemedText style={styles.transactionHash}>
                  Transaction: {item.transction_hash}
                </ThemedText>
              </View>
            )}
          />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  label: {
    alignSelf: 'center',
    fontSize: 24,
    marginVertical: 24,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: 'white',
    backgroundColor: '#fcede8',
    elevation: 3,
  },
  eventType: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  transactionHash: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});

