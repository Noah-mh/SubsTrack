import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { supabase, supabaseClient } from "./supabaseClient";

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
  let uri = await AsyncStorage.getItem("logoURI");

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

const fetchAllLogos = async (): Promise<string[] | null> => {
  try {
    const { data, error } = await supabase.storage.from("assets").list("logos/");
    if (error || !data) {
      console.error("Error fetching logo list:", error);
      return null;
    }
    return data.map((entry) => entry.name);
  } catch (err) {
    console.error("Failed to fetch logo list:", err);
    return null;
  }
};

const downloadLogo = async (fileName: string): Promise<string> => {
  const response: any = await supabase.storage.from("assets").getPublicUrl(`logos/${fileName}`);
  if (response.error) {
    throw new Error(`Error fetching Supabase URL for ${fileName}: ${response.error}`);
  }

  const fileUrl: string = response.data.publicUrl;
  const localUri = FileSystem.documentDirectory + fileName;
  await FileSystem.createDownloadResumable(fileUrl, localUri).downloadAsync();
  console.log("Finished downloading to", localUri);
  return localUri;
};

export const downloadAllLogos = async (): Promise<string[] | null> => {
  const fileNames = await fetchAllLogos();
  if (!fileNames) {
    return null;
  }

  let savedUrisString = await AsyncStorage.getItem("logos");
  let savedUris = savedUrisString ? JSON.parse(savedUrisString) : [];

  for (let fileName of fileNames) {
    const localUri = FileSystem.documentDirectory + fileName;

    if (savedUris.includes(localUri) && (await FileSystem.getInfoAsync(localUri)).exists) {
      continue; // Skip if the file already exists locally.
    }

    const downloadedUri = await downloadLogo(fileName);
    savedUris.push(downloadedUri);
  }

  await AsyncStorage.setItem("logos", JSON.stringify(savedUris)); // Update the saved URIs in AsyncStorage.
  return savedUris;
};
