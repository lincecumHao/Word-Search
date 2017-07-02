# Example

### Example shows [here](https://lincecumhao.github.io/Word-Search/)

### Complete code is [here](https://github.com/lincecumHao/Word-Search/blob/master/pages/index.js)

## How to use

```
npm install
npm run dev
view on localhost:3000
```

### Notice
This program have no specific entry point like [0][0], word can be in any place in board array.

To keep simple, I don't use any css component like react-bootstrap.

Cheers.

# Word Search

Given a 2D board and a word, find if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cell, where adjacent cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Input

The board to be used may be hard coded as:

```
[

[ABCE],

[SFCS],

[ADEE]

]
```

Your program should accept as its first argument a path to a filename. Each line in this

file contains a word. E.g.
```
ASADB

ABCCED

ABCF
```
## Output

Print out True if the word exists in the board, False otherwise. E.g
```
False

True

False
```

