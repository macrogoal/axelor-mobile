import React, {useCallback, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

interface NativeSliderProps {
  testID?: string;
  thumbTintColor: string;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
  minimumValue: number;
  maximumValue: number;
  lowerLimit?: number | null;
  upperLimit?: number | null;
  step?: number | null;
  value: number;
  onValueChange: (value: number) => void;
  onSlidingComplete: (value: number) => void;
}

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 20;

const NativeSlider = ({
  testID,
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  minimumValue,
  maximumValue,
  lowerLimit,
  upperLimit,
  step,
  value,
  onValueChange,
  onSlidingComplete,
}: NativeSliderProps) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef<View>(null);
  const currentValue = useRef(value);

  const getTouchX = useCallback((evt: GestureResponderEvent) => {
    return evt.nativeEvent.locationX;
  }, []);

  const clamp = useCallback(
    (touchX: number) => {
      const range = maximumValue - minimumValue;
      const ratio = Math.max(0, Math.min(1, touchX / sliderWidth));
      let scaled = minimumValue + ratio * range;
      if (lowerLimit != null) {
        scaled = Math.max(scaled, lowerLimit);
      }
      if (upperLimit != null) {
        scaled = Math.min(scaled, upperLimit);
      }
      if (step != null && step > 0) {
        scaled = Math.round((scaled - minimumValue) / step) * step + minimumValue;
      }
      return Math.round(scaled * 100) / 100;
    },
    [minimumValue, maximumValue, lowerLimit, upperLimit, step, sliderWidth],
  );

  const getValueRatio = useCallback(
    (val: number) => {
      const range = maximumValue - minimumValue;
      if (range === 0) {return 0;}
      return (val - minimumValue) / range;
    },
    [minimumValue, maximumValue],
  );

  const updateValue = useCallback(
    (evt: GestureResponderEvent) => {
      const touchX = getTouchX(evt);
      const newValue = clamp(touchX);
      currentValue.current = newValue;
      onValueChange(newValue);
    },
    [getTouchX, clamp, onValueChange],
  );

  const updateValueRef = useRef(updateValue);
  updateValueRef.current = updateValue;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => updateValueRef.current(evt),
      onPanResponderMove: evt => updateValueRef.current(evt),
      onPanResponderRelease: () => {
        onSlidingComplete(currentValue.current);
      },
    }),
  ).current;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;
    setSliderWidth(width);
  }, []);

  const valueRatio = getValueRatio(value);
  const thumbLeft = valueRatio * Math.max(0, sliderWidth - THUMB_SIZE);

  return (
    <View
      ref={containerRef}
      testID={testID}
      style={styles.container}
      onLayout={onLayout}
      {...panResponder.panHandlers}>
      <View style={styles.track}>
        <View
          style={[
            styles.trackBackground,
            {backgroundColor: maximumTrackTintColor},
          ]}
        />
        <View
          style={[
            styles.trackActive,
            {
              backgroundColor: minimumTrackTintColor,
              width: sliderWidth > 0 ? valueRatio * sliderWidth : 0,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbTintColor,
            transform: [{translateX: thumbLeft}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
  },
  trackBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: TRACK_HEIGHT / 2,
  },
  trackActive: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default NativeSlider;
