import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { supabase, supabaseClient } from "./supabaseClient";
import { getSavedLogoURI } from "./localStorage";

export const checkUserExists = async (userId: string, token: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("users").select().eq("user_id", userId);
  if (error) {
    console.error("Error checking user:", error);
  }
  return data?.length ? true : false;
};

export const addUser = async (userId: string, token: string) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("users").insert([{ user_id: userId }]);
  if (error) {
    console.error("Error adding user:", error);
  }
  console.log("Added user:", data);
  return data;
};

const fetchSupabaseURL = async (): Promise<string | null> => {
  const response: any = await supabase.storage.from("assets").getPublicUrl("logos/App_Logo.png");
  console.log("response type", typeof response);
  if (response.error) {
    console.error("Error fetching Supabase URL:", response.error);
    return null;
  }

  return response.data.publicUrl;
};

const fileExists = async (uri: string): Promise<boolean> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    return fileInfo.exists;
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
};
export const downloadLogoUsingURL = async (): Promise<string | null> => {
  let uri = await getSavedLogoURI();

  if (uri && (await fileExists(uri))) {
    console.log("Using saved logo from:", uri);
    return uri;
  }

  // If not found in local storage or file doesn't exist, proceed with download
  try {
    const fileUrl: string | null = await fetchSupabaseURL();

    if (!fileUrl) {
      console.error("Unable to get Supabase URL");
      return null;
    }

    uri = FileSystem.documentDirectory + "App_Logo.png";
    const downloadResumable = FileSystem.createDownloadResumable(fileUrl, uri);

    const result = await downloadResumable.downloadAsync();
    if (!result || !result.uri) {
      throw new Error("Failed to download the file.");
    }

    console.log("Finished downloading to", uri);

    // Save the URI to local storage
    await AsyncStorage.setItem("logoURI", uri);

    return uri;
  } catch (e) {
    console.error("Download error:", e);
    return null;
  }
};
