import React, { Component } from 'react';

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ];

    this.words = [
      ['A', 'S', 'A', 'D', 'B'],
      ['A', 'B', 'C', 'C', 'E', 'D'],
      ['A', 'B', 'C', 'F']
    ];
    this.getNorth = this.getNorth.bind(this);
    this.getSouth = this.getSouth.bind(this);
    this.getEast = this.getEast.bind(this);
    this.getWest = this.getWest.bind(this);
    this.isRowColValid = this.isRowColValid.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCalcuate = this.onCalcuate.bind(this);
    this.doCalculate = this.doCalculate.bind(this);
    this.state = {
      boardString: 'ABCE\nSFCS\nADEE',
      boardAry: [],
      wordString: 'ASADB\nABCCED\nABCF',
      wordAry: [],
      onCalcuate: false,
      result: {}
    };
  }

  onInputChange({ target: { name, value } }) {
    const ary = [];
    value.split(/\n/g).forEach((elm) => {
      if (elm && elm !== '' && elm.length !== 0) {
        ary.push(elm.toUpperCase().split(''));
      }
    });
    const retObj = {};
    retObj[`${name}String`] = value;
    retObj[`${name}Ary`] = ary;
    this.setState(retObj);
  }

  onCalcuate() {
    this.setState({
      onCalcuate: !this.state.onCalcuate
    });
    this.doCalculate();
  }

  // 找每一個可能的進入點
  getEnterChoice(maps, firstElm) {
    const canStartPath = [];
    for (let row = 0; row < maps.length; row += 1) {
      for (let col = 0; col < maps[row].length; col += 1) {
        if (maps[row][col] === firstElm) {
          canStartPath.push({
            row, col
          });
        }
      }
    }
    return canStartPath;
  }

  getNorth({ row, col }, map) {
    return (this.isRowColValid(row + 1, col, map) ? map[row + 1][col] : -1);
  }

  getSouth({ row, col }, map) {
    return (this.isRowColValid(row - 1, col, map) ? map[row - 1][col] : -1);
  }

  getWest({ row, col }, map) {
    return (this.isRowColValid(row, col - 1, map) ? map[row][col - 1] : -1);
  }

  getEast({ row, col }, map) {
    return (this.isRowColValid(row, col + 1, map) ? map[row][col + 1] : -1);
  }

  // 測試有沒有超過邊界
  isRowColValid(row, col, map) {
    if (!map[row] || !map[row][col]) return false;
    return true;
  }

  // 實際計算
  doCalculate() {
    const { wordAry, boardAry } = this.state;
    console.log(wordAry, boardAry);
    const result = {};
    wordAry.forEach((word) => {
      console.log(word);
      // 開始計時
      const t0 = performance.now();

      // 找到所有進入點
      const enters = this.getEnterChoice(boardAry, word[0]);
      let found = false;
      // 嘗試每一個進入點
      enters.some((enter) => {
        // 符合路徑
        const path = [];

        // 紀錄嘗試過路徑
        const triedPath = {};
        word.forEach((b, index) => {
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
          const current = path[path.length - 1];
          const next = word[path.length];
          const tried = triedPath[path.length - 1];
          if (next === undefined) {
            // 已經沒有剩下的要找了, 表示成功找到
            found = true;
            break;
          }
          if (tried.indexOf(NORTH) === -1 && this.getNorth(current, boardAry) === next) {
            triedPath[path.length - 1].push(NORTH);
            path.push(Object.assign({}, current, { row: current.row + 1 }));
            triedPath[path.length - 1].push(SOUTH);
          } else if (tried.indexOf(SOUTH) == -1 && this.getSouth(current, boardAry) === next) {
            triedPath[path.length - 1].push(SOUTH);
            path.push(Object.assign({}, current, { row: current.row - 1 }));
            triedPath[path.length - 1].push(NORTH);
          } else if (tried.indexOf(WEST) === -1 && this.getWest(current, boardAry) === next) {
            triedPath[path.length - 1].push(WEST);
            path.push(Object.assign({}, current, { col: current.col - 1 }));
            triedPath[path.length - 1].push(EAST);
          } else if (tried.indexOf(EAST) === -1 && this.getEast(current, boardAry) === next) {
            triedPath[path.length - 1].push(EAST);
            path.push(Object.assign({}, current, { col: current.col + 1 }));
            triedPath[path.length - 1].push(WEST);
          } else {
            triedPath[path.length - 1] = [];
            path.pop();
          }

          // // 防止無限迴圈
          // if ((performance.now() - t0) / 1000 > 120) {
          //   console.log('bad program');
          //   break;
          // }
          // i += 1;
        }

        // 如果已經找到則不在嘗試
        return found;
      });

      // 停止計時
      const t1 = performance.now();
      result[word.join('')] = {
        found, cost: (t1 - t0)
      };
    });
    this.setState({
      result, onCalcuate: false
    });
  }

  render() {
    const { boardString, wordString, onCalcuate, wordAry, result } = this.state;
    return (
      <div>
        <h1>Enter board: </h1>
        <textarea name="board" disabled={onCalcuate} rows="10" cols="100" onChange={this.onInputChange} value={boardString} />
        <br />
        <h1>Enter words: </h1>
        <textarea name="word" disabled={onCalcuate} rows="10" cols="100" onChange={this.onInputChange} value={wordString} />
        <br />
        <button onClick={this.onCalcuate}>Calculate</button>
        <h1>Result</h1>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Cost(milliseconds)</th>
              <th>Found</th>
            </tr>
          </thead>
          <tbody>
            {
              wordAry.map((word) => {
                const str = word.join('');
                const res = result[str];
                const cost = res ? res.cost : '--';
                const found = res ? res.found : '--';
                return (
                  <tr key={str}>
                    <td>{str}</td>
                    <td>{cost}</td>
                    <td style={{ color: (found ? 'green' : 'red') }}>{found.toString()}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Index;
