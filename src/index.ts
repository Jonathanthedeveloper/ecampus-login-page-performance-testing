import puppeteer from "puppeteer";
import fs from "node:fs";

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const OUTPUT_FILE = "results.csv";

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();

  const loginPageStart = performance.now();
  // Visit the RSU eCampus login page
  await page.goto("https://ecampus.rsu.edu.ng/ecampus/login.html");

  // Wait for the login form to load
  await page.waitForSelector(".login-form");
  const loginPageEnd = performance.now();

  const loginPageDuration = loginPageEnd - loginPageStart;

  // Fill in the username
  await page.type("#username", USERNAME);

  // Click the "Continue" button to proceed to password step
  await page.click('a[onclick="nextStep()"]');

  // Wait for the password field to become visible
  await page.waitForSelector("#password:not(.d-none)", { visible: true });

  // Fill in the password
  await page.type("#password", PASSWORD);

  // Click the login button
  await page.click("#btn_login");

  const loginProcessStart = performance.now();

  // Wait for navigation to the dashboard
  await page.waitForNavigation({
    timeout: 100_000_000,
    waitUntil: "domcontentloaded",
  });
  const loginProcessEnd = performance.now();
  const loginProcessDuration = loginProcessEnd - loginProcessStart;

  const dashboardLoadStart = performance.now();

  await page.waitForNetworkIdle({
    timeout: 100_000_000,
  });

  const dashboardLoadEnd = performance.now();
  const dashboardLoadDuration = dashboardLoadEnd - dashboardLoadStart;

  const totalDuration = dashboardLoadEnd - loginPageStart;

  // Results
  const timestamp = new Date().toISOString();
  const results = {
    timestamp,
    loginPageLoadMs: Math.round(loginPageDuration),
    loginPageLoadSeconds: (loginPageDuration / 1000).toFixed(2),
    loginProcessMs: Math.round(loginProcessDuration),
    loginProcessSeconds: (loginProcessDuration / 1000).toFixed(2),
    dashboardLoadMs: Math.round(dashboardLoadDuration),
    dashboardLoadSeconds: (dashboardLoadDuration / 1000).toFixed(2),
    totalMs: Math.round(totalDuration),
    totalSeconds: (totalDuration / 1000).toFixed(2),
  };

  // Write results to CSV file

  if (!fs.existsSync(OUTPUT_FILE)) {
    // Create the file and write the header if it doesn't exist
    fs.writeFileSync(
      OUTPUT_FILE,
      "timestamp,loginPageLoadMs,loginPageLoadSeconds,loginProcessMs,loginProcessSeconds,dashboardLoadMs,dashboardLoadSeconds,totalMs,totalSeconds\n"
    );
  }

  const csvLine = `${results.timestamp},${results.loginPageLoadMs},${results.loginPageLoadSeconds},${results.loginProcessMs},${results.loginProcessSeconds},${results.dashboardLoadMs},${results.dashboardLoadSeconds},${results.totalMs},${results.totalSeconds}\n`;
  fs.appendFileSync(OUTPUT_FILE, csvLine);

  await browser.close();
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
