let dataTable = {};
function DataTable(config, data)
{
	if(!data) {get(config.apiUrl, config); return 0;}

	let table = '<table class="table">';
	table += createHead(config);
	table += createBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function createHead(config)
{
	let counter = 0;
	table = '<thead><tr>';
	while(counter != config.columns.length)
	{
		table += '<td>' + config.columns[counter].title + '</td>';
		dataTable[config.parent + '.nameProperties' + counter] = config.columns[counter].value; //тут мы просто записываем данные их массива конфаига в html данные в свой объект
		dataTable[config.parent + '.type' + counter] = config.columns[counter].type;
		dataTable[config.parent + '.calculateAge' + counter] = config.columns[counter].calculateAge;
		counter++;
	}
	dataTable[config.parent + '.size'] = counter;
	table += '</tr></thead>';
	return table;
}
function createBody(data, id)
{
	let counter1 = 0;
	let counter;
	let temp = '';
	table = '<tbody>';
	while(counter1 != data.length)
	{
		counter = 1;
		table += '<tr><td>' + counter1 + '</td>';
		while(counter != dataTable[id + '.size'])
		{
			temp = dataTable[id + '.nameProperties' + counter];
			if(dataTable[id + '.type' + counter] == 'number')
			{
				if(dataTable[id + '.calculateAge' + counter])
				{
					temp1 = calculateAge(data[counter1][temp]);
					table += '<td class="align-right">' + temp1 + '</td>';
				}
				else 
				{
					table += '<td class="align-right">' + data[counter1][temp] + '</td>';
				}
			}
			else
			{
				table += '<td>' + data[counter1][temp] + '</td>';
			}
			counter++;
		}
		table += '</tr>';
		counter1++;
	}
	table += '</tbody>';
	return table;
}

function calculateAge(b)
{
	let today = new Date;
	temp = +(b.slice(0, 4)*31536000000 + +b.slice(5,7)*2592000000 + +b.slice(8, 10)*86400000 + +b.slice(11, 13)*3600000 + +b.slice(14, 16)*60000 + +b.slice(17, 19)*1000 + +b.slice(20, 23));
	temp2 = today.getFullYear()*31536000000 + (today.getMonth()+1)*2592000000 + (today.getDate()+1)*86400000 + (today.getHours()+1)*3600000 + (today.getMinutes()+1)*60000 + (today.getSeconds()+1)*1000 + today.getMilliseconds()+1;
	return Math.trunc((temp2 - temp)/(365*24*60*60*1000));
}