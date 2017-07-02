webpackHotUpdate(5,{

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(112);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(47);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(16);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(17);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(48);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(49);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(9);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\A_Work\\2017_word_search\\pages\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\A_Work\\2017_word_search\\pages\\index.js"); } } })();
    (function (Component, route) {
      if (!module.hot) return
      if (false) return

      var qs = __webpack_require__(69)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4yMGRkY2ZjZDQzOTlmOGM1ZTY2Ni5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/ZjIzOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBOT1JUSCA9IDE7XG5jb25zdCBTT1VUSCA9IDI7XG5jb25zdCBXRVNUID0gMztcbmNvbnN0IEVBU1QgPSA0O1xuXG5jbGFzcyBJbmRleCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgIHRoaXMuZ2V0Tm9ydGggPSB0aGlzLmdldE5vcnRoLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXRTb3V0aCA9IHRoaXMuZ2V0U291dGguYmluZCh0aGlzKTtcbiAgICB0aGlzLmdldEVhc3QgPSB0aGlzLmdldEVhc3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmdldFdlc3QgPSB0aGlzLmdldFdlc3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmlzUm93Q29sVmFsaWQgPSB0aGlzLmlzUm93Q29sVmFsaWQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uSW5wdXRDaGFuZ2UgPSB0aGlzLm9uSW5wdXRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2FsY3VhdGUgPSB0aGlzLm9uQ2FsY3VhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRvQ2FsY3VsYXRlID0gdGhpcy5kb0NhbGN1bGF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBib2FyZFN0cmluZzogJ0FCQ0VcXG5TRkNTXFxuQURFRScsXG4gICAgICBib2FyZEFyeTogW1xuICAgICAgICBbJ0EnLCAnQicsICdDJywgJ0UnXSxcbiAgICAgICAgWydTJywgJ0YnLCAnQycsICdTJ10sXG4gICAgICAgIFsnQScsICdEJywgJ0UnLCAnRSddXG4gICAgICBdLFxuICAgICAgd29yZFN0cmluZzogJ0FTQURCXFxuQUJDQ0VEXFxuQUJDRicsXG4gICAgICB3b3JkQXJ5OiBbXG4gICAgICAgIFsnQScsICdTJywgJ0EnLCAnRCcsICdCJ10sXG4gICAgICAgIFsnQScsICdCJywgJ0MnLCAnQycsICdFJywgJ0QnXSxcbiAgICAgICAgWydBJywgJ0InLCAnQycsICdGJ11cbiAgICAgIF0sXG4gICAgICBvbkNhbGN1YXRlOiBmYWxzZSxcbiAgICAgIHJlc3VsdDoge31cbiAgICB9O1xuICB9XG5cbiAgb25JbnB1dENoYW5nZSh7IHRhcmdldDogeyBuYW1lLCB2YWx1ZSB9IH0pIHtcbiAgICBjb25zdCBhcnkgPSBbXTtcbiAgICB2YWx1ZS5zcGxpdCgvXFxuL2cpLmZvckVhY2goKGVsbSkgPT4ge1xuICAgICAgaWYgKGVsbSAmJiBlbG0gIT09ICcnICYmIGVsbS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgYXJ5LnB1c2goZWxtLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCByZXRPYmogPSB7fTtcbiAgICByZXRPYmpbYCR7bmFtZX1TdHJpbmdgXSA9IHZhbHVlO1xuICAgIHJldE9ialtgJHtuYW1lfUFyeWBdID0gYXJ5O1xuICAgIHRoaXMuc2V0U3RhdGUocmV0T2JqKTtcbiAgfVxuXG4gIG9uQ2FsY3VhdGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvbkNhbGN1YXRlOiAhdGhpcy5zdGF0ZS5vbkNhbGN1YXRlXG4gICAgfSk7XG4gICAgdGhpcy5kb0NhbGN1bGF0ZSgpO1xuICB9XG5cbiAgLy8g5om+5q+P5LiA5YCL5Y+v6IO955qE6YCy5YWl6bueXG4gIGdldEVudGVyQ2hvaWNlKG1hcHMsIGZpcnN0RWxtKSB7XG4gICAgY29uc3QgY2FuU3RhcnRQYXRoID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbWFwcy5sZW5ndGg7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtYXBzW3Jvd10ubGVuZ3RoOyBjb2wgKz0gMSkge1xuICAgICAgICBpZiAobWFwc1tyb3ddW2NvbF0gPT09IGZpcnN0RWxtKSB7XG4gICAgICAgICAgY2FuU3RhcnRQYXRoLnB1c2goe1xuICAgICAgICAgICAgcm93LCBjb2xcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FuU3RhcnRQYXRoO1xuICB9XG5cbiAgZ2V0Tm9ydGgoeyByb3csIGNvbCB9LCBtYXApIHtcbiAgICByZXR1cm4gKHRoaXMuaXNSb3dDb2xWYWxpZChyb3cgKyAxLCBjb2wsIG1hcCkgPyBtYXBbcm93ICsgMV1bY29sXSA6IC0xKTtcbiAgfVxuXG4gIGdldFNvdXRoKHsgcm93LCBjb2wgfSwgbWFwKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzUm93Q29sVmFsaWQocm93IC0gMSwgY29sLCBtYXApID8gbWFwW3JvdyAtIDFdW2NvbF0gOiAtMSk7XG4gIH1cblxuICBnZXRXZXN0KHsgcm93LCBjb2wgfSwgbWFwKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzUm93Q29sVmFsaWQocm93LCBjb2wgLSAxLCBtYXApID8gbWFwW3Jvd11bY29sIC0gMV0gOiAtMSk7XG4gIH1cblxuICBnZXRFYXN0KHsgcm93LCBjb2wgfSwgbWFwKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzUm93Q29sVmFsaWQocm93LCBjb2wgKyAxLCBtYXApID8gbWFwW3Jvd11bY29sICsgMV0gOiAtMSk7XG4gIH1cblxuICAvLyDmuKzoqabmnInmspLmnInotoXpgY7pgornlYxcbiAgaXNSb3dDb2xWYWxpZChyb3csIGNvbCwgbWFwKSB7XG4gICAgaWYgKCFtYXBbcm93XSB8fCAhbWFwW3Jvd11bY29sXSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8g5a+m6Zqb6KiI566XXG4gIGRvQ2FsY3VsYXRlKCkge1xuICAgIGNvbnN0IHsgd29yZEFyeSwgYm9hcmRBcnkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgd29yZEFyeS5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgICAvLyDplovlp4voqIjmmYJcbiAgICAgIGNvbnN0IHQwID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAgIC8vIOaJvuWIsOaJgOaciemAsuWFpem7nlxuICAgICAgY29uc3QgZW50ZXJzID0gdGhpcy5nZXRFbnRlckNob2ljZShib2FyZEFyeSwgd29yZFswXSk7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIC8vIOWYl+ippuavj+S4gOWAi+mAsuWFpem7nlxuICAgICAgZW50ZXJzLnNvbWUoKGVudGVyKSA9PiB7XG4gICAgICAgIC8vIOespuWQiOi3r+W+kVxuICAgICAgICBjb25zdCBwYXRoID0gW107XG5cbiAgICAgICAgLy8g57SA6YyE5ZiX6Kmm6YGO6Lev5b6RXG4gICAgICAgIGNvbnN0IHRyaWVkUGF0aCA9IHt9O1xuICAgICAgICB3b3JkLmZvckVhY2goKGIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgdHJpZWRQYXRoW2luZGV4XSA9IFtdO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyDoqK3lrprpgLLlhaXpu55cbiAgICAgICAgcGF0aC5wdXNoKGVudGVyKTtcbiAgICAgICAgLy8g6ZaL5aeL5om+XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgaWYgKCFwYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8g5rKS5pyJ5om+5YiwXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgICAgICBjb25zdCBuZXh0ID0gd29yZFtwYXRoLmxlbmd0aF07XG4gICAgICAgICAgY29uc3QgdHJpZWQgPSB0cmllZFBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAobmV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyDlt7LntpPmspLmnInliankuIvnmoTopoHmib7kuoYsIOihqOekuuaIkOWKn+aJvuWIsFxuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0cmllZC5pbmRleE9mKE5PUlRIKSA9PT0gLTEgJiYgdGhpcy5nZXROb3J0aChjdXJyZW50LCBib2FyZEFyeSkgPT09IG5leHQpIHtcbiAgICAgICAgICAgIHRyaWVkUGF0aFtwYXRoLmxlbmd0aCAtIDFdLnB1c2goTk9SVEgpO1xuICAgICAgICAgICAgcGF0aC5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGN1cnJlbnQsIHsgcm93OiBjdXJyZW50LnJvdyArIDEgfSkpO1xuICAgICAgICAgICAgdHJpZWRQYXRoW3BhdGgubGVuZ3RoIC0gMV0ucHVzaChTT1VUSCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0cmllZC5pbmRleE9mKFNPVVRIKSA9PSAtMSAmJiB0aGlzLmdldFNvdXRoKGN1cnJlbnQsIGJvYXJkQXJ5KSA9PT0gbmV4dCkge1xuICAgICAgICAgICAgdHJpZWRQYXRoW3BhdGgubGVuZ3RoIC0gMV0ucHVzaChTT1VUSCk7XG4gICAgICAgICAgICBwYXRoLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudCwgeyByb3c6IGN1cnJlbnQucm93IC0gMSB9KSk7XG4gICAgICAgICAgICB0cmllZFBhdGhbcGF0aC5sZW5ndGggLSAxXS5wdXNoKE5PUlRIKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRyaWVkLmluZGV4T2YoV0VTVCkgPT09IC0xICYmIHRoaXMuZ2V0V2VzdChjdXJyZW50LCBib2FyZEFyeSkgPT09IG5leHQpIHtcbiAgICAgICAgICAgIHRyaWVkUGF0aFtwYXRoLmxlbmd0aCAtIDFdLnB1c2goV0VTVCk7XG4gICAgICAgICAgICBwYXRoLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudCwgeyBjb2w6IGN1cnJlbnQuY29sIC0gMSB9KSk7XG4gICAgICAgICAgICB0cmllZFBhdGhbcGF0aC5sZW5ndGggLSAxXS5wdXNoKEVBU1QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHJpZWQuaW5kZXhPZihFQVNUKSA9PT0gLTEgJiYgdGhpcy5nZXRFYXN0KGN1cnJlbnQsIGJvYXJkQXJ5KSA9PT0gbmV4dCkge1xuICAgICAgICAgICAgdHJpZWRQYXRoW3BhdGgubGVuZ3RoIC0gMV0ucHVzaChFQVNUKTtcbiAgICAgICAgICAgIHBhdGgucHVzaChPYmplY3QuYXNzaWduKHt9LCBjdXJyZW50LCB7IGNvbDogY3VycmVudC5jb2wgKyAxIH0pKTtcbiAgICAgICAgICAgIHRyaWVkUGF0aFtwYXRoLmxlbmd0aCAtIDFdLnB1c2goV0VTVCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyaWVkUGF0aFtwYXRoLmxlbmd0aCAtIDFdID0gW107XG4gICAgICAgICAgICBwYXRoLnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWmguaenOW3sue2k+aJvuWIsOWJh+S4jeWcqOWYl+ipplxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICB9KTtcblxuICAgICAgLy8g5YGc5q2i6KiI5pmCXG4gICAgICBjb25zdCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgcmVzdWx0W3dvcmQuam9pbignJyldID0ge1xuICAgICAgICBmb3VuZCwgY29zdDogKHQxIC0gdDApXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcmVzdWx0LCBvbkNhbGN1YXRlOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYm9hcmRTdHJpbmcsIHdvcmRTdHJpbmcsIG9uQ2FsY3VhdGUsIHdvcmRBcnksIHJlc3VsdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkVudGVyIGJvYXJkOiA8L2gxPlxuICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImJvYXJkXCIgZGlzYWJsZWQ9e29uQ2FsY3VhdGV9IHJvd3M9XCIxMFwiIGNvbHM9XCIxMDBcIiBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfSB2YWx1ZT17Ym9hcmRTdHJpbmd9IC8+XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8aDE+RW50ZXIgd29yZHM6IDwvaDE+XG4gICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwid29yZFwiIGRpc2FibGVkPXtvbkNhbGN1YXRlfSByb3dzPVwiMTBcIiBjb2xzPVwiMTAwXCIgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX0gdmFsdWU9e3dvcmRTdHJpbmd9IC8+XG4gICAgICAgIDxiciAvPlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMub25DYWxjdWF0ZX0+Q2FsY3VsYXRlPC9idXR0b24+XG4gICAgICAgIDxoMT5SZXN1bHQ8L2gxPlxuICAgICAgICA8dGFibGU+XG4gICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGg+V29yZDwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Db3N0KG1pbGxpc2Vjb25kcyk8L3RoPlxuICAgICAgICAgICAgICA8dGg+Rm91bmQ8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgd29yZEFyeS5tYXAoKHdvcmQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHIgPSB3b3JkLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHJlc3VsdFtzdHJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvc3QgPSByZXMgPyByZXMuY29zdCA6ICctLSc7XG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSByZXMgPyByZXMuZm91bmQgOiAnLS0nO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtzdHJ9PlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e3N0cn08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8dGQ+e2Nvc3R9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IGNvbG9yOiAoZm91bmQgPyAnZ3JlZW4nIDogJ3JlZCcpIH19Pntmb3VuZC50b1N0cmluZygpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFNQTtBQUFBO0FBTUE7QUFBQTtBQWJBO0FBZUE7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUVBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTs7OztBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7Ozs7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQUFBOzs7O0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQUE7QUFBQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQURBOzs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTs7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUVBO0FBRkE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBTUE7Ozs7O0FBR0E7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=