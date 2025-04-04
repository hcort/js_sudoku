# js_sudoku
A sudoku game using Javascript

Static game in an HTML page.

The sudoku puzzles (and solutions) must be in the JS file in the following format:

```javascript
const all_sudokus = [
{
	"puzzle": [
					[5, 3, 0, 0, 7, 0, 0, 0, 0], 
					[6, 0, 0, 1, 9, 5, 0, 0, 0], 
					[0, 9, 8, 0, 0, 0, 0, 6, 0], 
					[8, 0, 0, 0, 6, 0, 0, 0, 3], 
					[4, 0, 0, 8, 0, 3, 0, 0, 1], 
					[7, 0, 0, 0, 2, 0, 0, 0, 6], 
					[0, 6, 0, 0, 0, 0, 2, 8, 0], 
					[0, 0, 0, 4, 1, 9, 0, 0, 5], 
					[0, 0, 0, 0, 8, 0, 0, 7, 9]
			],
	"solucion": [
					[5, 3, 4, 6, 7, 8, 9, 1, 2],  
					[6, 7, 2, 1, 9, 5, 3, 4, 8],  
					[1, 9, 8, 3, 4, 2, 5, 6, 7],  
					[8, 5, 9, 7, 6, 1, 4, 2, 3],  
					[4, 2, 6, 8, 5, 3, 7, 9, 1],  
					[7, 1, 3, 9, 2, 4, 8, 5, 6],  
					[9, 6, 1, 5, 3, 7, 2, 8, 4],  
					[2, 8, 7, 4, 1, 9, 6, 3, 5],  
					[3, 4, 5, 2, 8, 6, 1, 7, 9]
				]
}
];
```

For each entry cell you can introduce a number of annotate several of them.

When you hit the Enter key the puzzle is checked, looking for numbers repeated in each row, column or block.
Also, if the puzzle has a solution, each number is compared with the correct one.

Rows, columns and blocks with errors are highlighted in red.



