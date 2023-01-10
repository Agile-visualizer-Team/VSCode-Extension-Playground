"use strict";
exports.__esModule = true;
exports.CytoscapeSnapperInstance = exports.CytoscapeSnapper = void 0;
var puppeteer = require("puppeteer");
var os = require("os");
var path = require("path");
var CytoscapeSnapper = /** @class */ (function () {
    function CytoscapeSnapper() {
    }
    CytoscapeSnapper.prototype.start = function () {
        return new Promise(function (resolve, reject) {
            puppeteer
                .launch({
                headless: true,
                args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
            })
                .then(function (browser) {
                resolve(new CytoscapeSnapperInstance(browser));
            })["catch"](function (e) {
                reject(e);
            });
        });
    };
    return CytoscapeSnapper;
}());
exports.CytoscapeSnapper = CytoscapeSnapper;
var CytoscapeSnapperInstance = /** @class */ (function () {
    function CytoscapeSnapperInstance(browser) {
        this.browser = browser;
    }
    CytoscapeSnapperInstance.prototype.shot = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var page;
            return _this.browser
                .newPage()
                .then(function (puppeteerPage) {
                page = puppeteerPage;
            })
                .then(function () {
                return page.setViewport({
                    width: options.width,
                    height: options.height
                });
            })
                .then(function () {
                var patchUri = function (uri) {
                    if (os.platform() === "win32") {
                        return "/" + uri.replace(/\\/g, "/");
                    }
                    else {
                        return uri;
                    }
                };
                return page.goto("file://" + patchUri(path.join(__dirname, "./browser/index.html")));
            })
                .then(function () {
                return page.evaluateHandle("__runCytoscape( " + JSON.stringify(options) + ")");
            })
                .then(function () {
                return page.screenshot({
                    type: "png",
                    quality: 0,
                    encoding: "base64"
                });
            })
                .then(function (b64Img) {
                resolve({ base64: b64Img });
                return page.close();
            })["catch"](function (error) {
                reject(error);
            });
        });
    };
    CytoscapeSnapperInstance.prototype.stop = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.browser
                .close()
                .then(function () {
                resolve();
            })["catch"](function (e) {
                reject(e);
            });
        });
    };
    return CytoscapeSnapperInstance;
}());
exports.CytoscapeSnapperInstance = CytoscapeSnapperInstance;
