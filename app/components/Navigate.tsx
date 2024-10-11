import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface NavigationProp {
  isBack: boolean;
  link: any;
}

interface HyperLinkProps {
  link: any,
  placeholder: string,
}

export function HyperLink({ link, placeholder }: HyperLinkProps) {
  return (
    <View style={styles.container}>
      <Link style={styles.text} href={link}>
        {placeholder}
      </Link>
    </View>
  );
}

export function Navigate({ isBack, link }: NavigationProp) {
  const router = useRouter();

  return (
    <View>
      {isBack ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => {
              router.back();
            }}
          >
            <FontAwesome size={20} name="chevron-left" color={'#FF6347'} />
            <Text style={styles.text}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => {
              router.push(link);
            }}
          >
            <Text style={styles.text}>Go Next</Text>
            <FontAwesome size={20} name="chevron-right" color={'#FF6347'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: 'center',
  },
  opacity: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: '#FF6347',
  },
});
