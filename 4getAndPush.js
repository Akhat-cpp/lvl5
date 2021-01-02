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

function save(idDiv, values)
{
	let counter = 1;
	let objValues = {};
	while(counter != configs[idDiv].columns.length)
	{
		objValues[configs[idDiv].columns[counter].value] = values[counter-1];
		counter++;
	}
	let config = configs[idDiv];
	fetch(urls[idDiv], {method: 'POST', body: JSON.stringify(objValues), headers: {'Content-Type': 'application/json'}}).then(res => res.ok ? res : Promise.reject(res)).then(() => {fetch(urls[idDiv]).then(res => res.ok ? res : Promise.reject(res)).then(d => d.json()).then(dJson => DataTable(config, dJson)).catch(() => alert('Error download'));}).catch(() => alert('Error post'))
}

function editEl(id, idDiv, values)
{
	let url = urls[idDiv] + '/' + id;
	let counter = 1;
	let objValuesEdit = {};
	while(counter != configs[idDiv].columns.length)
	{
		objValuesEdit[configs[idDiv].columns[counter].value] = values[counter-1];
		counter++;
	}
	let config = configs[idDiv];
	fetch(url, {method: 'PUT', body: JSON.stringify(objValuesEdit), headers: {'Content-Type': 'application/json'}}).then(res => res.ok ? res : Promise.reject(res)).then(() => {fetch(urls[idDiv]).then(res => res.ok ? res : Promise.reject(res)).then(d => d.json()).then(dJson => DataTable(config, dJson)).catch(() => alert('Error download'));}).catch(() => alert('Error post'))
}