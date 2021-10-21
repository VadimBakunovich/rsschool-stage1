fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=ru", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "quotes15.p.rapidapi.com",
		"x-rapidapi-key": "79425828ccmshcd2375d58f9cadcp1fe229jsnd55a3477bdb3"
	}
})
.then(response => response.json())
.then(obj => console.log(obj.content, obj.originator.name));