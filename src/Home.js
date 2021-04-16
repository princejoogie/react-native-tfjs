import React, { useState, useEffect, useRef } from "react";
import { StatusBar, View, Image, Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { WIDTH, bgAccent, bgColor, textColor } from "./constants";
import Menu from "./components/Menu";

export default function Home() {
  // COMPONENT VARIABLES
  const [photo, setPhoto] = useState();
  const [menuShown, setMenuShown] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // CAMERA VARIABLES
  const cam = useRef();
  const type = Camera.Constants.Type.back;
  const [flashMode, setFlashMode] = useState("off");
  const [camPermitted, setCamPermitted] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCamPermitted(status === "granted");
    };
    init();
  }, []);

  useEffect(() => {
    if (photo) {
      const predict = async () => {};
      predict();
    } else {
    }
  }, [photo]);

  const pickImage = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  // Expo Cam
  const capturePhoto = async () => {
    if (cam.current) {
      const options = {
        quality: 1,
        base64: true,
        skipProcessing: true,
        onPictureSaved: async (res) => {
          setPhoto(res);
        },
      };
      await cam.current.takePictureAsync(options);
    }
  };

  return (
    <View style={tailwind(`flex flex-1 ${bgColor}`)}>
      <StatusBar />
      {/* Menu */}
      <Menu menuShown={menuShown} />
      {/* Content */}
      <View
        style={tailwind(
          "z-30 flex flex-row items-center justify-between px-4 pt-2 bg-gray-100"
        )}
      >
        {!menuShown ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMenuShown(true)}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </Svg>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMenuShown(false)}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </Svg>
          </TouchableOpacity>
        )}

        <Text style={tailwind(`text-xl ${textColor}`)}>Genesis</Text>

        {!isDark ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsDark(true)}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </Svg>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsDark(false)}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={tailwind(`w-8 h-8 ${textColor}`)}
            >
              <Path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={tailwind("flex flex-1")}
        onTouchStart={() => setMenuShown(false)}
      >
        <View style={[tailwind("flex p-2"), { width: WIDTH, height: WIDTH }]}>
          {photo ? (
            <Image
              style={tailwind(`${bgAccent} flex flex-1 rounded-xl`)}
              source={{ uri: photo.uri }}
            />
          ) : (
            <View
              style={tailwind(
                `${bgAccent} flex flex-1 justify-center overflow-hidden rounded-xl`
              )}
            >
              {camPermitted ? (
                <Camera
                  ref={(ref) => (cam.current = ref)}
                  style={tailwind(`absolute inset-0`)}
                  type={type}
                  flashMode={flashMode}
                  ratio="1:1"
                />
              ) : (
                <Text style={tailwind(`${textColor} text-center`)}>
                  Accept Camera Permission to access
                </Text>
              )}
            </View>
          )}

          <View
            style={tailwind(
              "absolute bottom-4 inset-x-4 flex flex-row items-center justify-between"
            )}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setFlashMode(flashMode === "on" ? "off" : "on");
              }}
            >
              {flashMode === "on" ? (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={tailwind("h-8 w-8 text-gray-200")}
                >
                  <Path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </Svg>
              ) : (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={tailwind("h-8 w-8 text-gray-200")}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </Svg>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                { backgroundColor: "rgba(16,185,129,0.5)" },
                tailwind("rounded-full p-3"),
              ]}
              onPress={() => {
                if (photo) {
                  setPhoto(null);
                } else capturePhoto();
              }}
            >
              {photo ? (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={tailwind("h-10 w-10 text-white")}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </Svg>
              ) : (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={tailwind("h-10 w-10 text-white")}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </Svg>
              )}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={tailwind("h-8 w-8 text-white")}
              >
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
