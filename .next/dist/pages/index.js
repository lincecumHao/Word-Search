'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\A_Work\\2017_word_search\\pages\\index.js?entry';


var NORTH = 1;
var SOUTH = 2;
var WEST = 3;
var EAST = 4;

var Index = function (_Component) {
  (0, _inherits3.default)(Index, _Component);

  function Index(props, context) {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props, context));

    _this.getNorth = _this.getNorth.bind(_this);
    _this.getSouth = _this.getSouth.bind(_this);
    _this.getEast = _this.getEast.bind(_this);
    _this.getWest = _this.getWest.bind(_this);
    _this.isRowColValid = _this.isRowColValid.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.onCalcuate = _this.onCalcuate.bind(_this);
    _this.doCalculate = _this.doCalculate.bind(_this);
    _this.state = {
      boardString: 'ABCE\nSFCS\nADEE',
      boardAry: [['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']],
      wordString: 'ASADB\nABCCED\nABCF',
      wordAry: [['A', 'S', 'A', 'D', 'B'], ['A', 'B', 'C', 'C', 'E', 'D'], ['A', 'B', 'C', 'F']],
      onCalcuate: false,
      result: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Index, [{
    key: 'onInputChange',
    value: function onInputChange(_ref) {
      var _ref$target = _ref.target,
          name = _ref$target.name,
          value = _ref$target.value;

      var ary = [];
      value.split(/\n/g).forEach(function (elm) {
        if (elm && elm !== '' && elm.length !== 0) {
          ary.push(elm.toUpperCase().split(''));
        }
      });
      var retObj = {};
      retObj[name + 'String'] = value;
      retObj[name + 'Ary'] = ary;
      this.setState(retObj);
    }
  }, {
    key: 'onCalcuate',
    value: function onCalcuate() {
      this.setState({
        onCalcuate: !this.state.onCalcuate
      });
      this.doCalculate();
    }

    // 找每一個可能的進入點

  }, {
    key: 'getEnterChoice',
    value: function getEnterChoice(maps, firstElm) {
      var canStartPath = [];
      for (var row = 0; row < maps.length; row += 1) {
        for (var col = 0; col < maps[row].length; col += 1) {
          if (maps[row][col] === firstElm) {
            canStartPath.push({
              row: row, col: col
            });
          }
        }
      }
      return canStartPath;
    }
  }, {
    key: 'getNorth',
    value: function getNorth(_ref2, map) {
      var row = _ref2.row,
          col = _ref2.col;

      return this.isRowColValid(row + 1, col, map) ? map[row + 1][col] : -1;
    }
  }, {
    key: 'getSouth',
    value: function getSouth(_ref3, map) {
      var row = _ref3.row,
          col = _ref3.col;

      return this.isRowColValid(row - 1, col, map) ? map[row - 1][col] : -1;
    }
  }, {
    key: 'getWest',
    value: function getWest(_ref4, map) {
      var row = _ref4.row,
          col = _ref4.col;

      return this.isRowColValid(row, col - 1, map) ? map[row][col - 1] : -1;
    }
  }, {
    key: 'getEast',
    value: function getEast(_ref5, map) {
      var row = _ref5.row,
          col = _ref5.col;

      return this.isRowColValid(row, col + 1, map) ? map[row][col + 1] : -1;
    }

    // 測試有沒有超過邊界

  }, {
    key: 'isRowColValid',
    value: function isRowColValid(row, col, map) {
      if (!map[row] || !map[row][col]) return false;
      return true;
    }

    // 實際計算

  }, {
    key: 'doCalculate',
    value: function doCalculate() {
      var _this2 = this;

      var _state = this.state,
          wordAry = _state.wordAry,
          boardAry = _state.boardAry;

      var result = {};
      wordAry.forEach(function (word) {
        // 開始計時
        var t0 = performance.now();

        // 找到所有進入點
        var enters = _this2.getEnterChoice(boardAry, word[0]);
        var found = false;
        // 嘗試每一個進入點
        enters.some(function (enter) {
          // 符合路徑
          var path = [];

          // 紀錄嘗試過路徑
          var triedPath = {};
          word.forEach(function (b, index) {
            triedPath[index] = [];
          });

          // 設定進入點
          path.push(enter);
          // 開始找
          while (true) {
            if (!path.length) {
              // 沒有找到
              break;
            }
            var current = path[path.length - 1];
            var next = word[path.length];
            var tried = triedPath[path.length - 1];
            if (next === undefined) {
              // 已經沒有剩下的要找了, 表示成功找到
              found = true;
              break;
            }
            if (tried.indexOf(NORTH) === -1 && _this2.getNorth(current, boardAry) === next) {
              triedPath[path.length - 1].push(NORTH);
              path.push((0, _assign2.default)({}, current, { row: current.row + 1 }));
              triedPath[path.length - 1].push(SOUTH);
            } else if (tried.indexOf(SOUTH) == -1 && _this2.getSouth(current, boardAry) === next) {
              triedPath[path.length - 1].push(SOUTH);
              path.push((0, _assign2.default)({}, current, { row: current.row - 1 }));
              triedPath[path.length - 1].push(NORTH);
            } else if (tried.indexOf(WEST) === -1 && _this2.getWest(current, boardAry) === next) {
              triedPath[path.length - 1].push(WEST);
              path.push((0, _assign2.default)({}, current, { col: current.col - 1 }));
              triedPath[path.length - 1].push(EAST);
            } else if (tried.indexOf(EAST) === -1 && _this2.getEast(current, boardAry) === next) {
              triedPath[path.length - 1].push(EAST);
              path.push((0, _assign2.default)({}, current, { col: current.col + 1 }));
              triedPath[path.length - 1].push(WEST);
            } else {
              triedPath[path.length - 1] = [];
              path.pop();
            }
          }

          // 如果已經找到則不在嘗試
          return found;
        });

        // 停止計時
        var t1 = performance.now();
        result[word.join('')] = {
          found: found, cost: t1 - t0
        };
      });
      this.setState({
        result: result, onCalcuate: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          boardString = _state2.boardString,
          wordString = _state2.wordString,
          onCalcuate = _state2.onCalcuate,
          wordAry = _state2.wordAry,
          result = _state2.result;

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        }
      }, _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        }
      }, 'Enter board: '), _react2.default.createElement('textarea', { name: 'board', disabled: onCalcuate, rows: '10', cols: '100', onChange: this.onInputChange, value: boardString, __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        }
      }), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }), _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }, 'Enter words: '), _react2.default.createElement('textarea', { name: 'word', disabled: onCalcuate, rows: '10', cols: '100', onChange: this.onInputChange, value: wordString, __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        }
      }), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        }
      }), _react2.default.createElement('button', { onClick: this.onCalcuate, __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, 'Calculate'), _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }, 'Result'), _react2.default.createElement('table', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        }
      }, _react2.default.createElement('thead', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        }
      }, _react2.default.createElement('tr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, _react2.default.createElement('th', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        }
      }, 'Word'), _react2.default.createElement('th', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, 'Cost(milliseconds)'), _react2.default.createElement('th', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, 'Found'))), _react2.default.createElement('tbody', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      }, wordAry.map(function (word) {
        var str = word.join('');
        var res = result[str];
        var cost = res ? res.cost : '--';
        var found = res ? res.found : '--';
        return _react2.default.createElement('tr', { key: str, __source: {
            fileName: _jsxFileName,
            lineNumber: 197
          }
        }, _react2.default.createElement('td', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 198
          }
        }, str), _react2.default.createElement('td', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          }
        }, cost), _react2.default.createElement('td', { style: { color: found ? 'green' : 'red' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 200
          }
        }, found.toString()));
      }))));
    }
  }]);

  return Index;
}(_react.Component);

exports.default = Index;