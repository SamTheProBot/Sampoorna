import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface NavigationProp {
  isBack: boolean;
  link: any;
  style?: any,
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

export function Navigate({ isBack, link, style }: NavigationProp) {
  const router = useRouter();

  return (
    <View>
      {isBack ? (
        <View style={[styles.container, style]}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => {
              router.back();
            }}
          >
            <FontAwesome size={20} name="chevron-left" color={'darkorange'} />
            <Text style={styles.text}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.container, style]}>
          <TouchableOpacity
            style={styles.opacity}
            onPress={() => {
              router.push(link);
            }}
          >
            <Text style={styles.text}>Go Next</Text>
            <FontAwesome size={20} name="chevron-right" color={'darkorange'} />
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
    marginHorizontal: 10,
    fontSize: 18,
    color: 'darkorange',
  },
});
