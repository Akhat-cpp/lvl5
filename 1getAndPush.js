function get(url, config)
{

	// fetch(url).then(function(response) {
	//   response.json().then(function(json) {
	//     console.log(json);
	//     return json;
	//   });
	// });

	fetch(url).then(res => res.ok ? res : Promise.reject(res)).then(d => d.json()).then(dJson => DataTable(config, dJson)).catch(() => alert('Error download Data'));
}