// Whether we're in development mode or not
export const IS_DEV_MODE = process.env.NODE_ENV === "development";

// Whether we should actually make requests to OpenAI and use up our free credits 
export const SHOULD_SAVE_MONEY = process.env.OFFLINE_MODE === "true";