const getQuotes = lang => {
	fetch(`https://quotes15.p.rapidapi.com/quotes/random/?language_code=${lang}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "quotes15.p.rapidapi.com",
			"x-rapidapi-key": "79425828ccmshcd2375d58f9cadcp1fe229jsnd55a3477bdb3"
		}
	})
	.then(response => {
		if (response.status > 299) {
			quote.textContent = `Error ${response.status}: ${response.statusText}`;
			author.textContent = 'Please update quotes less often';
		} else return response.json();
	})
	.then(obj => {
		quote.textContent = obj.content;
		author.textContent = obj.originator.name;
	});
}
getQuotes(lang);

updQuote.onclick = _ => getQuotes(lang);