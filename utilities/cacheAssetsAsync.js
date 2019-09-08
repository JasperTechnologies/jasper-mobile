import { MaterialIcons } from "@expo/vector-icons"
import { Image } from "react-native"
import * as Font from "expo-font"
import { Asset } from "expo-asset"

import IMAGES from "../config/Images.js"
import FONTS from "../config/Fonts.js"

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image)
    }
    return Asset.fromModule(image).downloadAsync()
  })
}

export default async function cacheAssetsAsync() {
  const imageAssets = cacheImages(Object.values(IMAGES))
  const fontAssets = Font.loadAsync(FONTS)
  const iconAssets = Font.loadAsync({ ...MaterialIcons.font })

  await Promise.all([...imageAssets, fontAssets, iconAssets])
}
