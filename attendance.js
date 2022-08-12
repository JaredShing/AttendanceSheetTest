let rosterPiece1 = 
[
	{
		name: "Jared Shing",
		attendance: false,
		note: ""
	},
	{
		name: "Jacob Shore",
		attendance: false,
		note: ""
	}
];

let rosterPiece2 = 
[
	{
		name: "Black Rook 1",
		attendance: false,
		note: ""
	},
	{
		name: "Black Rook 2",
		attendance: false,
		note: ""
	}
];

let rosterPiece3 = 
[
	{
		name: "NEW Thing",
		attendance: false,
		note: ""
	},
	{
		name: "Another One",
		attendance: false,
		note: ""
	},
	{
		name: "ABCDEF GHIJKLM",
		attendance: false,
		note: ""
	},
	{
		name: "OPQRSTUVWX YZ",
		attendance: false,
		note: ""
	}
];

let rosterPiece4 = 
[
	{
		name: "White Pawn 1",
		attendance: false,
		note: ""
	},
	{
		name: "White Pawn 2",
		attendance: false,
		note: ""
	},
	{
		name: "White Pawn 3",
		attendance: false,
		note: ""
	},
	{
		name: "White Pawn 4",
		attendance: false,
		note: ""
	}
];

let allPieces = [rosterPiece1, rosterPiece2, rosterPiece3, rosterPiece4];
let tableOnOffArray = [false, false, false, false];

let render = function()
{
	clearTables();
	generateTables();
	clearSubmitButton();
	placeSubmitButton();
}

let clearTables = function()
{
	var divs = document.getElementsByTagName("div");
	for (var i = divs.length - 1; i >= 0; i--)
	{
		divs[i].parentNode.removeChild(divs[i]);
	}
}

let generateTable = function(value)
{
	let className = "Piece" + (value + 1);
	let newDiv = $("<div>", {"class": className});
	let newH2 = $("<h2>", {"class": className});
	newH2.append("Piece " + (value + 1));
	let newTable = $("<table>", {"class": className, "id": "Table" + (value + 1)});//, "border": "1"});
	

	newTable.append(generateTableHeader());
	newTable.append(generateTableBody(value));


	newDiv.append(newH2);
	newDiv.append(newTable);

	$("body").append(newDiv);
}

let generateTableHeader = function()
{
	let newTableHead = $("<thead>");
	let newTableRow = $("<tr>");

	let nameHeader = $("<th>", {"class": "name nameHead", "align": "center", "width": "300"});
	nameHeader.append("Name:");
	let attendanceHeader = $("<th>", {"class": "attendance attendanceHead", "align": "center", "width": "100"});
	attendanceHeader.append("Attendance:");
	let noteHeader = $("<th>", {"class": "attendance attendanceNote", "align": "center", "width": "500"});
	noteHeader.append("Note:");

	newTableRow.append(nameHeader);
	newTableRow.append(attendanceHeader);
	newTableRow.append(noteHeader);
	newTableHead.append(newTableRow);
	return newTableHead;
}

let generateTableBody = function(value)
{
	let newTableBody = $("<tbody>");
	for (var i = 0; i < allPieces[value].length; i++)
	{
		let newTableRow = $("<tr>");
		let name = $("<td>", {"class": "name nameRow"});
		name.append(allPieces[value][i].name);
		let attendanceCheck = $("<td>");
		let checkBox = $("<input>", {"type": "checkbox", "class": "attendance", "id": helperAttendId(value, i)});
		if (allPieces[value][i].attendance == true)
		{
			checkBox = $("<input>", {"type": "checkbox", "class": "attendance", "checked": "", "id": helperAttendId(value, i)});
		}
		attendanceCheck.append(checkBox);
		let note = $("<td>");
		let noteBox = $("<textarea>", {"name": "text", "wrap": "soft", "rows": "2", "cols": "80", "id": helperNoteId(value, i)});
		noteBox.append(allPieces[value][i].note);
		note.append(noteBox);

		newTableRow.append(name);
		newTableRow.append(attendanceCheck);
		newTableRow.append(note);

		newTableBody.append(newTableRow);
	}
	return newTableBody;
}

