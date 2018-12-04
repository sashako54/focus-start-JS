function getDate(objDate) {
	let date = objDate * 1000;
	let formatter = new Intl.DateTimeFormat("ru", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});

	return formatter.format(date);
}

export { getDate };