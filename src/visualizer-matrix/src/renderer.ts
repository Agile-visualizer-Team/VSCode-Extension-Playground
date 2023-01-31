const puppeteer = require("puppeteer-core");
import * as os from "os";
import * as path from "path";
import * as fs from "fs";

export const render = async (
  output_dir: string,
  vis_type: string,
  as_index: number,
  html_content: string,
  chrome_exe: string | undefined
) => {
  if (!chrome_exe) {
    console.log("Chrome executable path not set");
    return;
  }

  fs.writeFileSync(
    path.join(output_dir, vis_type + "_" + as_index + ".html"),
    html_content
  );

  const browser = await puppeteer.launch({ executablePath: chrome_exe });
  const page = await browser.newPage();
  const uri = path.join(output_dir, vis_type + "_" + as_index + ".html");
  let URL = "file:///"
  URL +=
    (os.platform() === "win32") ? uri.replace(/\\/g, "/") : uri;
  console.log(URL)
  await page.goto(URL);
  await page.screenshot({
    path: path.join(
      output_dir,
      vis_type + "_" + as_index + "_" + Date.now() + ".png"
    ),
    fullPage: true
  },);
  await browser.close();

  fs.rmSync(path.join(output_dir, vis_type + "_" + as_index + ".html"));
};

export const render_gif = async (
  output_dir: string,
  as: number,
  time: number,
  html_content: string,
  chrome_exe: string | undefined
) => {
  if (!chrome_exe) {
    console.log("Chrome executable path not set");
    return;
  }

  fs.writeFileSync(
    path.join(output_dir, "gif", as + "_" + time + ".html"),
    html_content
  );

  const browser = await puppeteer.launch({ executablePath: chrome_exe });
  const page = await browser.newPage();
  const uri = path.join(output_dir, "gif", as + "_" + time + ".html");
  let URL = "file:///"
  URL +=
    (os.platform() === "win32") ? uri.replace(/\\/g, "/") : uri;
  console.log(URL)
  await page.goto(URL);
  await page.screenshot({
    path: path.join(
      output_dir,
      "gif",
      as + "_" + time + ".png"
    ),
    fullPage: true
  });
  await browser.close();

  fs.rmSync(path.join(output_dir, "gif", as + "_" + time + ".html"));
};

