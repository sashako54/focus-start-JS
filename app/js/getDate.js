function getDate(objDate) {
	var date = objDate * 1000;
	var formatter = new Intl.DateTimeFormat("ru", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	return formatter.format(date);
}

export { getDate };