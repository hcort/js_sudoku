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

const sudokuGrid = document.getElementById('sudokuGrid');

let filledCells = 0; // to count the filled cells

let startTime = performance.now();
let timerInterval;
let pendingCells = 0;
let differentNumbers = 0;
let sudoku_index = -1;

 // Function to update the timer
function updateTimer() {
	if (pendingCells > 0) {
		const elapsedTime = performance.now() - startTime; 
		let totalSeconds  = Math.floor(elapsedTime / 1000);
		let hundredths = Math.floor((elapsedTime % 1000) / 10); // Convert to total seconds
		const minutes = Math.floor(totalSeconds / 60); // Calculate minutes
		const seconds = totalSeconds % 60; // Calculate remaining seconds
		const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		document.getElementById('timer').textContent = `Time: ${formattedTime}.${hundredths.toString().padStart(2, '0')}s`;
	}
}


function updatePendingCells() {
	document.getElementById('pending-cells').textContent = `Pending Cells: ${pendingCells} - Bad cells: ${differentNumbers}`;
}


// Función para inicializar el Sudoku
function initializeSudoku() {
	
	sudoku_index = Math.floor(Math.random() * all_sudokus.length);
	const sudoku_dict = all_sudokus[sudoku_index];
	selectedBoard = sudoku_dict["puzzle"];
	
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = selectedBoard[i][j];
            const cell = document.createElement('div');
            cell.classList.add('cell');
			cell.classList.add('row'+i);
			cell.classList.add('col'+j);
			cell.id = 'f'+i+j			
			
			const input = document.createElement('input');
			input.id = 'i_' + i + j;
			input.type = 'text';

            if (value !== 0) {
                // Si la celda tiene un valor, se hace de solo lectura
                input.maxLength = 1;
				input.value = value;
				input.disabled = 'true';
                cell.classList.add('readonly');
				pendingCells += 1;
            } else {
                // Si la celda está vacía, es editable
                input.maxLength = 5; // máximo 5 números por casilla
                input.addEventListener('input', limitInputLength);
                input.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        checkInput(i, j, input.value);
                    }
                });
                cell.classList.add('editable');
            }
            cell.appendChild(input);

            // Coloca la celda en el grid
            sudokuGrid.appendChild(cell);
        }
    }
	updatePendingCells;
}

// Función para verificar si la entrada es correcta
function checkInput(row, col, value) {
		
	valores_tablero=new Array(9);	// array donde guardo los valores ya introducidos en el sudoku
	errores_por_celda=new Array(9);
	
	for (x=0; x<9; x++) {
		valores_tablero[x]=new Array(9);
		errores_por_celda[x]=new Array(9);
	}
	pendingCells = 0;

	// recorro el tablero
	for (x=0; x<9; x++) {
		for (y=0; y<9; y++) {
			e=document.getElementById('i_'+x+y);
			v = parseInt(e.value);
			
			if ((e.value.length==1)&&(v>=1)&&(v<=9)) {
				valores_tablero[x][y]=v;					
			} else {
				pendingCells += 1;
				valores_tablero[x][y]=0;
			}
			errores_por_celda[x][y]=0;
		}
	}
	// calcular número de errores por fila	
	for (x=0; x<9; x++) {
		numeros_encontrados=new Array(10);	// array booleano con los números presentes en esta fila
		repetido=false;
		
		for (y=0; y<9; y++)
			if (valores_tablero[x][y]>0) {
				if (numeros_encontrados[valores_tablero[x][y]])
					repetido=true;
				else
					numeros_encontrados[valores_tablero[x][y]]=true;
			}
		
		if (repetido)
			for (y=0; y<9; y++)
				errores_por_celda[x][y]++;
	}
	
	// calcular número de errores por columna
	for (y=0; y<9; y++) {
		numeros_encontrados=new Array(10);	// array booleano con los números presentes en esta columna
		repetido=false;
		
		for (x=0; x<9; x++)
			if (valores_tablero[x][y]>0) {
				if (numeros_encontrados[valores_tablero[x][y]])
					repetido=true;
				else
					numeros_encontrados[valores_tablero[x][y]]=true;
			}
		
		if (repetido)
			for (x=0; x<9; x++)
				errores_por_celda[x][y]++;
	}
	// comprobar bloques
	for (i=0; i<3; i++) {
		for (j=0; j<3; j++) {
			numeros_encontrados=new Array(10);
			repetido=false;
			
			for (x=i*3; x<(i*3+3); x++)
				for (y=j*3; y<(j*3+3); y++)
					if (valores_tablero[x][y]>0) {
						if (numeros_encontrados[valores_tablero[x][y]])
							repetido=true;
						else
							numeros_encontrados[valores_tablero[x][y]]=true;
					}
			
			if (repetido)
				for (x=i*3; x<(i*3+3); x++)
					for (y=j*3; y<(j*3+3); y++)
						errores_por_celda[x][y]++;
		}
	}
	
	differentNumbers = 0;
	
	// comprobar los errores que hay respecto a la solución del sudoku
	const sudoku_dict = all_sudokus[sudoku_index];
	if ("solucion" in sudoku_dict) {
		solucion_sudoku = sudoku_dict["solucion"];	
		
		for (x=0; x<9; x++) {
			for (y=0; y<9; y++) {
				if (valores_tablero[x][y]>0) {
					if (valores_tablero[x][y] != solucion_sudoku[x][y])
						differentNumbers++;
				}
			}
		}
	}
	
	updatePendingCells();
	
	for (x=0; x<9; x++) {
		for (y=0; y<9; y++) {
			// máximo tres tipos de error: celda, columna, bloque
			if (errores_por_celda[x][y]>3)
				errores_por_celda[x][y]=3;
			
			// asigno distinto sombreado en rojo según cuántos errores haya
			cell=document.getElementById('i_'+x+y);
			cell.classList.remove('err_0', 'err_1', 'err_2', 'err_3');
			if (errores_por_celda[x][y]>0)
				cell.classList.add('err_'+errores_por_celda[x][y]);
		}
	}
}

// Función para resaltar la fila y la columna con color rojo
function highlightRowAndCol(row, col) {
	const allrows = document.querySelectorAll('.row'+row);
	allrows.forEach(arow => arow.style.backgroundColor = 'red');
	const allcols = document.querySelectorAll('.col'+col);
	allcols.forEach(acol => acol.style.backgroundColor = 'red');
}


// Función para limitar la longitud del texto en las celdas editables
function limitInputLength(event) {
    const input = event.target;
	l = input.value.length;
    if (l > 5) {
        input.value = input.value.slice(0, 5); // Limita el texto a 5 caracteres
    }
		
	input.classList.remove('varios', 'tope');

    // Cambia el tamaño de la fuente si hay más de un número
    if (l > 1 && l < 5){
        //input.style.fontSize = '30px';
		input.classList.add('varios');		
    } else if (input.value.length == 5){
        //input.style.fontSize = '48px';
		input.classList.add('tope');	
    }
}


timerInterval = setInterval(updateTimer, 10);
initializeSudoku();