/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/hotReload.js":
/*!*****************************!*\
  !*** ./src/js/hotReload.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// 加载文件
const filesInDirectory = dir => new Promise(resolve => dir.createReader().readEntries(entries => {
  Promise.all(entries.filter(e => e.name[0] !== '.').map(e => e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve)))).then(files => [].concat(...files)).then(resolve);
})); // 遍历插件目录，读取文件信息，组合文件名称和修改时间成数据


const timestampForFilesInDirectory = dir => filesInDirectory(dir).then(files => files.map(f => f.name + f.lastModifiedDate).join()); // 刷新当前活动页


const reload = () => {
  window.chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // NB: see https://github.com/xpl/crx-hotreload/issues/5
    if (tabs[0]) {
      window.chrome.tabs.reload(tabs[0].id);
    } // 强制刷新页面


    window.chrome.runtime.reload();
  });
}; // 观察文件改动


const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    // 文件没有改动则循环监听watchChanges方法
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      // 强制刷新页面
      reload();
    }
  });
};

const hotReload = () => {
  window.chrome.management.getSelf(self => {
    if (self.installType === 'development') {
      // 获取插件目录，监听文件变化
      window.chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (hotReload);

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_hotReload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/js/hotReload */ "./src/js/hotReload.js");
/* eslint-disable */

