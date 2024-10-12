import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface SheetProp {
  bottomSheetRef: React.Ref<BottomSheet>;
  children: React.ReactNode,
  snapPoints?: number,
}

export const Sheet = ({ bottomSheetRef, children }: SheetProp) => {

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['65%']}
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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

