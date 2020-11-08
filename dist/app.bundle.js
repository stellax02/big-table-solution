/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_dataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/dataTable */ "./src/js/dataTable.js");
/* harmony import */ var _js_dataTable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_dataTable__WEBPACK_IMPORTED_MODULE_1__);
 // Custom js components



/***/ }),

/***/ "./src/js/dataTable.js":
/*!*****************************!*\
  !*** ./src/js/dataTable.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var table = $('#dataFilter').DataTable({
  "ajax": "https://raw.githubusercontent.com/stellax02/zadatak/master/data/company.txt",
  "pageLength": 25,
  "lengthMenu": [25, 50, 100],
  fixedColumns: {
    leftColumns: 1
  },
  initComplete: function initComplete() {
    // Fixed Header
    var header = $('thead');
    var hieghtThreshold = header.offset().top;
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= hieghtThreshold) {
        header.addClass('fixed');
      } else {
        header.removeClass('fixed');
      }
    }); // Main Search Placeholder

    $('.dataTables_filter input').attr('placeholder', 'Search'); // Create Filters Modal

    $('#dataFilter thead').append('<tr class="c-mainTable__filters"></tr>');
    $('#dataFilter .c-mainTable__filters').append('<div class="datalist-modal"></div>'); // Create Filters Button

    $('#dataFilter .c-mainTable__filters').after('<div class="c-mainTable__button"><input type="button" href="#home" value="Open filters" class="filters_Toggler" /></div>'); // Open Filters Modal

    $('.filters_Toggler').click(function () {
      $('.c-mainTable__filters').toggleClass('open');
      var show = $(this).val() === 'Open filters';
      $(this).val(show ? 'Hide filters' : 'Open filters');
    }); // Create Column Filters

    this.api().columns().every(function () {
      var column = this;
      var select = $('<select class="datalist-filter"><option value="">' + "Search All" + '</option></select>').appendTo('#dataFilter .datalist-modal').on('change', function () {
        var val = $.fn.dataTable.util.escapeRegex($(this).val());
        column.search(val ? '^' + val + '$' : '', true, false).draw();
      });
      column.data().unique().sort().each(function (d, j) {
        select.append('<option value="' + d + '">' + d + '</option>'); // Checked / Unchecked icons

        $('td').filter(function () {
          return $(this).text() === "checked";
        }).addClass("checked");
        $('td:contains("unchecked")').addClass("unchecked");
      });
    });
  }
});

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map