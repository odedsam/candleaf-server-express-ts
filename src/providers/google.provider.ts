import { GoogleUser } from "../types/user";
import { colorError, colorSuccess } from "../utils";


export const fetchGoogleUser = async (accessToken: string): Promise<GoogleUser | null> => {
  const googleUserInfoEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

  try {
    colorSuccess(`Fetching Google user info...`);

    const response = await fetch(googleUserInfoEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      colorError(`Failed to fetch Google user info. Status: ${response.status}`);
      colorError(`Google API Error Details: ${JSON.stringify(errorBody)}`);
      throw new Error(`Failed to fetch Google user info. Status: ${response.status}`);
    }
    const data: any = await response.json();
    colorSuccess(`Successfully fetched Google user info for user ID: ${data.sub}`);
    const googleUser: GoogleUser = {
      id: data.sub,
      name: data.name,
      email: data.email,
      avatar: data.picture,
    };

    return googleUser;
  } catch (error: any) {
    colorError(`Error during fetchGoogleUser: ${error.message}`);
    return null;
  }
};