(0,_js_hotReload__WEBPACK_IMPORTED_MODULE_0__["default"])();
var count = 0;
console.log('hello world background');
console.log(count);
console.log(chrome.extension.getViews());
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBQSx5REFBUztBQUVULElBQUlNLEtBQUssR0FBRyxDQUFaO0FBQ0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0FELE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaO0FBQ0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZbkIsTUFBTSxDQUFDb0IsU0FBUCxDQUFpQkMsUUFBakIsRUFBWixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0Ly4vc3JjL2pzL2hvdFJlbG9hZC5qcyIsIndlYnBhY2s6Ly9leHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXh0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXh0Ly4vc3JjL2pzL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8g5Yqg6L295paH5Lu2XG5cbmNvbnN0IGZpbGVzSW5EaXJlY3RvcnkgPSBkaXIgPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIGRpci5jcmVhdGVSZWFkZXIoKS5yZWFkRW50cmllcyhlbnRyaWVzID0+IHtcbiAgICAgIFByb21pc2UuYWxsKFxuICAgICAgICAgIGVudHJpZXNcbiAgICAgICAgICAuZmlsdGVyKGUgPT4gZS5uYW1lWzBdICE9PSAnLicpXG4gICAgICAgICAgLm1hcChlID0+XG4gICAgICAgICAgICBlLmlzRGlyZWN0b3J5ID8gZmlsZXNJbkRpcmVjdG9yeShlKSA6IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gZS5maWxlKHJlc29sdmUpKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAudGhlbihmaWxlcyA9PiBbXS5jb25jYXQoLi4uZmlsZXMpKVxuICAgICAgICAudGhlbihyZXNvbHZlKTtcbiAgICB9KVxuICApO1xuXG4vLyDpgY3ljobmj5Lku7bnm67lvZXvvIzor7vlj5bmlofku7bkv6Hmga/vvIznu4TlkIjmlofku7blkI3np7Dlkozkv67mlLnml7bpl7TmiJDmlbDmja5cbmNvbnN0IHRpbWVzdGFtcEZvckZpbGVzSW5EaXJlY3RvcnkgPSBkaXIgPT5cbiAgZmlsZXNJbkRpcmVjdG9yeShkaXIpLnRoZW4oZmlsZXMgPT5cbiAgICBmaWxlcy5tYXAoZiA9PiBmLm5hbWUgKyBmLmxhc3RNb2RpZmllZERhdGUpLmpvaW4oKVxuICApO1xuXG4vLyDliLfmlrDlvZPliY3mtLvliqjpobVcbmNvbnN0IHJlbG9hZCA9ICgpID0+IHtcbiAgd2luZG93LmNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICB9LFxuICAgIHRhYnMgPT4ge1xuICAgICAgLy8gTkI6IHNlZSBodHRwczovL2dpdGh1Yi5jb20veHBsL2NyeC1ob3RyZWxvYWQvaXNzdWVzLzVcbiAgICAgIGlmICh0YWJzWzBdKSB7XG4gICAgICAgIHdpbmRvdy5jaHJvbWUudGFicy5yZWxvYWQodGFic1swXS5pZCk7XG4gICAgICB9XG4gICAgICAvLyDlvLrliLbliLfmlrDpobXpnaJcbiAgICAgIHdpbmRvdy5jaHJvbWUucnVudGltZS5yZWxvYWQoKTtcbiAgICB9XG4gICk7XG59O1xuXG4vLyDop4Llr5/mlofku7bmlLnliqhcbmNvbnN0IHdhdGNoQ2hhbmdlcyA9IChkaXIsIGxhc3RUaW1lc3RhbXApID0+IHtcbiAgdGltZXN0YW1wRm9yRmlsZXNJbkRpcmVjdG9yeShkaXIpLnRoZW4odGltZXN0YW1wID0+IHtcbiAgICAvLyDmlofku7bmsqHmnInmlLnliqjliJnlvqrnjq/nm5HlkKx3YXRjaENoYW5nZXPmlrnms5VcbiAgICBpZiAoIWxhc3RUaW1lc3RhbXAgfHwgbGFzdFRpbWVzdGFtcCA9PT0gdGltZXN0YW1wKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHdhdGNoQ2hhbmdlcyhkaXIsIHRpbWVzdGFtcCksIDEwMDApOyAvLyByZXRyeSBhZnRlciAxc1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlvLrliLbliLfmlrDpobXpnaJcbiAgICAgIHJlbG9hZCgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBob3RSZWxvYWQgPSAoKSA9PiB7XG4gIHdpbmRvdy5jaHJvbWUubWFuYWdlbWVudC5nZXRTZWxmKHNlbGYgPT4ge1xuICAgIGlmIChzZWxmLmluc3RhbGxUeXBlID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAvLyDojrflj5bmj5Lku7bnm67lvZXvvIznm5HlkKzmlofku7blj5jljJZcbiAgICAgIHdpbmRvdy5jaHJvbWUucnVudGltZS5nZXRQYWNrYWdlRGlyZWN0b3J5RW50cnkoZGlyID0+IHdhdGNoQ2hhbmdlcyhkaXIpKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG90UmVsb2FkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgaG90UmVsb2FkIGZyb20gJ0AvanMvaG90UmVsb2FkJ1xuaG90UmVsb2FkKClcblxudmFyIGNvdW50ID0gMDtcbmNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCBiYWNrZ3JvdW5kJylcbmNvbnNvbGUubG9nKGNvdW50KVxuY29uc29sZS5sb2coY2hyb21lLmV4dGVuc2lvbi5nZXRWaWV3cygpKVxuIl0sIm5hbWVzIjpbImZpbGVzSW5EaXJlY3RvcnkiLCJkaXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNyZWF0ZVJlYWRlciIsInJlYWRFbnRyaWVzIiwiZW50cmllcyIsImFsbCIsImZpbHRlciIsImUiLCJuYW1lIiwibWFwIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwidGhlbiIsImZpbGVzIiwiY29uY2F0IiwidGltZXN0YW1wRm9yRmlsZXNJbkRpcmVjdG9yeSIsImYiLCJsYXN0TW9kaWZpZWREYXRlIiwiam9pbiIsInJlbG9hZCIsIndpbmRvdyIsImNocm9tZSIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJpZCIsInJ1bnRpbWUiLCJ3YXRjaENoYW5nZXMiLCJsYXN0VGltZXN0YW1wIiwidGltZXN0YW1wIiwic2V0VGltZW91dCIsImhvdFJlbG9hZCIsIm1hbmFnZW1lbnQiLCJnZXRTZWxmIiwic2VsZiIsImluc3RhbGxUeXBlIiwiZ2V0UGFja2FnZURpcmVjdG9yeUVudHJ5IiwiY291bnQiLCJjb25zb2xlIiwibG9nIiwiZXh0ZW5zaW9uIiwiZ2V0Vmlld3MiXSwic291cmNlUm9vdCI6IiJ9