import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'react-native';

interface SheetProp {
  bottomSheetRef: React.Ref<BottomSheet>;
  children: React.ReactNode,
  snapPoints?: string,
}

export const Sheet = ({ bottomSheetRef, children, snapPoints = '65' }: SheetProp) => {

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={[`${snapPoints}%`]}
      enablePanDownToClose={true}
      topInset={10}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet >
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
});

