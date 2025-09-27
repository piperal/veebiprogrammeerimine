const http = require("http");
const dateET = require("./dateET.js");
const fs = require("fs");
const sonad = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Minu veebisait</title><link href="styles.css" rel="stylesheet" />\n</head>\n<body>';

let pageBody = '<img alt="bänner lehel" src="vp_banner_2025_AA.jpg" /><h1>Hello World! by: Roland</h1><h2>Tere maailm!</h2><p>See on tehtud <a href="https://www.tlu.ee/">TLÜ</a> veebiprogrammeerimise kursusel, ÄGE leht!</p><hr /><p>Lisasin selle kodust</p><p>Mulle meeldivad arvutid!</p><hr /><ol>';

const pageFooter = '</ol></body></html>';
console.log(sonad)


async function listWisdom(txt) {
	let wordArr = txt.split(";");
	for (let i = 0; i < wordArr.length; i++) {
		pageBody += "<li>" + ")  " + wordArr[i] + "</li>";
	}
};

async function randomWord(txt) {
	let wordArr = txt.split(";");
	let wordPicker = wordArr[Math.round(Math.random() * wordArr.length - 1)];
	pageBody += "Tänane suvaline vanasõna on: " + wordPicker;

}


const readfile = () => {
	fs.readFile(sonad, "utf8", (err, data) => {
		if (err) {
			console.log(err)
		}
		else {
			randomWord(data).then(listWisdom(data))
		}
	})
}

readfile()


http.createServer(function (req, res) {
	res.writeHead(200, { "Content-type": "text/html" });
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageFooter);
	res.write(dateET.fullDate() + ", " + dateET.fullTime() + ", " + dateET.weekDay())
	return res.end();
}


).listen(5014)