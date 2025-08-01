/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../common/EmeConfig.js":
/*!******************************!*\
  !*** ../common/EmeConfig.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EmeConfig: () => (/* binding */ EmeConfig)\n/* harmony export */ });\nconst EmeConfig = {\n    initType: \"cenc\",\n    keySystem : \"com.widevine.alpha\",\n    licenseServer : \"https://gew4-spclient.spotify.com/widevine-license\",\n    license: \"https://gew4-spclient.spotify.com/widevine-license/v1/audio/license\",\n    serverLicense: \"https://gew4-spclient.spotify.com/melody/v1/license_url?keysystem=com.widevine.alpha&mediatype=audio&sdk_name=harmony&sdk_version=4.45.0\",\n    psshField: \"pssh_widevine\"\n}\n\n//# sourceURL=webpack://debuglayout/../common/EmeConfig.js?\n}");

/***/ }),

/***/ "../common/Utils.js":
/*!**************************!*\
  !*** ../common/Utils.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decodePSSHKey: () => (/* binding */ decodePSSHKey)\n/* harmony export */ });\nfunction decodePSSHKey(key) {\n    const decodedKey = atob(key)\n        ,decodedResult = new Uint8Array(decodedKey.length);\n    let keyLength = decodedKey.length\n    for (let i = 0; i < keyLength; i++)\n        decodedResult[i] = decodedKey.charCodeAt(i)\n\n    return decodedResult\n}\n\n//# sourceURL=webpack://debuglayout/../common/Utils.js?\n}");

/***/ }),

/***/ "../common/apiConfig.js":
/*!******************************!*\
  !*** ../common/apiConfig.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiConfig: () => (/* binding */ apiConfig)\n/* harmony export */ });\nconst apiConfig = {\n    port: \"3030\",\n    baseUrl: `https://z23zhbfr-5501.asse.devtunnels.ms/`\n}\n\n//# sourceURL=webpack://debuglayout/../common/apiConfig.js?\n}");

/***/ }),

/***/ "./Card.js":
/*!*****************!*\
  !*** ./Card.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reload: () => (/* binding */ reload)\n/* harmony export */ });\n/* harmony import */ var _common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/apiConfig.js */ \"../common/apiConfig.js\");\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ \"./global.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player.js */ \"./Player.js\");\n\n\n\n\n\nfunction reload() {\n    const img = document.getElementById(\"spotiCard\")\n    img.src = `${_common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.apiConfig.baseUrl}${_global_js__WEBPACK_IMPORTED_MODULE_1__.path.track}`\n    img.onload = () => {\n        ;(0,_Player_js__WEBPACK_IMPORTED_MODULE_2__.setupAudioPlayer)()\n    }\n}\n\n//# sourceURL=webpack://debuglayout/./Card.js?\n}");

/***/ }),

