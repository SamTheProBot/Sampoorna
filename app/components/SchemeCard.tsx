import { ExternalLink } from '@/components/ExternalLink';
import { View, Text, StyleSheet, Image } from 'react-native';
import { schemeProps } from '@/constants/Schemes';

interface SchemeCardProps {
  scheme: schemeProps;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Image source={scheme.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{scheme.name}</Text>
        <Text style={styles.description}>{scheme.description}</Text>
        <ExternalLink href={scheme.link}>Learn More</ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f3ea',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 110,
    height: 125,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    marginVertical: 5,
    color: '#555',
  },
});

