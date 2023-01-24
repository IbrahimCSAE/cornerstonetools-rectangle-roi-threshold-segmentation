/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cornerstone-tools"), require("cornerstone-core"));
	else if(typeof define === 'function' && define.amd)
		define("cornerstonetools-rectangle-roi-threshold-segmentation", ["cornerstone-tools", "cornerstone-core"], factory);
	else if(typeof exports === 'object')
		exports["cornerstonetools-rectangle-roi-threshold-segmentation"] = factory(require("cornerstone-tools"), require("cornerstone-core"));
	else
		root["cornerstonetools-rectangle-roi-threshold-segmentation"] = factory(root["cornerstoneTools"], root["cornerstone"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_cornerstone_tools__, __WEBPACK_EXTERNAL_MODULE_cornerstone_core__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RectangleROIThresholdSegmentation.js":
/*!**************************************************!*\
  !*** ./src/RectangleROIThresholdSegmentation.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RectangleROIThresholdSegmentation)\n/* harmony export */ });\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cornerstone-tools */ \"cornerstone-tools\");\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cornerstone_tools__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _paint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paint */ \"./src/paint.js\");\n\r\n\r\n\r\nconst BaseTool = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default()[\"import\"]('base/BaseTool');\r\nconst {segRectangleFillInsideCursor} = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default()[\"import\"]('tools/cursors');\r\n\r\n\r\n\r\n/**\r\n * @public\r\n * @class RectangleROIThresholdSegmentation\r\n * @memberof Tools\r\n * @classdesc Tool for manipulating labelmap data by drawing pixels within the threshold range inside a rectangle.\r\n * @extends Tools.Base.BaseTool\r\n */\r\nclass RectangleROIThresholdSegmentation extends BaseTool {\r\n  /** @inheritdoc */\r\n  constructor(props = {}) {\r\n    const defaultProps = {\r\n      name: 'RectangleROIThresholdSegmentation',\r\n      strategies: {\r\n        PAINT: _paint__WEBPACK_IMPORTED_MODULE_1__.paint,\r\n      },\r\n      cursors: {\r\n        PAINT: segRectangleFillInsideCursor,\r\n      },\r\n      configuration : {\r\n        thresholdLow: 200,\r\n        thresholdHigh: 1000,\r\n        numberOfSlices: 200,\r\n        inside: true,\r\n      },\r\n      defaultStrategy: 'PAINT',\r\n      supportedInteractionTypes: ['Mouse', 'Touch'],\r\n      mixins: ['rectangleSegmentationMixin'],\r\n    };\r\n\r\n    super(props, defaultProps);\r\n  }\r\n\r\n    /**\r\n   * Apply the currently set/active strategy.\r\n   *\r\n   * @public\r\n   * @instance\r\n   * @method applyActiveStrategy\r\n   * @memberof Tools.Base.BaseTool\r\n   *\r\n   * @param {Object} evt The event that triggered the strategies application\r\n   * @param {Object} operationData - An object containing extra data not present in the `evt`,\r\n   *                                 required to apply the strategy.\r\n   * @returns {*} strategies vary widely; check each specific strategy to find expected return value\r\n   */\r\n    applyActiveStrategy(evt, operationData) {\r\n      operationData.configuration = this.configuration;\r\n      return this.strategies[this.activeStrategy].call(this, evt, operationData);\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://cornerstonetools-rectangle-roi-threshold-segmentation/./src/RectangleROIThresholdSegmentation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _RectangleROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RectangleROIThresholdSegmentation */ \"./src/RectangleROIThresholdSegmentation.js\");\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_RectangleROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack://cornerstonetools-rectangle-roi-threshold-segmentation/./src/index.js?");

/***/ }),

