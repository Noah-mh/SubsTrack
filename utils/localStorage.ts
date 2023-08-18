import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSavedLogoURI = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("logoURI");
  } catch (error) {
    console.error("Error fetching saved logo URI:", error);
    return null;
  }
};
