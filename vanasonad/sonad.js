const fs = require("fs");
const sonad = "txt/vanasonad.txt";
const dateET = require("./dateET.js")


const listWisdom =(txt)=>{
	let wordArr = txt.split(";");
	for(let i = 0; i < wordArr.length;i++){
	console.log(i + ")" + wordArr[i])
	}
}

function readfile(){
	fs.readFile(sonad, "utf8",(err, data)=>{
		if(err){
			console.log(err)
		}
		else{
			listWisdom(data)
		}
	})
}

console.log("Täna on " + dateET.fullTime() 
					   + " "
					   + dateET.fullDate() 
					   + " "
					   + dateET.currTime())
readfile()