/***/ "./Player.js":
/*!*******************!*\
  !*** ./Player.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeEME: () => (/* binding */ initializeEME),\n/* harmony export */   setupAudioPlayer: () => (/* binding */ setupAudioPlayer)\n/* harmony export */ });\n/* harmony import */ var _common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/apiConfig.js */ \"../common/apiConfig.js\");\n/* harmony import */ var _common_EmeConfig_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/EmeConfig.js */ \"../common/EmeConfig.js\");\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.js */ \"./global.js\");\n/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Card.js */ \"./Card.js\");\n/* harmony import */ var _common_Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Utils.js */ \"../common/Utils.js\");\n\n\n\n\n\n\nlet mediaSource = null\nlet sourceBuffer = null\n\nlet psshKey = \"\"\n\nfunction setupAudioPlayer() {    \n    if ('MediaSource' in window && MediaSource.isTypeSupported(_global_js__WEBPACK_IMPORTED_MODULE_2__.mimeCodec)) {\n        mediaSource = new MediaSource();\n        if (_global_js__WEBPACK_IMPORTED_MODULE_2__.video.ms) return \n\n        mediaSource.video = _global_js__WEBPACK_IMPORTED_MODULE_2__.video;\n        _global_js__WEBPACK_IMPORTED_MODULE_2__.video.ms = mediaSource;\n        mediaSource.addEventListener(\"sourceopen\", onSourceOpen);\n        mediaSource.addEventListener(\"sourceclose\", onSourceClose);\n        _global_js__WEBPACK_IMPORTED_MODULE_2__.video.src = window.URL.createObjectURL(mediaSource)\n        _global_js__WEBPACK_IMPORTED_MODULE_2__.video.playbackRate = 1\n\n        initializeEME(_global_js__WEBPACK_IMPORTED_MODULE_2__.video)\n    } else {\n        console.log(\"unsupported mimetype/ codec\")\n    }\n}\n\nfunction onSourceClose(error) {\n    console.log(`Source close ${JSON.stringify(error)}`)\n}\n\nasync function onSourceOpen(_) {\n    let mediaSource = this\n    sourceBuffer = mediaSource.addSourceBuffer(_global_js__WEBPACK_IMPORTED_MODULE_2__.mimeCodec);\n\n    _global_js__WEBPACK_IMPORTED_MODULE_2__.video.addEventListener('canplay', () => {\n        console.log(\"Play\")\n        _global_js__WEBPACK_IMPORTED_MODULE_2__.video.play();\n    })\n\n    _global_js__WEBPACK_IMPORTED_MODULE_2__.video.addEventListener(\"ended\", () => {\n        _global_js__WEBPACK_IMPORTED_MODULE_2__.video.currentTime = 0\n        ;(0,_Card_js__WEBPACK_IMPORTED_MODULE_3__.reload)()\n    })\n\n    await updateV2()\n}\n\nasync function updateV2() {\n    axios.request({\n        method: \"GET\",\n        url: _global_js__WEBPACK_IMPORTED_MODULE_2__.songUrl,\n        maxBodyLength: Infinity,\n    }).then(response => {\n        const {\n            audioBuffer = {},\n            pssh = \"\"\n        } = response.data ?? {}\n\n        console.log(response.data)\n        const audio = Uint8Array.from(audioBuffer.data) ?? {}\n\n        psshKey = (0,_common_Utils_js__WEBPACK_IMPORTED_MODULE_4__.decodePSSHKey)(pssh)\n        console.log(\"PSSH key: \" + pssh)\n\n        sourceBuffer.appendBuffer(buffer.Buffer.from(audio))\n    })\n}\n\n/** EME */\nfunction initializeEME(video) {\n\tvar configMp4Mime = [{\n        label: \"audio-flac-sw-crypto\",\n\t\tinitDataTypes: [\"cenc\"],\n        audioCapabilities: [\n            {\n                \"contentType\": \"audio/mp4; codecs=\\\"flac\\\"\",\n                \"robustness\": \"SW_SECURE_CRYPTO\"\n            },\n            {\n                \"contentType\": \"audio/mp4; codecs=\\\"mp4a.40.2\\\"\",\n                \"robustness\": \"SW_SECURE_CRYPTO\"\n            },\n            {\n                \"contentType\": \"audio/mp4; codecs=\\\"mp4a.40.5\\\"\",\n                \"robustness\": \"SW_SECURE_CRYPTO\"\n            }\n        ],\n\t\t// codecs config is required\n\t\tvideoCapabilities: [\n            {\n                \"contentType\": \"video/mp4; codecs=\\\"avc1.64002a\\\"\"\n            },\n            {\n                \"contentType\": \"video/mp4; codecs=\\\"avc1.4d402a\\\"\"\n            },\n            {\n                \"contentType\": \"video/mp4; codecs=\\\"avc1.4d401f\\\"\"\n            },\n            {\n                \"contentType\": \"video/webm; codecs=\\\"vp9\\\"\"\n            },\n            {\n                \"contentType\": \"video/webm; codecs=\\\"vp8\\\"\"\n            }\n        ],\n        distinctiveIdentifier: \"optional\",\n        persistentState: \"optional\",\n        sessionTypes: [\"temporary\"]\n\t}];\n\n\tvar WIDEVINE_KEY_SYSTEM = 'com.widevine.alpha'\n\n    video.addEventListener('encrypted', (event) => handleEncrypted(event), false);\n\n\tnavigator.requestMediaKeySystemAccess(WIDEVINE_KEY_SYSTEM, configMp4Mime).then(\n        (keySystemAccess) => keySystemAccess.createMediaKeys()\n\t).then(\n\t  (createdMediaKeys) => {\n\t    return video.setMediaKeys(createdMediaKeys);\n\t  }\n\t).catch(\n\t  function(error) {\n\t    console.error('Failed to set up MediaKeys', error);\n\t  }\n\t);\n}\n\nfunction handleEncrypted(event) {\n    console.log(event)\n\tlet session = _global_js__WEBPACK_IMPORTED_MODULE_2__.video.mediaKeys.createSession()\n    session.addEventListener(\"keystatuseschange\", (msg) => console.log(msg));\n\tsession.addEventListener('message', handleMessage, false);\n\tsession.generateRequest(_common_EmeConfig_js__WEBPACK_IMPORTED_MODULE_1__.EmeConfig.initType, psshKey).catch(\n\t  function(error) {\n\t    console.error('Failed to generate a license request', error);\n\t  }\n\t);\n}\n\nasync function handleMessage(event) {\n  console.log(\"Media keys license request: \" + new buffer.Buffer.from(event.message).toString(\"base64\"))\n\n  let session = event.target\n  let message = event.message\n\n  const license = await axios.request({\n    method: \"POST\",\n    responseType: \"arraybuffer\",\n    maxBodyLength: Infinity,\n    url: `${_common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.apiConfig.baseUrl}${_global_js__WEBPACK_IMPORTED_MODULE_2__.path.license}`,\n    headers: {\n        \"Content-Type\": \"application/octet-stream\",\n        \"Accept\": \"application/json, text/plain, */*\"\n    },\n    data: message\n  })\n\n  const licenseBuffer = new buffer.Buffer.from(license.data)\n  console.log(\"License \" + licenseBuffer.toString(\"base64\"))\n\n  session.update(licenseBuffer).catch(\n    function(error) {\n      console.error('Failed to update the session', error);\n    }\n  );\n}\n\n//# sourceURL=webpack://debuglayout/./Player.js?\n}");

/***/ }),

/***/ "./global.js":
/*!*******************!*\
  !*** ./global.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mimeCodec: () => (/* binding */ mimeCodec),\n/* harmony export */   path: () => (/* binding */ path),\n/* harmony export */   songUrl: () => (/* binding */ songUrl),\n/* harmony export */   video: () => (/* binding */ video)\n/* harmony export */ });\n/* harmony import */ var _common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/apiConfig.js */ \"../common/apiConfig.js\");\n\n\nconst path = {\n    \"track\": \"last-track\",\n    \"song\": \"audio\",\n    \"license\": \"license\"\n}\n\nlet mimeCodec = 'audio/mp4; codecs=\"mp4a.40.2\"';\nconst songUrl = `${_common_apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.apiConfig.baseUrl}${path.song}`\n\nconst video = document.getElementById(\"audioPlayer\")\n\n//# sourceURL=webpack://debuglayout/./global.js?\n}");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card.js */ \"./Card.js\");\n\n\nfunction main() {\n    (0,_Card_js__WEBPACK_IMPORTED_MODULE_0__.reload)()\n}\n\nmain()\n\n//# sourceURL=webpack://debuglayout/./index.js?\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;