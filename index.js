const cells = Array.from(document.getElementsByClassName("cell"));
const botButton = document.getElementsByClassName("bot");
let table = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let putaran = 1;
let endGame = false;
let botOn = false;

cells.forEach((cell, index) => {
	cells[index].className += " " + table[index];
	cell.addEventListener("click", function () {
		console.log("clicked");
		main(index);

		/* if (!endGame) {
			if (botOn) {
				if (putaran % 2 != 0) {
					main(index);
				}
			}
		} */
	});
});

botButton[0].addEventListener("click", function () {
	if (botButton[0].className == "bot off") {
		botButton[0].className = "bot on";
		botButton[0].style = "background-color: blue;";
		botOn = true;
	} else {
		botButton[0].className = "bot off";
		botButton[0].style = "background-color: red;";
		botOn = false;
	}
});

function refresh() {
	cells.forEach((cell, index) => {
		cells[index].className = "cell";
		cells[index].className += " " + table[index];
	});
}

function reset(){
	table = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
	endGame = false;
	putaran = 0;
}

function main(index, sender = "cell") {
	if (!endGame) {
		let blankCel = table.filter((box) => box != `x`);
		blankCel = blankCel.filter((box) => box != `o`);
		let symbol = putaran % 2 === 0 ? `x` : `o`;
		console.log(symbol);
		
		if (blankCel.includes(`${index}`)) {
			putaran++;
			table[index] = symbol;
			refresh();
			
			if (checkWin(symbol)) {
				endGame = true;
				refresh();
				setTimeout(() => {
					alert(`${symbol} menang`);
					reset();
					refresh();
				}, 10);
				return;
			}
			if (botOn && sender != "bot") {
				bot();
			}
		}
	}
}

function checkWin(symbol) {
	const teks = `${symbol} menang`;
	for (let i = 0; i < 3; i++) {
		if (
			// Periksa baris
			(table[i * 3] === table[i * 3 + 1] &&
				table[i * 3 + 1] === table[i * 3 + 2]) ||
			// Periksa kolom
			(table[i] === table[i + 3] && table[i + 3] === table[i + 6]) ||
			//periksa diagonal
			(table[0] === table[4] && table[4] === table[8]) ||
			(table[2] === table[4] && table[4] === table[6])
		) {
			// print(table);
			// console.log(teks);
			return true;
		}
	}

	return false;
}

function bot() {
	let blankCel = table.filter((box) => box != `x`);
	blankCel = blankCel.filter((box) => box != `o`);
	let randomer = Math.round(Math.random() * (blankCel.length - 1));
	let random = blankCel[randomer];
	let name = table[random];
	console.log(blankCel, name, random, randomer);
	main(name, "bot");
}
