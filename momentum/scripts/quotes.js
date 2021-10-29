const getQuotesJson = lang => {
	fetch('assets/quotes.json')
		.then(response => response.json())
		.then(data => {
			const randomNum = Math.floor(Math.random() * data.quotes.length);
			if (lang === 'ru') {
				quote.textContent = data.quotes[randomNum].quoteRu;
				author.textContent = data.quotes[randomNum].authorRu;
			} else {
					quote.textContent = data.quotes[randomNum].quoteEn;
					author.textContent = data.quotes[randomNum].authorEn;
				}
		});
}
const getQuotes = lang => {
	fetch(`https://quotes15.p.rapidapi.com/quotes/random/?language_code=${lang}`, {
		method: 'GET',
		headers: {
			'x-rapidapi-host': 'quotes15.p.rapidapi.com',
			'x-rapidapi-key': '79425828ccmshcd2375d58f9cadcp1fe229jsnd55a3477bdb3'
		}
	})
	.then(response => {
		if (response.status !== 200) getQuotesJson(lang);
		else return response.json();
	})
	.then(obj => {
		quote.textContent = obj.content;
		author.textContent = obj.originator.name;
	});
}
getQuotes(lang);

updQuote.onclick = _ => getQuotes(lang);

btnEn.addEventListener('click', _ => getQuotes(lang));

btnRu.addEventListener('click', _ => getQuotes(lang));