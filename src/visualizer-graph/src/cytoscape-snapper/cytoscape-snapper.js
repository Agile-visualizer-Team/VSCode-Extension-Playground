"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CytoscapeSnapperInstance = exports.CytoscapeSnapper = void 0;
const puppeteer = require("puppeteer");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
class CytoscapeSnapper {
    start() {
        return new Promise((resolve, reject) => {
            puppeteer
                .launch({
                headless: true,
                args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
            })
                .then((browser) => {
                resolve(new CytoscapeSnapperInstance(browser));
            })
                .catch((e) => {
                reject(e);
            });
        });
    }
}
exports.CytoscapeSnapper = CytoscapeSnapper;
class CytoscapeSnapperInstance {
    constructor(browser) {
        this.browser = browser;
    }
    shot(options) {
        return new Promise((resolve, reject) => {
            let page;
            return this.browser
                .newPage()
                .then((puppeteerPage) => {
                page = puppeteerPage;
            })
                .then(() => {
                return page.setViewport({
                    width: options.width,
                    height: options.height,
                });
            })
                .then(() => {
                const patchUri = (uri) => {
                    if (os.platform() === "win32") {
                        return "/" + uri.replace(/\\/g, "/");
                    }
                    else {
                        return uri;
                    }
                };
                return page.goto("file://" + patchUri(path.join(__dirname, "./browser/index.html")));
            })
                .then(() => {
                return page.evaluateHandle("__runCytoscape( " + JSON.stringify(options) + ")");
            })
                .then(() => {
                return page.screenshot({
                    type: "png",
                    quality: 0,
                    encoding: "base64",
                });
            })
                .then((b64Img) => {
                resolve({ base64: b64Img });
                return page.close();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    stop() {
        return new Promise((resolve, reject) => {
            this.browser
                .close()
                .then(() => {
                resolve();
            })
                .catch((e) => {
                reject(e);
            });
        });
    }
}
exports.CytoscapeSnapperInstance = CytoscapeSnapperInstance;
