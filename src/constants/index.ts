const {
  VITE_api_Key,
  VITE_authDomain,
  VITE_projectId,
  VITE_storageBucket,
  VITE_messagingSenderId,
  VITE_appId
} = import.meta.env;

export const FB_API_KEY = VITE_api_Key;
export const FB_AUTH_DOMAIN = VITE_authDomain;
export const FB_PROJECT_ID = VITE_projectId;
export const FB_STORAGE_BUCKET = VITE_storageBucket;
export const FB_MESSAGING_SENDER_ID = VITE_messagingSenderId;
export const FB_APP_ID = VITE_appId;
