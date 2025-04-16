import { LaunchOptions } from "@playwright/test";

const browserOptions: LaunchOptions = {
  tracesDir: "traces",
  headless: true,
  channel: 'msedge',
};

export const config = {
  //browser: process.env.BROWSER || "chromium",
  browserOptions,
  //baseUrl: "https://www.saucedemo.com/",
};
