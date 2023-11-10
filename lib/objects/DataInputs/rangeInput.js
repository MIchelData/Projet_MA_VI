"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// COLORS
var mainColor = '#FEEDC1';
var secondColor = '#D9D9D9';
var black = '#222222';

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  var _getParsed = getParsed(fromInput, toInput),
      _getParsed2 = _slicedToArray(_getParsed, 2),
      from = _getParsed2[0],
      to = _getParsed2[1];

  fillSlider(fromInput, toInput, secondColor, black, controlSlider);

  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  var _getParsed3 = getParsed(fromInput, toInput),
      _getParsed4 = _slicedToArray(_getParsed3, 2),
      from = _getParsed4[0],
      to = _getParsed4[1];

  fillSlider(fromInput, toInput, secondColor, black, controlSlider);
  setToggleAccessible(toInput);

  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  var _getParsed5 = getParsed(fromSlider, toSlider),
      _getParsed6 = _slicedToArray(_getParsed5, 2),
      from = _getParsed6[0],
      to = _getParsed6[1];

  fillSlider(fromSlider, toSlider, secondColor, black, toSlider);

  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  var _getParsed7 = getParsed(fromSlider, toSlider),
      _getParsed8 = _slicedToArray(_getParsed7, 2),
      from = _getParsed8[0],
      to = _getParsed8[1];

  fillSlider(fromSlider, toSlider, secondColor, black, toSlider);
  setToggleAccessible(toSlider);

  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  var from = parseInt(currentFrom.value, 10);
  var to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  var rangeDistance = to.max - to.min;
  var fromPosition = from.value - to.min;
  var toPosition = to.value - to.min;
  controlSlider.style.background = "linear-gradient(\n      to right,\n      ".concat(sliderColor, " 0%,\n      ").concat(sliderColor, " ").concat(fromPosition / rangeDistance * 100, "%,\n      ").concat(rangeColor, " ").concat(fromPosition / rangeDistance * 100, "%,\n      ").concat(rangeColor, " ").concat(toPosition / rangeDistance * 100, "%, \n      ").concat(sliderColor, " ").concat(toPosition / rangeDistance * 100, "%, \n      ").concat(sliderColor, " 100%)");
}

function setToggleAccessible(currentTarget) {
  var toSlider = document.querySelector('#toSlider');

  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

var fromSlider = document.querySelector('#fromSlider');
var toSlider = document.querySelector('#toSlider');
var fromInput = document.querySelector('#fromInput');
var toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, secondColor, black, toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = function () {
  return controlFromSlider(fromSlider, toSlider, fromInput);
};

toSlider.oninput = function () {
  return controlToSlider(fromSlider, toSlider, toInput);
};

fromInput.oninput = function () {
  return controlFromInput(fromSlider, fromInput, toInput, toSlider);
};

toInput.oninput = function () {
  return controlToInput(toSlider, fromInput, toInput, toSlider);
};