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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
                    this.target = null;
                    if (element) {
                        this.target = element;
                        this.setEventListener(callback);
                        this.setupInput(callback);
                    }
                }
                DropArea.prototype.setEventListener = function (callback) {
                    document.body.addEventListener('dragenter', function (e) { });
                    document.body.addEventListener('dragleave', function (e) { });
                    document.body.addEventListener('dragover', DropArea.onDragOver);
                    document.body.addEventListener('drop', function (e) { return DropArea.onDrop(e, callback); });
                    this.target.addEventListener('dragenter', this.onDragEnter.bind(this));
                    this.target.addEventListener('dragleave', this.onDragLeave.bind(this));
                    this.target.addEventListener('dragover', DropArea.onDragOver);
                    this.target.addEventListener('drop', function (e) { return DropArea.onDrop(e, callback); });
                    this.target.setAttribute('data-focus', 'false');
                };
                DropArea.prototype.setupInput = function (callback) {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.style.display = 'none';
                    this.target.append(input);
                    this.target.addEventListener('click', function () { return input.click(); });
                    input.addEventListener('change', function (ev) {
                        return callback(ev.target.files[0]);
                    });
                };
                DropArea.prototype.onDragEnter = function (e) {
                    this.target.setAttribute('data-focus', 'true');
                };
                DropArea.prototype.onDragLeave = function (e) {
                    this.target.setAttribute('data-focus', 'false');
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
                    navigator.usb.addEventListener('connect', function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.connectDevice(ev.device)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    navigator.usb
                        .getDevices()
                        .then(function (devices) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = devices.length;
                                if (!_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.connectDevice(devices[0])];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2: return [2 /*return*/, _a];
                        }
                    }); }); });
                }
                WebUSBController.prototype.connectDevice = function (device) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, device.open()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, device.selectConfiguration(1)];
                                case 2:
                                    _a.sent();
                                    device.configuration.interfaces.map(function (element) {
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
                                    return [4 /*yield*/, device.claimInterface(this.interfaceNumber)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, device.selectAlternateInterface(this.interfaceNumber, 0)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, device.claimInterface(this.interfaceNumber)];
                                case 5:
                                    _a.sent();
                                    device
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
                                    document.dispatchEvent(new CustomEvent(this.connectEventKey, {
                                        detail: device,
                                    }));
                                    this.device = device;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                WebUSBController.prototype.connect = function (options) {
                    return __awaiter(this, void 0, void 0, function () {
                        var device;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, navigator.usb.requestDevice(options)];
                                case 1:
                                    device = _a.sent();
                                    return [4 /*yield*/, this.connectDevice(device)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, device];
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
    var array, getGridMatrix, arrayFlat, gridMatrixToNeopixelArray, wait, randomIntFromInterval;
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
            exports_4("wait", wait = function (ms) {
                if (ms === void 0) { ms = 2000; }
                return new Promise(function (resolve) { return window.setTimeout(function () { return resolve(); }, ms); });
            });
            exports_4("randomIntFromInterval", randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            });
        }
    };
});
System.register("matrix", ["utils", "WebUSBController"], function (exports_5, context_5) {
    "use strict";
    var utils_1, WebUSBController_1, Matrix;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (WebUSBController_1_1) {
                WebUSBController_1 = WebUSBController_1_1;
            }
        ],
        execute: function () {
            Matrix = /** @class */ (function () {
                function Matrix(size) {
                    this.$pixelArea = null;
                    this.gridMatrix = utils_1.getGridMatrix([0, 0, 0], 0);
                    this.Controller = null;
                    this.matrixSize = 0;
                    this.Controller = new WebUSBController_1.default();
                    this.$pixelArea = document.querySelector('#matrix');
                    this.matrixSize = size;
                    this.setUpMatrix();
                }
                Matrix.prototype.setUpMatrix = function () {
                    var _this = this;
                    this.$pixelArea.style['grid-template-columns'] = "repeat(".concat(this.matrixSize, ", 1fr)");
                    this.$pixelArea.style['grid-template-rows'] = "repeat(".concat(this.matrixSize, ", 1fr)");
                    this.$pixelArea
                        .querySelectorAll('.matrix__pixel')
                        .forEach(function (e) { return e.remove(); });
                    this.gridMatrix = utils_1.getGridMatrix([0, 0, 0], this.matrixSize);
                    var i = 0;
                    this.gridMatrix.map(function (cols) {
                        return cols.map(function () {
                            var el = document.createElement('div');
                            el.classList.add('matrix__pixel');
                            el.setAttribute('data-pixelindex', String(i));
                            _this.$pixelArea.appendChild(el);
                            i++;
                        });
                    });
                };
                Matrix.prototype.webUSBConnect = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.Controller.connect({ filters: [{ vendorId: 0x2e8a }] })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.Controller.send(new Uint8Array(utils_1.gridMatrixToNeopixelArray(this.gridMatrix)))];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                Matrix.prototype.setLoading = function (loading) {
                    this.$pixelArea.setAttribute('data-loading', loading ? 'true' : 'false');
                };
                Matrix.prototype.setGridMatrixFromCanvas = function (ctx) {
                    this.gridMatrix = this.gridMatrix.map(function (cols, rowIndex) {
                        return cols.map(function (pixel, colIndex) {
                            var canvasColor = ctx.getImageData(colIndex, rowIndex, 1, 1).data;
                            return [canvasColor[0], canvasColor[1], canvasColor[2]];
                        });
                    });
                };
                Matrix.prototype.setGridMatrixFromArray = function (array) {
                    this.gridMatrix = this.gridMatrix.map(function (cols, rowIndex) {
                        return cols.map(function (pixel, colIndex) { return [
                            array[rowIndex][colIndex][0],
                            array[rowIndex][colIndex][1],
                            array[rowIndex][colIndex][2],
                        ]; });
                    });
                };
                Matrix.prototype.reDrawMatrix = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    this.gridMatrix.map(function (cols) {
                                        return cols.map(function (_a) {
                                            var r = _a[0], g = _a[1], b = _a[2];
                                            var el = document.querySelector("[data-pixelindex=\"".concat(i, "\"]"));
                                            el.style.backgroundColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
                                            i++;
                                        });
                                    });
                                    return [4 /*yield*/, this.Controller.send(new Uint8Array(utils_1.gridMatrixToNeopixelArray(this.gridMatrix)))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                return Matrix;
            }());
            exports_5("default", Matrix);
        }
    };
});
System.register("snake", ["utils"], function (exports_6, context_6) {
    "use strict";
    var utils_2, COLLISION_EVENT_KEY, UPDATE_EVENT_KEY, INSTANCES, DIRECTIONS, hasColision, MatrixSnake;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }
        ],
        execute: function () {
            COLLISION_EVENT_KEY = 'nm-snake-collision-emitter';
            UPDATE_EVENT_KEY = 'nm-snake-update-emitter';
            INSTANCES = 0;
            (function (DIRECTIONS) {
                DIRECTIONS["UP"] = "UP";
                DIRECTIONS["LEFT"] = "LEFT";
                DIRECTIONS["RIGHT"] = "RIGHT";
                DIRECTIONS["DOWN"] = "DOWN";
            })(DIRECTIONS || (DIRECTIONS = {}));
            exports_6("DIRECTIONS", DIRECTIONS);
            hasColision = function (pixel, snake) {
                return snake.length >= 1 &&
                    snake.find(function (snakePixel) { return snakePixel.x === pixel.x && snakePixel.y === pixel.y; }) !== undefined;
            };
            MatrixSnake = /** @class */ (function () {
                function MatrixSnake(_a) {
                    var _b = _a.width, width = _b === void 0 ? 16 : _b, _c = _a.height, height = _c === void 0 ? 16 : _c, _d = _a.fps, fps = _d === void 0 ? 4 : _d;
                    this.width = 16;
                    this.height = 16;
                    this.fps = 4;
                    this.indexYMax = this.height - 1;
                    this.indexXMax = this.width - 1;
                    this.interval = 0;
                    this.gameStep = null;
                    this.screen = [];
                    this.collisionEventKey = null;
                    this.updateEventKey = null;
                    this.width = width;
                    this.height = height;
                    this.fps = fps;
                    this.indexYMax = this.height - 1;
                    this.indexXMax = this.width - 1;
                    INSTANCES++;
                    this.collisionEventKey = COLLISION_EVENT_KEY + '-' + INSTANCES;
                    this.updateEventKey = UPDATE_EVENT_KEY + '-' + INSTANCES;
                }
                MatrixSnake.prototype.onCollision = function (callback) {
                    document.addEventListener(this.collisionEventKey, function (_a) {
                        callback();
                    });
                };
                MatrixSnake.prototype.setDirection = function (direction) {
                    this.gameStep = __assign(__assign({}, this.gameStep), { direction: direction });
                };
                MatrixSnake.prototype.onStepupdate = function (callback) {
                    document.addEventListener(this.updateEventKey, function (_a) {
                        var detail = _a.detail;
                        callback(detail);
                    });
                };
                MatrixSnake.prototype.restart = function () {
                    var _this = this;
                    this.stopGame();
                    this.interval = window.setInterval(function () { return _this.doStep(); }, Math.round((60 * 10) / this.fps));
                    this.gameStep = {
                        direction: DIRECTIONS.RIGHT,
                        snake: [
                            {
                                x: Math.round(this.width / 2),
                                y: Math.round(this.height / 2),
                            },
                        ],
                        food: this.generateFood(),
                    };
                    this.screen = Array(this.height).fill(Array(this.width).fill(0));
                };
                MatrixSnake.prototype.stopGame = function () {
                    clearInterval(this.interval);
                };
                MatrixSnake.prototype.getNextPixel = function (_a, direction) {
                    var x = _a.x, y = _a.y;
                    var indexYMax = this.height - 1;
                    var indexXMax = this.width - 1;
                    switch (direction) {
                        case DIRECTIONS.LEFT:
                            return {
                                x: x,
                                y: y - 1 < 0 ? indexYMax : y - 1,
                            };
                        case DIRECTIONS.RIGHT:
                            return {
                                x: x,
                                y: y + 1 > indexYMax ? 0 : y + 1,
                            };
                        case DIRECTIONS.UP:
                            return {
                                x: x - 1 < 0 ? indexXMax : x - 1,
                                y: y,
                            };
                        case DIRECTIONS.DOWN:
                            return {
                                x: x + 1 > indexXMax ? 0 : x + 1,
                                y: y,
                            };
                        default:
                            console.log('none');
                    }
                };
                MatrixSnake.prototype.generateFood = function (snake) {
                    if (snake === void 0) { snake = null; }
                    var food = {
                        x: utils_2.randomIntFromInterval(0, this.indexXMax),
                        y: utils_2.randomIntFromInterval(0, this.indexYMax),
                    };
                    return food;
                    var validPositionFound = false;
                    while (validPositionFound) {
                        food = {
                            x: utils_2.randomIntFromInterval(0, this.indexXMax),
                            y: utils_2.randomIntFromInterval(0, this.indexYMax),
                        };
                        if (!hasColision(food, snake)) {
                            validPositionFound = true;
                        }
                    }
                    return food;
                };
                MatrixSnake.prototype.doStep = function () {
                    var newGameStep = this.gameStep;
                    var nextPixel = this.getNextPixel(newGameStep.snake[0], newGameStep.direction);
                    var oldSnakeWithoutFood = newGameStep.snake.filter(function (pixel, i, full) { return i !== full.length - 1; });
                    var newSnake = __spreadArray([nextPixel], newGameStep.snake, true);
                    var snakeWithoutFood = __spreadArray([nextPixel], oldSnakeWithoutFood, true);
                    if (hasColision(nextPixel, oldSnakeWithoutFood)) {
                        document.dispatchEvent(new CustomEvent(this.collisionEventKey));
                        return;
                    }
                    var foundFood = nextPixel.x === newGameStep.food.x && nextPixel.y === newGameStep.food.y;
                    var snake = foundFood ? newSnake : snakeWithoutFood;
                    this.gameStep = __assign(__assign({}, this.gameStep), { snake: snake, food: foundFood ? this.generateFood() : newGameStep.food });
                    document.dispatchEvent(new CustomEvent(this.updateEventKey, { detail: this.gameStep }));
                };
                return MatrixSnake;
            }());
            exports_6("default", MatrixSnake);
        }
    };
});
System.register("index", ["DropArea", "utils", "image", "matrix", "snake"], function (exports_7, context_7) {
    "use strict";
    var DropArea_1, utils_3, image_1, matrix_1, snake_1, CANVAS_SIZE;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (DropArea_1_1) {
                DropArea_1 = DropArea_1_1;
            },
            function (utils_3_1) {
                utils_3 = utils_3_1;
            },
            function (image_1_1) {
                image_1 = image_1_1;
            },
            function (matrix_1_1) {
                matrix_1 = matrix_1_1;
            },
            function (snake_1_1) {
                snake_1 = snake_1_1;
            }
        ],
        execute: function () {
            CANVAS_SIZE = 16;
            (function () {
                var _this = this;
                document.addEventListener('DOMContentLoaded', function (event) {
                    var MatrixInstance = new matrix_1.default(CANVAS_SIZE);
                    var Snake = new snake_1.default({
                        width: CANVAS_SIZE,
                        height: CANVAS_SIZE,
                        fps: 3,
                    });
                    var textDecoder = new TextDecoder('utf-8');
                    var $canvas = document.querySelector('#image-canvas');
                    var $connectArea = document.querySelector('#connect-area');
                    var $connectButton = document.querySelector('#connect');
                    var $connectButtonSkip = document.querySelector('#connect-skip');
                    var $dropArea = document.querySelector('#drop');
                    /**
                     * Image
                     */
                    var onFileChange = function (file) { return __awaiter(_this, void 0, void 0, function () {
                        var src, ctx, image, imgSize, left, top;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, image_1.srcFromFile(file)];
                                case 1:
                                    src = _a.sent();
                                    MatrixInstance.setLoading(true);
                                    $dropArea.style.backgroundImage = "url(".concat(src, ")");
                                    $canvas.width = CANVAS_SIZE;
                                    $canvas.height = CANVAS_SIZE;
                                    ctx = $canvas.getContext('2d');
                                    return [4 /*yield*/, image_1.loadImageFromSrc(src)];
                                case 2:
                                    image = _a.sent();
                                    imgSize = Math.min(image.width, image.height);
                                    left = (image.width - imgSize) / 2;
                                    top = (image.height - imgSize) / 2;
                                    ctx.drawImage(image, left, top, imgSize, imgSize, 0, 0, $canvas.width, $canvas.height);
                                    MatrixInstance.setGridMatrixFromCanvas(ctx);
                                    return [4 /*yield*/, utils_3.wait(1000)];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, MatrixInstance.reDrawMatrix()];
                                case 4:
                                    _a.sent();
                                    MatrixInstance.setLoading(false);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    /**
                     * Snake
                     */
                    Snake.onStepupdate(function (step) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    document.body.classList.contains('snake')
                                        ? MatrixInstance.setGridMatrixFromArray(utils_3.getGridMatrix([0, 0, 0], CANVAS_SIZE).map(function (cols, rowIndex) {
                                            return cols.map(function (pixel, colIndex) {
                                                return rowIndex === step.food.x && colIndex === step.food.y
                                                    ? [255, 0, 0]
                                                    : step.snake.findIndex(function (snakePixel) {
                                                        return snakePixel.x === rowIndex && snakePixel.y === colIndex;
                                                    }) !== -1
                                                        ? [255, 255, 255]
                                                        : [0, 0, 0];
                                            });
                                        }))
                                        : Snake.stopGame();
                                    return [4 /*yield*/, MatrixInstance.reDrawMatrix()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    document
                        .querySelector('#snake-button-restart')
                        .addEventListener('click', function () { return Snake.restart(); });
                    document
                        .querySelector('#snake-button-up')
                        .addEventListener('click', function () { return Snake.setDirection(snake_1.DIRECTIONS.UP); });
                    document
                        .querySelector('#snake-button-left')
                        .addEventListener('click', function () { return Snake.setDirection(snake_1.DIRECTIONS.LEFT); });
                    document
                        .querySelector('#snake-button-right')
                        .addEventListener('click', function () { return Snake.setDirection(snake_1.DIRECTIONS.RIGHT); });
                    document
                        .querySelector('#snake-button-down')
                        .addEventListener('click', function () { return Snake.setDirection(snake_1.DIRECTIONS.DOWN); });
                    window.addEventListener('keydown', function (e) {
                        if (e.key === 'ArrowUp') {
                            Snake.setDirection(snake_1.DIRECTIONS.UP);
                        }
                        else if (e.key === 'ArrowDown') {
                            Snake.setDirection(snake_1.DIRECTIONS.DOWN);
                        }
                        else if (e.key === 'ArrowLeft') {
                            Snake.setDirection(snake_1.DIRECTIONS.LEFT);
                        }
                        else if (e.key === 'ArrowRight') {
                            Snake.setDirection(snake_1.DIRECTIONS.RIGHT);
                        }
                    });
                    /**
                     * Setup
                     */
                    new DropArea_1.default(document.querySelector('#drop'), onFileChange);
                    $connectButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, MatrixInstance.webUSBConnect()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    $connectButtonSkip.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            $connectArea.style.display = 'none';
                            return [2 /*return*/];
                        });
                    }); });
                    MatrixInstance.Controller.onReceive(function (data) {
                        console.log('received', { data: data, decoded: textDecoder.decode(data) });
                    });
                    MatrixInstance.Controller.onDeviceConnect(function (device) {
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
