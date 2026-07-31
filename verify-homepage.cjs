const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const pagePath = path.resolve(process.cwd(), "index.html");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Users\\Admin\\AppData\\Local\\ms-playwright\\chromium-1200\\chrome-win64\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("file://" + pagePath.replace(/\\/g, "/"));
  await page.waitForLoadState("networkidle");
  const initialMode = await page.locator("body").getAttribute("data-mode");
  const activeTab = await page.locator(".tab.is-active").first().innerText();
  const initialService = await page.locator('select[name="service"]').inputValue();

  await page.click('[data-mode-target="cleaning"]');
  const cleanMode = await page.locator("body").getAttribute("data-mode");
  const cleanTitle = await page.locator("[data-service-title]").innerText();

  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="phone"]', "+254700111222");
  await page.fill('input[name="location"]', "Westlands");
  await page.fill('textarea[name="message"]', "Need cleaning quote tomorrow morning.");
  const popupPromise = page.waitForEvent("popup");
  await page.click('form button[type="submit"]');
  const popup = await popupPromise;
  const popupUrl = popup.url();
  await popup.close();

  const desktopShot = path.resolve(process.cwd(), "homepage-desktop.png");
  await page.screenshot({ path: desktopShot, fullPage: true });

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("file://" + pagePath.replace(/\\/g, "/"));
  await page.waitForLoadState("networkidle");
  const mobileLogo = await page.locator(".brand img").boundingBox();
  await page.click(".menu-toggle");
  const menuVisible = await page.locator(".mobile-panel.is-open").isVisible();
  const mobileShot = path.resolve(process.cwd(), "homepage-mobile.png");
  await page.screenshot({ path: mobileShot, fullPage: true });

  await browser.close();
  console.log(
    JSON.stringify(
      {
        initialMode,
        activeTab,
        initialService,
        cleanMode,
        cleanTitle,
        popupUrlIncludesMessage:
          popupUrl.includes("Need+cleaning+quote") || popupUrl.includes("Need%20cleaning%20quote"),
        menuVisible,
        mobileLogo,
        errors,
        desktopShot,
        mobileShot,
      },
      null,
      2,
    ),
  );
})();
