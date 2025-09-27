const currDate = new Date();
const weekDays = ["pühapäev","esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"]

const dateNowFormattedET = function(){
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	return currDate.getDate() + ". " + monthNamesET[currDate.getMonth()] + " " + currDate.getFullYear();
}
const timeNowFormattedET = function(){
	return currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
}

function nadalaPaev() {
	console.log("Täna on " + dateNowFormattedET() + ", " + weekDays[currDate.getDay()] + ", kell: " + timeNowFormattedET())
}

nadalaPaev()