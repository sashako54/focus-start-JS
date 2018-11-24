function addHttpRequest(obj) {
	return new Promise(function(resolve, reject){
		let xhr = new XMLHttpRequest();
		xhr.open(obj.method || "GET", obj.url, true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
	})
}

export { addHttpRequest };