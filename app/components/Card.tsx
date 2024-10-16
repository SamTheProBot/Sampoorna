import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
    image: any;
    name: string;
    status: boolean;
    time: string;
}

export function Card({ image, name, status, time }: CardProps) {
    return (
    <View style={styles.itemContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={[styles.status, status ? styles.active : styles.inactive]}>
            {status ? 'ACTIVE' : 'INACTIVE'}
        </Text>
        <Text style={styles.time}>
            {status ? time : 'N/A'}
        </Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    },
    image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    },
    textContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
    },
    name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    },
    status: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    },
    active: {
    color: '#4CAF50',
    },
    inactive: {
    color: '#F44336',
    },
    time: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    },
});
