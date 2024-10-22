import { FlatList, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { useHeader } from '@/hooks/useHeader';
import { EndPoint } from '@/constants/apiEndPoint';
import axios from 'axios';

export default function Transction() {
  const headers = useHeader();
  const [data, setData] = useState<any[]>();
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
    func()
    const time = setInterval(func, 2000)
    return () => clearInterval(time)
  }, [headers])

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.label}>Your Transaction History</ThemedText>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <ThemedText style={styles.text}>From: {item.fromName}</ThemedText>
                    <ThemedText style={styles.text}>To: {item.toName}</ThemedText>
                    <ThemedText style={styles.text}>Amount: {item.amount / 1e16} EST</ThemedText>
                  </View>
                  <View style={styles.rightColumn}>
                    <ThemedText style={styles.eventType}>{item.eventType}</ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.transactionHash}>
                  Transaction#: {item.transaction_hash.substr(0, 10)}.....
                  {item.transaction_hash.substr(item.transaction_hash.length - 10)}
                </ThemedText>
              </View>
            )}
          />
        </ThemedView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  label: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 16,
    marginVertical: 28,
    color: '#333',
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f3ea',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  eventType: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  transactionHash: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});
