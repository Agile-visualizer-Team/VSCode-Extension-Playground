import * as vscode from "vscode";
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
    vscode.window.showErrorMessage("Chrome executable path not set");
    return false;
  }

  fs.writeFileSync(
    path.join(output_dir, vis_type + "_" + as_index + ".html"),
    html_content
  );

  const browser = await puppeteer.launch({ executablePath: chrome_exe });
  const page = await browser.newPage();
  const uri = path.join(output_dir, vis_type + "_" + as_index + ".html");
  let URL = "file:///";
  URL += os.platform() === "win32" ? uri.replace(/\\/g, "/") : uri;

  await page.goto(URL);
  const timestamp = Date.now();
  await page.screenshot({
    path: path.join(
      output_dir,
      vis_type + "-" + as_index + "-" + timestamp + ".png"
    ),
    fullPage: true,
  });
  vscode.window.showInformationMessage(
    vis_type + "-" + as_index + "-" + timestamp + ".png" + " saved"
  );
  await browser.close();

  fs.rmSync(path.join(output_dir, vis_type + "_" + as_index + ".html"));
  return true;
};

export const render_gif = async (
  output_dir: string,
  as: number,
  time: number,
  html_content: string,
  chrome_exe: string | undefined
) => {
  if (!chrome_exe) {
    vscode.window.showErrorMessage("Chrome executable path not set");
    return false;
  }

  fs.writeFileSync(
    path.join(output_dir, "gif", as + "_" + time + ".html"),
    html_content
  );

  const browser = await puppeteer.launch({ executablePath: chrome_exe });
  const page = await browser.newPage();
  const uri = path.join(output_dir, "gif", as + "_" + time + ".html");
  let URL = "file:///";
  URL += os.platform() === "win32" ? uri.replace(/\\/g, "/") : uri;

  await page.goto(URL);
  await page.screenshot({
    path: path.join(output_dir, "gif", as + "_" + time + ".png"),
    fullPage: true,
  });
  await browser.close();

  fs.rmSync(path.join(output_dir, "gif", as + "_" + time + ".html"));
  return true;
};
