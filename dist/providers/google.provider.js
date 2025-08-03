"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGoogleUser = void 0;
const utils_1 = require("../utils");
const fetchGoogleUser = async (accessToken) => {
    const googleUserInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
    try {
        (0, utils_1.colorSuccess)(`Fetching Google user info...`);
        const response = await fetch(googleUserInfoEndpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorBody = await response.json();
            (0, utils_1.colorError)(`Failed to fetch Google user info. Status: ${response.status}`);
            (0, utils_1.colorError)(`Google API Error Details: ${JSON.stringify(errorBody)}`);
            throw new Error(`Failed to fetch Google user info. Status: ${response.status}`);
        }
        const data = await response.json();
        (0, utils_1.colorSuccess)(`Successfully fetched Google user info for user ID: ${data.sub}`);
        const googleUser = {
            id: data.sub,
            name: data.name,
            email: data.email,
            avatar: data.picture,
        };
        if (!googleUser.email) {
            console.error("Warning: Google user email is null or undefined");
        }
        return googleUser;
    }
    catch (error) {
        (0, utils_1.colorError)(`Error during fetchGoogleUser: ${error.message}`);
        return null;
    }
};
exports.fetchGoogleUser = fetchGoogleUser;
