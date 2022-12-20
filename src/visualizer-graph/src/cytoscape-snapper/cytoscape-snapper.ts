import puppeteer, {Browser, Page} from "puppeteer";
import * as os from "os";
import * as path from "path";

export class CytoscapeSnapper {
    start(): Promise<CytoscapeSnapperInstance> {
        return new Promise<CytoscapeSnapperInstance>((resolve, reject) => {
            puppeteer.launch({
                headless: true,
                args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
            }).then((browser: Browser) => {
                resolve(new CytoscapeSnapperInstance(browser));
            }).catch(e => {
                reject(e);
            });
        });
    }
}

export class CytoscapeSnapperInstance {
    constructor(private readonly browser: Browser) {
    }

    shot(options: CytoscapeSnapperShotOptions): Promise<CytoscapeSnapperShotResult> {
        return new Promise<CytoscapeSnapperShotResult>((resolve, reject) => {
            let page: Page;
            return this.browser.newPage().then((puppeteerPage: Page) => {
                page = puppeteerPage;
            }).then(() => {
                return page.setViewport({width: options.width, height: options.height});
            }).then(() => {
                const patchUri = (uri: string) => {
                    if (os.platform() === 'win32') {
                        return '/' + uri.replace(/\\/g, '/');
                    } else {
                        return uri;
                    }
                };
                return page.goto('file://' + patchUri(path.join(__dirname, './browser/index.html')));
            }).then(() => {
                return page.evaluateHandle('__runCytoscape( ' + JSON.stringify(options) + ')');
            }).then(() => {
                return page.screenshot({type: 'png', quality: 0, encoding: 'base64'});
            }).then((b64Img: any) => {
                resolve(<CytoscapeSnapperShotResult>{base64: b64Img});
                return page.close();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    stop(): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            this.browser.close().then(() => {
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    }
}

export interface CytoscapeSnapperShotOptions {
    elements: object;
    layout: object;
    style: object;
    width: number;
    height: number;
    background: string;
}

export interface CytoscapeSnapperShotResult {
    base64: string;
}