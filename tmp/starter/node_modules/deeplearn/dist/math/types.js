"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SumTypesMap;
(function (SumTypesMap) {
    SumTypesMap["float32"] = "float32";
    SumTypesMap["int32"] = "int32";
    SumTypesMap["bool"] = "int32";
})(SumTypesMap = exports.SumTypesMap || (exports.SumTypesMap = {}));
var UpcastInt32AndMap;
(function (UpcastInt32AndMap) {
    UpcastInt32AndMap["float32"] = "float32";
    UpcastInt32AndMap["int32"] = "int32";
    UpcastInt32AndMap["bool"] = "int32";
})(UpcastInt32AndMap = exports.UpcastInt32AndMap || (exports.UpcastInt32AndMap = {}));
var UpcastBoolAndMap;
(function (UpcastBoolAndMap) {
    UpcastBoolAndMap["float32"] = "float32";
    UpcastBoolAndMap["int32"] = "int32";
    UpcastBoolAndMap["bool"] = "bool";
})(UpcastBoolAndMap = exports.UpcastBoolAndMap || (exports.UpcastBoolAndMap = {}));
var UpcastFloat32AndMap;
(function (UpcastFloat32AndMap) {
    UpcastFloat32AndMap["float32"] = "float32";
    UpcastFloat32AndMap["int32"] = "float32";
    UpcastFloat32AndMap["bool"] = "float32";
})(UpcastFloat32AndMap = exports.UpcastFloat32AndMap || (exports.UpcastFloat32AndMap = {}));
var upcastTypeMap = {
    float32: UpcastFloat32AndMap,
    int32: UpcastInt32AndMap,
    bool: UpcastBoolAndMap
};
function upcastType(typeA, typeB) {
    return upcastTypeMap[typeA][typeB];
}
exports.upcastType = upcastType;
