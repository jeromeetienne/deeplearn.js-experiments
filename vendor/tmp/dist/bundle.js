(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.yolo_mobilenet = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licnses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
exports.__esModule = true;
var yolo_mobilenet_1 = require("./yolo_mobilenet");
exports.YoloMobileNetDetection = yolo_mobilenet_1.YoloMobileNetDetection;

},{"./yolo_mobilenet":3}],2:[function(require,module,exports){
"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
exports.__esModule = true;
var BoundingBox = /** @class */ (function () {
    function BoundingBox(x, y, w, h, conf, probs) {
        this.maxProb = -1;
        this.maxIndx = -1;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = conf;
        this.probs = probs;
    }
    BoundingBox.prototype.getMaxProb = function () {
        if (this.maxProb === -1) {
            this.maxProb = this.probs.reduce(function (a, b) { return Math.max(a, b); });
        }
        return this.maxProb;
    };
    BoundingBox.prototype.getLabel = function () {
        if (this.maxIndx === -1) {
            this.maxIndx = this.probs.indexOf(this.getMaxProb());
        }
        return BoundingBox.LABELS[this.maxIndx];
    };
    BoundingBox.prototype.getColor = function () {
        if (this.maxIndx === -1) {
            this.maxIndx = this.probs.indexOf(this.getMaxProb());
        }
        return BoundingBox.COLORS[this.maxIndx];
    };
    BoundingBox.prototype.iou = function (box) {
        var intersection = this.intersect(box);
        var union = this.w * this.h + box.w * box.h - intersection;
        return intersection / union;
    };
    BoundingBox.prototype.intersect = function (box) {
        var width = this.overlap([this.x - this.w / 2, this.x + this.w / 2], [box.x - box.w / 2, box.x + box.w / 2]);
        var height = this.overlap([this.y - this.h / 2, this.y + this.h / 2], [box.y - box.h / 2, box.y + box.h / 2]);
        return width * height;
    };
    BoundingBox.prototype.overlap = function (intervalA, intervalB) {
        var x1 = intervalA[0], x2 = intervalA[1];
        var x3 = intervalB[0], x4 = intervalB[1];
        if (x3 < x1) {
            if (x4 < x1) {
                return 0;
            }
            else {
                return Math.min(x2, x4) - x1;
            }
        }
        else {
            if (x2 < x3) {
                return 0;
            }
            else {
                return Math.min(x2, x4) - x3;
            }
        }
    };
    BoundingBox.LABELS = ['raccoon'];
    BoundingBox.COLORS = ['rgb(43,206,72)'];
    return BoundingBox;
}());
exports.BoundingBox = BoundingBox;

},{}],3:[function(require,module,exports){
(function (global){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// tslint:disable-next-line:max-line-length
var deeplearn_1 = (typeof window !== "undefined" ? window['dl'] : typeof global !== "undefined" ? global['dl'] : null);
var mobilenet_utils_1 = require("./mobilenet_utils");
var GOOGLE_CLOUD_STORAGE_DIR = 'https://storage.googleapis.com/learnjs-data/checkpoint_zoo/';
var YoloMobileNetDetection = /** @class */ (function () {
    function YoloMobileNetDetection(math) {
        this.math = math;
        // yolo variables
        this.PREPROCESS_DIVISOR = deeplearn_1.Scalar["new"](255.0 / 2);
        this.ONE = deeplearn_1.Scalar["new"](1);
        this.THRESHOLD = 0.3;
        this.THRESHOLD_SCALAR = deeplearn_1.Scalar["new"](this.THRESHOLD);
        this.ANCHORS = [
            0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778,
            9.77052, 9.16828
        ];
    }
    /**
     * Loads necessary variables for MobileNet.
     */
    YoloMobileNetDetection.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checkpointLoader, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        checkpointLoader = new deeplearn_1.CheckpointLoader(GOOGLE_CLOUD_STORAGE_DIR + 'yolo_mobilenet_v1_1.0_416/');
                        _a = this;
                        return [4 /*yield*/, checkpointLoader.getAllVariables()];
                    case 1:
                        _a.variables = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Infer through MobileNet, assumes variables have been loaded. This does
     * standard ImageNet pre-processing before inferring through the model. This
     * method returns named activations as well as pre-softmax logits.
     *
     * @param input un-preprocessed input Array.
     * @return Named activations and the pre-softmax logits.
     */
    YoloMobileNetDetection.prototype.predict = function (input) {
        var _this = this;
        // Keep a map of named activations for rendering purposes.
        var netout = this.math.scope(function (keep) {
            // Preprocess the input.
            var preprocessedInput = _this.math.subtract(_this.math.arrayDividedByScalar(input, _this.PREPROCESS_DIVISOR), _this.ONE);
            var x1 = _this.convBlock(preprocessedInput, [2, 2]);
            var x2 = _this.depthwiseConvBlock(x1, [1, 1], 1);
            var x3 = _this.depthwiseConvBlock(x2, [2, 2], 2);
            var x4 = _this.depthwiseConvBlock(x3, [1, 1], 3);
            var x5 = _this.depthwiseConvBlock(x4, [2, 2], 4);
            var x6 = _this.depthwiseConvBlock(x5, [1, 1], 5);
            var x7 = _this.depthwiseConvBlock(x6, [2, 2], 6);
            var x8 = _this.depthwiseConvBlock(x7, [1, 1], 7);
            var x9 = _this.depthwiseConvBlock(x8, [1, 1], 8);
            var x10 = _this.depthwiseConvBlock(x9, [1, 1], 9);
            var x11 = _this.depthwiseConvBlock(x10, [1, 1], 10);
            var x12 = _this.depthwiseConvBlock(x11, [1, 1], 11);
            var x13 = _this.depthwiseConvBlock(x12, [2, 2], 12);
            var x14 = _this.depthwiseConvBlock(x13, [1, 1], 13);
            var x15 = _this.math.conv2d(x14, _this.variables['conv_23/kernel'], _this.variables['conv_23/bias'], [1, 1], 'same');
            return x15.as4D(13, 13, 5, 6);
        });
        return netout;
    };
    YoloMobileNetDetection.prototype.convBlock = function (inputs, strides) {
        var x1 = this.math.conv2d(inputs, this.variables['conv1/kernel'], null, // this convolutional layer does not use bias
        strides, 'same');
        var x2 = this.math.batchNormalization3D(x1, this.variables['conv1_bn/moving_mean'], this.variables['conv1_bn/moving_variance'], .001, this.variables['conv1_bn/gamma'], this.variables['conv1_bn/beta']);
        return this.math.clip(x2, 0, 6); // simple implementation of Relu6
    };
    YoloMobileNetDetection.prototype.depthwiseConvBlock = function (inputs, strides, blockID) {
        var dwPadding = 'conv_dw_' + String(blockID) + '';
        var pwPadding = 'conv_pw_' + String(blockID) + '';
        var x1 = this.math.depthwiseConv2D(inputs, this.variables[dwPadding + '/depthwise_kernel'], strides, 'same');
        var x2 = this.math.batchNormalization3D(x1, this.variables[dwPadding + '_bn/moving_mean'], this.variables[dwPadding + '_bn/moving_variance'], .001, this.variables[dwPadding + '_bn/gamma'], this.variables[dwPadding + '_bn/beta']);
        var x3 = this.math.clip(x2, 0, 6);
        var x4 = this.math.conv2d(x3, this.variables[pwPadding + '/kernel'], null, // this convolutional layer does not use bias
        [1, 1], 'same');
        var x5 = this.math.batchNormalization3D(x4, this.variables[pwPadding + '_bn/moving_mean'], this.variables[pwPadding + '_bn/moving_variance'], .001, this.variables[pwPadding + '_bn/gamma'], this.variables[pwPadding + '_bn/beta']);
        return this.math.clip(x5, 0, 6);
    };
    YoloMobileNetDetection.prototype.interpretNetout = function (netout) {
        return __awaiter(this, void 0, void 0, function () {
            var GRID_H, GRID_W, BOX, CLASS, boxes, confidence, classes, mask, objectLikelihood, objectLikelihoodValues, i, _a, row, col, box, conf, probs, xywh, x, y, w, h, _loop_1, cls, likelyBoxes, _i, boxes_1, box;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        GRID_H = netout.shape[0];
                        GRID_W = netout.shape[1];
                        BOX = netout.shape[2];
                        CLASS = netout.shape[3] - 5;
                        boxes = [];
                        confidence = this.math.sigmoid(this.math.slice4D(netout, [0, 0, 0, 4], [GRID_H, GRID_W, BOX, 1]));
                        classes = this.math.softmax(this.math.slice4D(netout, [0, 0, 0, 5], [GRID_H, GRID_W, BOX, CLASS]));
                        classes = this.math.multiply(classes, confidence);
                        mask = this.math.step(this.math.relu(this.math.subtract(classes, this.THRESHOLD_SCALAR)));
                        classes = this.math.multiply(classes, mask);
                        objectLikelihood = this.math.sum(classes, 3);
                        return [4 /*yield*/, objectLikelihood.data()];
                    case 1:
                        objectLikelihoodValues = _b.sent();
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < objectLikelihoodValues.length)) return [3 /*break*/, 6];
                        if (!(objectLikelihoodValues[i] > 0)) return [3 /*break*/, 5];
                        _a = objectLikelihood.indexToLoc(i), row = _a[0], col = _a[1], box = _a[2];
                        conf = confidence.get(row, col, box, 0);
                        return [4 /*yield*/, this.math
                                .slice4D(classes, [row, col, box, 0], [1, 1, 1, CLASS])
                                .data()];
                    case 3:
                        probs = _b.sent();
                        return [4 /*yield*/, this.math.slice4D(netout, [row, col, box, 0], [1, 1, 1, 4])
                                .data()];
                    case 4:
                        xywh = _b.sent();
                        x = xywh[0];
                        y = xywh[1];
                        w = xywh[2];
                        h = xywh[3];
                        x = (col + this.sigmoid(x)) / GRID_W;
                        y = (row + this.sigmoid(y)) / GRID_H;
                        w = this.ANCHORS[2 * box + 0] * Math.exp(w) / GRID_W;
                        h = this.ANCHORS[2 * box + 1] * Math.exp(h) / GRID_H;
                        boxes.push(new mobilenet_utils_1.BoundingBox(x, y, w, h, conf, probs));
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        _loop_1 = function (cls) {
                            var allProbs = boxes.map(function (box) { return box.probs[cls]; });
                            var indices = new Array(allProbs.length);
                            for (var i = 0; i < allProbs.length; ++i) {
                                indices[i] = i;
                            }
                            indices.sort(function (a, b) { return allProbs[a] > allProbs[b] ? 1 : 0; });
                            for (var i = 0; i < allProbs.length; i++) {
                                var indexI = indices[i];
                                if (boxes[indexI].probs[cls] === 0) {
                                    continue;
                                }
                                else {
                                    for (var j = i + 1; j < allProbs.length; j++) {
                                        var indexJ = indices[j];
                                        if (boxes[indexI].iou(boxes[indexJ]) > 0.4) {
                                            boxes[indexJ].probs[cls] = 0;
                                        }
                                    }
                                }
                            }
                        };
                        // suppress nonmaximal boxes
                        for (cls = 0; cls < CLASS; cls++) {
                            _loop_1(cls);
                        }
                        likelyBoxes = [];
                        for (_i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
                            box = boxes_1[_i];
                            if (box.getMaxProb() > this.THRESHOLD) {
                                likelyBoxes.push(box);
                            }
                        }
                        return [2 /*return*/, likelyBoxes];
                }
            });
        });
    };
    YoloMobileNetDetection.prototype.sigmoid = function (x) {
        return 1. / (1. + Math.exp(-x));
    };
    YoloMobileNetDetection.prototype.dispose = function () {
        for (var varName in this.variables) {
            this.variables[varName].dispose();
        }
    };
    return YoloMobileNetDetection;
}());
exports.YoloMobileNetDetection = YoloMobileNetDetection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./mobilenet_utils":2}]},{},[1])(1)
});