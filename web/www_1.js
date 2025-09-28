const http = require("http");
const dateET = require("./dateET.js");
const fs = require("fs");
const sonad = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Minu veebisait</title><link href="styles.css" rel="stylesheet" />\n</head>\n<body>';
let pageBody = '<img alt="bĆ¤nner lehel" src="vp_banner_2025_AA.jpg" /><h1>Hello World! by: Roland</h1><h2>Tere maailm!</h2><p>See on tehtud <a href="https://www.tlu.ee/">TLÜ</a> veebiprogrammeerimise kursusel, tehtud leht!</p><hr /><p>Lisasin selle kodust</p><p>Mulle meeldivad arvutid!</p><hr /><ol>';
let pageContent = ""
const pageFooter = '</ol></body></html>';
let url = require('url');
const path = require("path");

async function listWisdom(txt) {
	let wordArr = txt.split(";");
	for (let i = 0; i < wordArr.length; i++) {
		pageContent += "<li>" + ")  " + wordArr[i] + "</li>";
	}
};

async function randomWord(txt) {
	let wordArr = txt.split(";");
	let wordPicker = wordArr[Math.round(Math.random() * wordArr.length - 1)];
	pageContent += "Tänane suvaline vanasõna on: " + wordPicker;

}

async function readfile() {
	fs.readFile(sonad, "utf8", (err, data) => {
		if (err) {
			console.log(err)
		}
		else {
			pageContent = ""
			randomWord(data).then(listWisdom(data))
		}
	})
}



http.createServer((req, res) => {

	let q = url.parse(req.url, true);

	if (q.pathname === "/vanasonad") {
		res.writeHead("200", { "Content-type": "text/html" });
		res.write(pageHead);
		res.write(pageBody);
		res.write("<h3>(Kui all on tühjus, siis refreshige)</h3>")
		readfile()
		res.write(pageContent)
		res.write(pageFooter);
		return res.end();
	}
	else if (q.pathname === "/hobid") {
		res.writeHead("200", { "Content-type": "text/html" });
		pageContent = ""
		res.write(pageHead);
		res.write(pageBody);
		pageContent = "<ul><li><a href='https://pixabay.com/photos/painter-street-painter-painting-art-7497233/'>Maalimine</a></li><li><a href='https://pixabay.com/photos/adult-people-woman-athlete-315337/'>Rulatamine</a></li><li><a href='https://pixabay.com/photos/code-programming-hacking-html-web-820275/'>Tarkvaraarendus</a></li></ul>";
		res.write(pageContent)
		res.write(pageFooter);
		return res.end();
	}
	else if (q.pathname === "/") {
		res.writeHead("200", { "Content-type": "text/html" });
		res.write(pageHead);
		res.write(pageBody);
		res.write("<ul><li><a href='/vanasonad'>Vanasõnad</a></li><li><a href='/hobid'>Hobid</a><li><a href='/vp_banner_2025_TA'>Pilt</a></li></li></ul>")
		res.write(pageFooter);
		res.write(dateET.fullDate() + ", " + dateET.fullTime() + ", " + dateET.weekDay())
		return res.end();
	}
	else if (q.pathname.includes("/images")) {
		let bannerPath = path.join(__dirname);
		fs.readFile(bannerPath + q.pathname + ".jpg", (err, data) => {
			if (err) {
				console.log(err)
				res.end("404")
			}
			else {
				res.writeHead("200", { "Content-type": "image/jpeg" });
				res.end(data)
			}
		})
	}
	else{
		res.end("404")
	}
}


).listen(5014)