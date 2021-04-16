import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import tailwind from "tailwind-rn";
import { bgAccent, textColor } from "../constants";

export default function Menu({ menuShown }) {
  const mt = useSharedValue(menuShown ? 0 : -300);

  const style = useAnimatedStyle(() => {
    return {
      marginTop: withSpring(mt.value, { damping: 20, stiffness: 150 }),
    };
  });

  return (
    <Animated.View
      style={[
        tailwind("absolute inset-x-0 top-12 px-4 flex justify-center z-10"),
        { backgroundColor: "rgba(0,0,0,0.3)" },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={tailwind(
          `${bgAccent} w-full py-4 mt-2 flex items-center rounded-md`
        )}
      >
        <Text style={tailwind(`${textColor}`)}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={tailwind(
          `${bgAccent} w-full py-4 mt-2 flex items-center rounded-md`
        )}
      >
        <Text style={tailwind(`${textColor}`)}>Check for Updates</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={tailwind(
          `${bgAccent} w-full py-4 my-2 flex items-center rounded-md`
        )}
      >
        <Text style={tailwind(`${textColor}`)}>Help</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
