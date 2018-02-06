'use strict';

module.exports = {
	Facebook : {
		APP_ID: process.env.Facebook_APP_ID || "Your APP_ID",
		APP_SECRET: process.env.Facebook_APP_SECRET || "Your APP_SECRET",
		CALLBACK_URL: process.env.Facebook_CALLBACK_URL || "Your CALLBACK_URL"
	},
	GitHub : {
		APP_ID: process.env.GitHub_APP_ID || "Your APP_ID",
		APP_SECRET: process.env.GitHub_APP_SECRET || "Your APP_SECRET",
		CALLBACK_URL: process.env.GitHub_CALLBACK_URL || "Your CALLBACK_URL"
	},
	Google : {
		APP_ID: process.env.Google_APP_ID || "Your APP_ID", 
		APP_SECRET: process.env.Google_APP_SECRET || "Your APP_SECRET",
		CALLBACK_URL: process.env.Google_CALLBACK_URL || "Your CALLBACK_URL"
	},
    Twitter : {
		APP_ID: process.env.Twitter_APP_ID || "Your APP_ID", 
		APP_SECRET: process.env.Twitter_APP_SECRET || "Your APP_SECRET",
		CALLBACK_URL: process.env.Twitter_CALLBACK_URL || "Your CALLBACK_URL"
	},
	JWT_Secret : {
		SECRET_KEY: process.env.JWT_SECRET || "THEsweetyCateverMaloos"
	},
	SESSION_SECRET: {
		SECRET_KEY: process.env.SESSION_SECRET || "THEsweetyCateverMaloos"
	},
	DB_Connection: {
		URL: process.env.DB_Connection || "mongodb://localhost:27017/skypeClone"
	},
	SERVER_PORT: {
		PORT: process.env.PORT || 3001
	}
}
