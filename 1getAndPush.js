function get(url, config)
{

	// fetch(url).then(function(response) {
	//   response.json().then(function(json) {
	//     console.log(json);
	//     return json;
	//   });
	// });

	fetch(url).then(d => d.json()).then(dJson => DataTable(config, dJson));
}