let generateTables = function()
{
	for (var i = 0; i < tableOnOffArray.length; i++)
	{
		if (tableOnOffArray[i] == true)
		{
			generateTable(i);
		}
	}
}


let generateSaveState = function()
{
	for (var i = 0; i < tableOnOffArray.length; i++)
	{
		if (tableOnOffArray[i] == true)
		{
			helperSaveState(i);
		}
	}
}

let helperSaveState = function(value)
{
	let pieceChunk1 = "p" + (value + 1);

	for (var i = 0; i < allPieces[value].length; i++)
	{
		let nameSplit = allPieces[value][i].name.split(" ");
		let name = "";
		for (var j = 0; j < nameSplit.length; j++)
		{
			name = name + nameSplit[j];
		}
		let attendId = pieceChunk1 + "Check" + name;
		let noteId = pieceChunk1 + "Note" + name;
		if (document.getElementById(attendId).checked == true)
		{
			allPieces[value][i].attendance = true;
		}
		else
		{
			allPieces[value][i].attendance = false;
		}
		allPieces[value][i].note = document.getElementById(noteId).value; 
	}
}

let helperAttendId = function(pieceValue, nameValue)
{
	let idSplit = helperIdGenerator(pieceValue, nameValue).split(" ");
	let returnId = idSplit[0] + "Check" + idSplit[1];
	return returnId;

}

let helperNoteId = function(pieceValue, nameValue)
{
	let idSplit = helperIdGenerator(pieceValue, nameValue).split(" ");
	let returnId = idSplit[0] + "Note" + idSplit[1];
	return returnId;
}

let helperIdGenerator = function(pieceValue, nameValue)
{
	let returnId = "p" + (pieceValue + 1) + " ";
	let nameSplit = allPieces[pieceValue][nameValue].name.split(" ");
	let name = "";
	for (var j = 0; j < nameSplit.length; j++)
	{
		name = name + nameSplit[j];
	}
	returnId = returnId + name;
	return returnId;
}

let clickButton = function(value)
{
	generateSaveState();
	if (tableOnOffArray[value] == true)
	{
		tableOnOffArray[value] = false;
	}
	else
	{
		tableOnOffArray[value] = true;
	}
	render();
}

let clearSubmitButton = function()
{
	let submits = document.getElementsByClassName("submit");
	for (var i = submits.length - 1; i >= 0; i--)
	{
		submits[i].parentNode.removeChild(submits[i]);
	}
}

let placeSubmitButton = function()
{
	let newDiv = $("<div>", {"class": "submit"});

	//let newList = $("<ul>", {"class": "submit"});
	//let listElem = $("<li>", {"class": "submit"});

	let submitBreak = $("<br>", {"class": "submit"});
	let submitButton = $("<button>", {"class": "submit", "id": "submitButton"});
	submitButton.append("Submit");
	//$("body").append(submitBreak);
	//$("body").append(submitButton);
	//newList.append(listElem);
	//listElem.append(submitButton);
	//newList.append(listElem);
	//$("body").append(newList);
	newDiv.append(submitBreak);
	newDiv.append(submitBreak);
	newDiv.append(submitButton);
	$("body").append(newDiv);
}

$(function() 
	{
		render();
		// will change this method so that submit button uploads to an excel or google spreadsheet
		//document.getElementById("submitButton").addEventListener("click", generateTable(1));
		document.getElementById("piece4Button").addEventListener("click", e => {clickButton(3)});
		document.getElementById("piece3Button").addEventListener("click", e => {clickButton(2)});
		document.getElementById("piece2Button").addEventListener("click", e => {clickButton(1)});
		document.getElementById("piece1Button").addEventListener("click", e => {clickButton(0)});
		document.querySelectorAll(".pieceButton").forEach(pill => 
		{
			pill.addEventListener("click", () => pill.classList.toggle("pieceClicked"))
		});
	}
)
