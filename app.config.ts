import { ExpoConfig } from "expo/config";
import "dotenv/config";

const config: ExpoConfig = {
  name: "SubsTrack",
  slug: "SubsTrack",
  scheme: "substrack",
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  },
};

export default config;
