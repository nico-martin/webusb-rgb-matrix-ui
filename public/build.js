var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
System.register("DropArea", [], function (exports_1, context_1) {
    "use strict";
    var DropArea;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DropArea = /** @class */ (function () {
                function DropArea(element, callback) {
                    this.element = null;
                    this.element = element;
                    this.setEventListener(callback);
                    this.setupInput(callback);
                }
                DropArea.prototype.setEventListener = function (callback) {
                    this.element.addEventListener('dragenter', DropArea.onDragEnter);
                    this.element.addEventListener('dragleave', DropArea.onDragLeave);
                    this.element.addEventListener('dragover', DropArea.onDragOver);
                    this.element.addEventListener('drop', function (e) { return DropArea.onDrop(e, callback); });
                    this.element.setAttribute('data-focus', 'false');
                };
                DropArea.prototype.setupInput = function (callback) {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.style.display = 'none';
                    this.element.append(input);
                    this.element.addEventListener('click', function () { return input.click(); });
                    input.addEventListener('change', function (ev) {
                        return callback(ev.target.files[0]);
                    });
                };
                DropArea.onDragEnter = function (e) {
                    e.target.setAttribute('data-focus', 'true');
                };
                DropArea.onDragLeave = function (e) {
                    e.target.setAttribute('data-focus', 'false');
                };
                DropArea.onDragOver = function (e) {
                    e.preventDefault();
                };
                DropArea.onDrop = function (e, callback) {
                    e.preventDefault();
                    e.target.setAttribute('data-focus', 'false');
                    var dt = e.dataTransfer;
                    var files = dt.files;
                    callback(files[0]);
                };
                return DropArea;
            }());
            exports_1("default", DropArea);
        }
    };
});
System.register("WebUSBController", [], function (exports_2, context_2) {
    "use strict";
    var RECEIVE_EVENT_KEY, CONNECT_EVENT_KEY, INSTANCES, WebUSBController;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            RECEIVE_EVENT_KEY = 'nm-webusbreceive-emitter';
            CONNECT_EVENT_KEY = 'nm-connect-emitter';
            INSTANCES = 0;
            WebUSBController = /** @class */ (function () {
                function WebUSBController() {
                    var _this = this;
                    this.interfaceNumber = 0;
                    this.endpointIn = 0;
                    this.endpointOut = 0;
                    this.receiveEventKey = null;
                    this.connectEventKey = null;
                    this.readLoop = function () {
                        _this.device.transferIn(_this.endpointIn, 64).then(function (result) {
                            document.dispatchEvent(new CustomEvent(_this.receiveEventKey, {
                                detail: result.data,
                            }));
                            _this.readLoop();
                        }, function (error) { return console.log('onReceiveError', error); });
                    };
                    INSTANCES++;
                    this.receiveEventKey = RECEIVE_EVENT_KEY + '-' + INSTANCES;
                    this.connectEventKey = CONNECT_EVENT_KEY + '-' + INSTANCES;
                    this.device = null;
                    navigator.usb.addEventListener('disconnect', function (ev) {
                        if (_this.device === ev.device) {
                            _this.device = null;
                            document.dispatchEvent(new CustomEvent(_this.connectEventKey, {
                                detail: null,
                            }));
                        }
                    });
                    navigator.usb.addEventListener('connect', function (ev) {
                        // todo: check if this work when coming from the prompt (maybe need to add a check before)
                        _this.device = ev.device;
                        document.dispatchEvent(new CustomEvent(_this.connectEventKey, {
                            detail: ev.device,
                        }));
                    });
                }
                WebUSBController.prototype.connect = function (options) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = this;
                                    return [4 /*yield*/, navigator.usb.requestDevice(options)];
                                case 1:
                                    _a.device = _b.sent();
                                    return [4 /*yield*/, this.device.open()];
                                case 2:
                                    _b.sent();
                                    return [4 /*yield*/, this.device.selectConfiguration(1)];
                                case 3:
                                    _b.sent();
                                    this.device.configuration.interfaces.map(function (element) {
                                        return element.alternates.map(function (elementalt) {
                                            if (elementalt.interfaceClass == 0xff) {
                                                _this.interfaceNumber = element.interfaceNumber;
                                                elementalt.endpoints.map(function (elementendpoint) {
                                                    if (elementendpoint.direction == 'out') {
                                                        _this.endpointOut = elementendpoint.endpointNumber;
                                                    }
                                                    if (elementendpoint.direction == 'in') {
                                                        _this.endpointIn = elementendpoint.endpointNumber;
                                                    }
                                                });
                                            }
                                        });
                                    });
                                    return [4 /*yield*/, this.device.claimInterface(this.interfaceNumber)];
                                case 4:
                                    _b.sent();
                                    return [4 /*yield*/, this.device.selectAlternateInterface(this.interfaceNumber, 0)];
                                case 5:
                                    _b.sent();
                                    return [4 /*yield*/, this.device.claimInterface(this.interfaceNumber)];
                                case 6:
                                    _b.sent();
                                    this.device
                                        .controlTransferOut({
                                        requestType: 'class',
                                        recipient: 'interface',
                                        request: 0x22,
                                        value: 0x01,
                                        index: this.interfaceNumber,
                                    })
                                        .then(function () {
                                        _this.readLoop();
                                    });
                                    document.dispatchEvent(new CustomEvent(this.connectEventKey, {
                                        detail: this.device,
                                    }));
                                    return [2 /*return*/, this.device];
                            }
                        });
                    });
                };
                WebUSBController.prototype.disconnect = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.device.close()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                WebUSBController.prototype.send = function (data) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.device) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.device.transferOut(this.endpointOut, data)];
                                case 1: return [2 /*return*/, _a.sent()];
                                case 2:
                                    console.error('ERROR: device not connected');
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                WebUSBController.prototype.onReceive = function (callback) {
                    document.addEventListener(this.receiveEventKey, function (_a) {
                        var detail = _a.detail;
                        callback(detail);
                    });
                };
                WebUSBController.prototype.onDeviceConnect = function (callback) {
                    document.addEventListener(this.connectEventKey, function (_a) {
                        var detail = _a.detail;
                        callback(detail);
                    });
                };
                return WebUSBController;
            }());
            exports_2("default", WebUSBController);
        }
    };
});
System.register("image", [], function (exports_3, context_3) {
    "use strict";
    var srcFromFile, loadImageFromSrc;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("srcFromFile", srcFromFile = function (file) {
                return new Promise(function (resolve) {
                    var fr = new FileReader();
                    fr.onload = function (e) {
                        resolve(String(e.target.result));
                    };
                    fr.readAsDataURL(file);
                });
            });
            exports_3("loadImageFromSrc", loadImageFromSrc = function (src) {
                return new Promise(function (resolve) {
                    var image = new Image();
                    image.onload = function () {
                        resolve(image);
                    };
                    image.src = src;
                });
            });
        }
    };
});
System.register("utils", [], function (exports_4, context_4) {
    "use strict";
    var array, getGridMatrix, arrayFlat, gridMatrixToNeopixelArray;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("array", array = function (length) {
                return new Array(length).fill('').map(function () { return null; });
            });
            exports_4("getGridMatrix", getGridMatrix = function (_a, size) {
                var _b = _a === void 0 ? [0, 0, 0] : _a, r = _b[0], g = _b[1], b = _b[2];
                if (size === void 0) { size = 16; }
                return array(size).map(function () { return array(size).map(function () { return [r, g, b]; }); });
            });
            exports_4("arrayFlat", arrayFlat = function (array) {
                return array.reduce(function (acc, current) { return __spreadArray(__spreadArray([], acc, true), current, true); }, []);
            });
            exports_4("gridMatrixToNeopixelArray", gridMatrixToNeopixelArray = function (gridMatrix) {
                var size = gridMatrix.length;
                var ledMatrix = getGridMatrix();
                gridMatrix.map(function (col, rowIndex) {
                    return col.map(function (pixel, colIndex) {
                        ledMatrix[rowIndex][rowIndex % 2 !== 1 ? size - colIndex - 1 : colIndex] =
                            pixel;
                    });
                });
                return arrayFlat(arrayFlat(ledMatrix));
            });
        }
    };
});
System.register("index", ["WebUSBController", "DropArea", "utils", "image"], function (exports_5, context_5) {
    "use strict";
    var WebUSBController_1, DropArea_1, utils_1, image_1, CANVAS_SIZE;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (WebUSBController_1_1) {
                WebUSBController_1 = WebUSBController_1_1;
            },
            function (DropArea_1_1) {
                DropArea_1 = DropArea_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (image_1_1) {
                image_1 = image_1_1;
            }
        ],
        execute: function () {
            CANVAS_SIZE = 16;
            (function () {
                var _this = this;
                document.addEventListener('DOMContentLoaded', function (event) {
                    var Controller = new WebUSBController_1.default();
                    var textDecoder = new TextDecoder('utf-8');
                    var $canvas = document.querySelector('#image-canvas');
                    var $pixelArea = document.querySelector('#matrix');
                    var $connectArea = document.querySelector('#connect-area');
                    var $connectButton = document.querySelector('#connect');
                    var $connectButtonSkip = document.querySelector('#connect-skip');
                    var gridMatrix = utils_1.getGridMatrix([0, 0, 0], 0);
                    /**
                     * Methods
                     */
                    var setUpMatrix = function (size) {
                        $canvas.width = size;
                        $canvas.height = size;
                        $pixelArea.style['grid-template-columns'] = "repeat(".concat(size, ", 1fr)");
                        $pixelArea.style['grid-template-rows'] = "repeat(".concat(size, ", 1fr)");
                        gridMatrix = utils_1.getGridMatrix([0, 0, 0], size);
                        var html = '';
                        var i = 0;
                        gridMatrix.map(function (cols) {
                            return cols.map(function () {
                                html += "<div class=\"matrix__pixel\" data-pixelindex=\"".concat(i, "\" ></div>");
                                i++;
                            });
                        });
                        $pixelArea.innerHTML = html;
                    };
                    var onFileChange = function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var src, ctx, image, imgSize, left, top;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, image_1.srcFromFile(file)];
                                case 1:
                                    src = _a.sent();
                                    ctx = $canvas.getContext('2d');
                                    return [4 /*yield*/, image_1.loadImageFromSrc(src)];
                                case 2:
                                    image = _a.sent();
                                    imgSize = Math.min(image.width, image.height);
                                    left = (image.width - imgSize) / 2;
                                    top = (image.height - imgSize) / 2;
                                    ctx.drawImage(image, left, top, imgSize, imgSize, 0, 0, $canvas.width, $canvas.height);
                                    gridMatrix = gridMatrix.map(function (cols, rowIndex) {
                                        return cols.map(function (pixel, colIndex) {
                                            var canvasColor = ctx.getImageData(colIndex, rowIndex, 1, 1).data;
                                            return [canvasColor[0], canvasColor[1], canvasColor[2]];
                                        });
                                    });
                                    return [4 /*yield*/, reDrawMatrix()];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    var reDrawMatrix = function () { return __awaiter(_this, void 0, void 0, function () {
                        var i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    gridMatrix.map(function (cols) {
                                        return cols.map(function (_a) {
                                            var r = _a[0], g = _a[1], b = _a[2];
                                            var el = document.querySelector("[data-pixelindex=\"".concat(i, "\"]"));
                                            el.style.backgroundColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
                                            i++;
                                        });
                                    });
                                    return [4 /*yield*/, Controller.send(new Uint8Array(utils_1.gridMatrixToNeopixelArray(gridMatrix)))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    /**
                     * Setup
                     */
                    setUpMatrix(CANVAS_SIZE);
                    new DropArea_1.default(document.querySelector('#drop'), onFileChange);
                    $connectButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Controller.connect({ filters: [{ vendorId: 0x2341 }] })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, Controller.send(new Uint8Array(utils_1.gridMatrixToNeopixelArray(gridMatrix)))];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    $connectButtonSkip.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            $connectArea.style.display = 'none';
                            return [2 /*return*/];
                        });
                    }); });
                    Controller.onReceive(function (data) {
                        console.log('received', { data: data, decoded: textDecoder.decode(data) });
                    });
                    Controller.onDeviceConnect(function (device) {
                        console.log(device);
                        if (device) {
                            $connectArea.style.display = 'none';
                        }
                        else {
                            $connectArea.style.display = 'flex';
                        }
                    });
                });
            })();
        }
    };
});
