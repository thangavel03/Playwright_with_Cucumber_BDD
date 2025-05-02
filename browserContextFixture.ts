// browserContextFixture.ts

import { Browser, BrowserContext, Page } from "@playwright/test";

type PageFixture = {
  browser: Browser | null;
  context: BrowserContext | null;
  page: Page | null;  // Explicitly declare this as Page | null
  videoPath: string;
};

export const pageFixture: PageFixture = {
  browser: null,
  context: null,
  page: null,  // Initialize with null
  videoPath: "",
};
