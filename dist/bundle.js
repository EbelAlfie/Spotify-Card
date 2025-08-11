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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiConfig: () => (/* binding */ apiConfig)\n/* harmony export */ });\nconst apiConfig = {\n    port: \"3030\",\n    baseUrl: `http://localhost:3030/`\n}\n\n//# sourceURL=webpack://debuglayout/../common/apiConfig.js?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card.js */ \"./Card.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ \"./style.css\");\n\n\n\nfunction main() {\n    (0,_Card_js__WEBPACK_IMPORTED_MODULE_0__.reload)()\n}\n\nmain()\n\n//# sourceURL=webpack://debuglayout/./index.js?\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body {\n    background: linear-gradient(-45deg, #4d76c4, #23a6d5, #e73c7e, #23d5ab);\n\tbackground-size: 300% 300%;\n\tanimation: gradient 20s ease infinite;\n}\n\n.container {\n    display: flex;\n    flex-direction: column;\n}\n\naudio {\n    width: 100%;\n    align-self: center;\n}\n\n@keyframes\ngradient {\n\t0%, 100% {\n\t\tbackground-position: 0% 50%;\n\t}\n\t50% {\n\t\tbackground-position: 100% 50%;\n\t}\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://debuglayout/./style.css?./node_modules/css-loader/dist/cjs.js\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("{\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://debuglayout/./node_modules/css-loader/dist/runtime/api.js?\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("{\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://debuglayout/./node_modules/css-loader/dist/runtime/noSourceMaps.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("{\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("{\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/insertBySelector.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/insertStyleElement.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("{\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/styleDomAPI.js?\n}");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("{\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://debuglayout/./node_modules/style-loader/dist/runtime/styleTagTransform.js?\n}");

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://debuglayout/./style.css?\n}");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
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