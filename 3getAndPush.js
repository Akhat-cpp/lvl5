let urls = {};
let configs = {};

function get(url, config)
{

	// fetch(url).then(function(response) {
	//   response.json().then(function(json) {
	//     console.log(json);
	//     return json;
	//   });
	// });
 	urls[config.parent] = url;
 	configs[config.parent] = config;
	fetch(url).then(res => res.ok ? res : Promise.reject(res)).then(d => d.json()).then(dJson => DataTable(config, dJson)).catch(() => alert('Error download'));
}

function deleteEl(id, idDiv)
{
	let urlEl = urls[idDiv] + '/' + id;
	let config = configs[idDiv];
	fetch(urlEl, {method: 'DELETE'}).then(res => res.ok ? res : Promise.reject(res)).then(() => {fetch(urls[idDiv]).then(res => res.ok ? res : Promise.reject(res)).then(d => d.json()).then(dJson => DataTable(config, dJson)).catch(() => alert('Error download'));}).catch(() => alert('Error delete'));
}