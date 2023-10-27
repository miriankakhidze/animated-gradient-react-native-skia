import { Ionicons } from '@expo/vector-icons';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

export default function App() {
  const { width, height } = useWindowDimensions()
  const leftColor = useSharedValue('white')
  const rightColor = useSharedValue('yellow')

  const colors = useDerivedValue(() => {
    return [leftColor.value, rightColor.value]
  })

  return (
    <>
      <StatusBar />
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          leftColor.value = withTiming(getRandomColor())
          rightColor.value = withTiming(getRandomColor())
        }}>
       <Ionicons name="shuffle" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 55,
    right: 55,
    height: 60,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: 'black',
  },
});
