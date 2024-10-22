import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
    image: any;
    name: string;
    status: string;
    time: string;
}

export function Card({ image, name, status, time }: CardProps) {
    return (
        <View style={styles.itemContainer}>
            <Image source={image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={[styles.status, (status === 'active') ? styles.active : (status === 'none') ? styles.inactive : styles.deduced]}>
                    {(status === 'active') ? 'ACTIVE' : (status === 'none') ? 'INACTIVE' : 'DEDUCED'}
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
        paddingHorizontal: 10,
        marginVertical: 3,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    image: {
        width: 105,
        height: 95,
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
        fontSize: 21,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    status: {
        fontSize: 17.5,
        fontWeight: '500',
        marginBottom: 4,
    },
    active: {
        color: '#4CAF50',
    },
    inactive: {
        color: '#F44336',
    },
    deduced: {
        color: 'gray',
    },
    time: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
});