/***/ "./src/paint.js":
/*!**********************!*\
  !*** ./src/paint.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"paint\": () => (/* binding */ paint)\n/* harmony export */ });\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cornerstone-tools */ \"cornerstone-tools\");\n/* harmony import */ var cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cornerstone_tools__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cornerstone_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cornerstone-core */ \"cornerstone-core\");\n/* harmony import */ var cornerstone_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cornerstone_core__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst { getBoundingBoxAroundPolygon, getDiffBetweenPixelData } =\r\n  cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default()[\"import\"](\"util/segmentationUtils\");\r\n\r\nconst triggerEvent = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default()[\"import\"](\"util/triggerEvent\");\r\n\r\nconst getLogger = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default()[\"import\"](\"util/getLogger\");\r\n\r\nconst logger = getLogger(\r\n  \"util:segmentation:operations:paintWithinThresholdInsideOrOutsideRectangle\"\r\n);\r\n\r\n/**\r\n * FillInsideRectangle - Fill all pixels inside/outside the region defined\r\n * by the rectangle if they are within the threshold range.\r\n * @param  {} evt The Cornerstone event.\r\n * @param {}  operationData An object containing the `points', 'tool configuration' and the `segmentIndex`.\r\n * @returns {null}\r\n */\r\nfunction paint(evt, operationData) {\r\n  const { points, configuration } = operationData;\r\n  const { image } = evt.detail;\r\n  const vertices = points.map((a) => [a.x, a.y]);\r\n  const [topLeft, bottomRight] = getBoundingBoxAroundPolygon(vertices, image);\r\n\r\n  paintWithinThreshold(evt, operationData, topLeft, bottomRight, configuration);\r\n}\r\n\r\n/**\r\n * Fill all pixels labeled with the activeSegmentIndex,\r\n * inside/outside the region defined by the shape If they are within the threshold range.\r\n * @param  {Object} evt The Cornerstone event.\r\n * @param {Object}  operationData An object containing `segmentIndex` and the `points` array.\r\n * @param {number[]} topLeft The top left of the bounding box.\r\n * @param {number[]} bottomRight The bottom right of the bounding box.\r\n * @param {Object} configuration The configuration object.\r\n * @returns {null}\r\n */\r\nfunction paintWithinThreshold(\r\n  evt,\r\n  operationData,\r\n  topLeft,\r\n  bottomRight,\r\n  configuration\r\n) {\r\n  const element = evt.detail.element;\r\n  const stackState = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default().getToolState(element, \"stack\");\r\n  const stackData = stackState.data[0];\r\n  const { imageIds, currentImageIdIndex } = stackData;\r\n  const { segmentIndex } = operationData;\r\n  const { getters, setters } = cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default().getModule(\"segmentation\");\r\n\r\n  const imagesInRange = getImagesInRange(\r\n    currentImageIdIndex,\r\n    imageIds,\r\n    configuration.numberOfSlices\r\n  );\r\n\r\n  const { width, height } = evt.detail.image;\r\n  const [xMin, yMin] = topLeft;\r\n  const [xMax, yMax] = bottomRight;\r\n\r\n  if (!configuration.inside) {\r\n    const operationsArray = [];\r\n    for (let i = 0; i < imagesInRange.length; i++) {\r\n      const { image, imageIdIndex } = imagesInRange[i];\r\n      if (!image) {\r\n        logger.warn(\r\n          \"Image is undefined, it most likely has not been cached yet.\"\r\n        );\r\n        continue;\r\n      }\r\n      const activeLabelmapIndex = getters.activeLabelmapIndex(element);\r\n      const labelmap3D = getters.labelmap3D(element, activeLabelmapIndex);\r\n      const labelmap2DForImageIdIndex = getters.labelmap2DByImageIdIndex(\r\n        labelmap3D,\r\n        imageIdIndex,\r\n        image.rows,\r\n        image.columns\r\n      );\r\n      const { pixelData } = labelmap2DForImageIdIndex;\r\n      const previousPixeldata = pixelData.slice();\r\n      // Loop until top of bounding box from top of image, color the entire row\r\n      for (let i = 0; i < width; i++) {\r\n        for (let j = 0; j < topLeft[1]; j++) {\r\n          const imagePixelData = image.getPixelData();\r\n          const pixelIndex = j * width + i;\r\n          const hounsfieldValue =\r\n            imagePixelData[pixelIndex] * image.slope + image.intercept;\r\n          if (\r\n            hounsfieldValue >= configuration.thresholdLow &&\r\n            hounsfieldValue <= configuration.thresholdHigh\r\n          ) {\r\n            pixelData[pixelIndex] = segmentIndex;\r\n          }\r\n        }\r\n      }\r\n\r\n      // Loop within rows of bounding box, to the left of the box\r\n      for (let i = 0; i < topLeft[0]; i++) {\r\n        for (let j = topLeft[1]; j < bottomRight[1]; j++) {\r\n          const imagePixelData = image.getPixelData();\r\n          const pixelIndex = j * width + i;\r\n          const hounsfieldValue =\r\n            imagePixelData[pixelIndex] * image.slope + image.intercept;\r\n          if (\r\n            hounsfieldValue >= configuration.thresholdLow &&\r\n            hounsfieldValue <= configuration.thresholdHigh\r\n          ) {\r\n            pixelData[pixelIndex] = segmentIndex;\r\n          }\r\n        }\r\n      }\r\n\r\n      // Loop within rows of bounding box, to the right of the box\r\n      for (let i = bottomRight[0]; i < width; i++) {\r\n        for (let j = topLeft[1]; j < bottomRight[1]; j++) {\r\n          const imagePixelData = image.getPixelData();\r\n          const pixelIndex = j * width + i;\r\n          const hounsfieldValue =\r\n            imagePixelData[pixelIndex] * image.slope + image.intercept;\r\n          if (\r\n            hounsfieldValue >= configuration.thresholdLow &&\r\n            hounsfieldValue <= configuration.thresholdHigh\r\n          ) {\r\n            pixelData[pixelIndex] = segmentIndex;\r\n          }\r\n        }\r\n      }\r\n\r\n      // Loop from bottom of bounding box until bottom of image, color entire row\r\n      for (let i = 0; i < width; i++) {\r\n        for (let j = bottomRight[1]; j < height; j++) {\r\n          const imagePixelData = image.getPixelData();\r\n          const pixelIndex = j * width + i;\r\n          const hounsfieldValue =\r\n            imagePixelData[pixelIndex] * image.slope + image.intercept;\r\n          if (\r\n            hounsfieldValue >= configuration.thresholdLow &&\r\n            hounsfieldValue <= configuration.thresholdHigh\r\n          ) {\r\n            pixelData[pixelIndex] = segmentIndex;\r\n          }\r\n        }\r\n      }\r\n      const operation = {\r\n        imageIdIndex: imageIdIndex,\r\n        diff: getDiffBetweenPixelData(previousPixeldata, pixelData),\r\n      };\r\n      operationsArray.push(operation);\r\n      setters.updateSegmentsOnLabelmap2D(labelmap2DForImageIdIndex);\r\n    }\r\n    for (let i = operationsArray.length - 1; i >= 0; i--) {\r\n      setters.pushState(element, [operationsArray[i]]);\r\n      triggerEvent(element, (cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default().EVENTS.LABELMAP_MODIFIED), {\r\n        labelmapIndex: getters.activeLabelmapIndex(element),\r\n      });\r\n    }\r\n    return;\r\n  }\r\n  const operationsArray = [];\r\n  for (let i = 0; i < imagesInRange.length; i++) {\r\n    const { image, imageIdIndex } = imagesInRange[i];\r\n    if (!image) {\r\n      logger.warn(\r\n        \"Image is undefined, it most likely has not been cached yet.\"\r\n      );\r\n      continue;\r\n    }\r\n    const activeLabelmapIndex = getters.activeLabelmapIndex(element);\r\n    const labelmap3D = getters.labelmap3D(element, activeLabelmapIndex);\r\n    const labelmap2DForImageIdIndex = getters.labelmap2DByImageIdIndex(\r\n      labelmap3D,\r\n      imageIdIndex,\r\n      image.rows,\r\n      image.columns\r\n    );\r\n    const { pixelData } = labelmap2DForImageIdIndex;\r\n    const previousPixeldata = pixelData.slice();\r\n    for (let x = xMin; x < xMax; x++) {\r\n      for (let y = yMin; y < yMax; y++) {\r\n        const imagePixelData = image.getPixelData();\r\n        const pixelIndex = y * width + x;\r\n        const hounsfieldValue =\r\n          imagePixelData[pixelIndex] * image.slope + image.intercept;\r\n        if (\r\n          hounsfieldValue >= configuration.thresholdLow &&\r\n          hounsfieldValue <= configuration.thresholdHigh\r\n        ) {\r\n          pixelData[pixelIndex] = segmentIndex;\r\n        }\r\n      }\r\n    }\r\n\r\n    const operation = {\r\n      imageIdIndex: imageIdIndex,\r\n      diff: getDiffBetweenPixelData(previousPixeldata, pixelData),\r\n    };\r\n    operationsArray.push(operation);\r\n    setters.updateSegmentsOnLabelmap2D(labelmap2DForImageIdIndex);\r\n  }\r\n  // loop over operationsArray and call setters in reverse order\r\n  for (let i = operationsArray.length - 1; i >= 0; i--) {\r\n    setters.pushState(element, [operationsArray[i]]);\r\n    triggerEvent(element, (cornerstone_tools__WEBPACK_IMPORTED_MODULE_0___default().EVENTS.LABELMAP_MODIFIED), {\r\n      labelmapIndex: getters.activeLabelmapIndex(element),\r\n    });\r\n  }\r\n}\r\n\r\nfunction getImagesInRange(currentImageIdIndex, imageIds, numberOfSlices) {\r\n  const imagesInRange = [];\r\n  let currentIndex = currentImageIdIndex;\r\n  for (let i = 0; i < numberOfSlices; i++) {\r\n    let newIndex = currentIndex + i;\r\n    if (newIndex >= imageIds.length) {\r\n      newIndex = newIndex - imageIds.length;\r\n    }\r\n    imagesInRange.push({\r\n      imageIdIndex: newIndex,\r\n      image: (cornerstone_core__WEBPACK_IMPORTED_MODULE_1___default().imageCache.imageCache)[imageIds[newIndex]]?.image,\r\n    });\r\n  }\r\n\r\n  return imagesInRange;\r\n}\r\n\n\n//# sourceURL=webpack://cornerstonetools-rectangle-roi-threshold-segmentation/./src/paint.js?");

/***/ }),

/***/ "cornerstone-core":
/*!*****************************************************************************************************************************!*\
  !*** external {"commonjs":"cornerstone-core","commonjs2":"cornerstone-core","amd":"cornerstone-core","root":"cornerstone"} ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_cornerstone_core__;

/***/ }),

/***/ "cornerstone-tools":
/*!*************************************************************************************************************************************!*\
  !*** external {"commonjs":"cornerstone-tools","commonjs2":"cornerstone-tools","amd":"cornerstone-tools","root":"cornerstoneTools"} ***!
  \*************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_cornerstone_tools__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});