let dataTable = {};
const classNumbers = ['fa-sort', 'fa-sort-numeric-up-alt', 'fa-sort-numeric-down-alt'];
const classString = ['fa-sort', 'fa-sort-alpha-down', 'fa-sort-alpha-down-alt'];
function DataTablePlusSearch(config, data)
{
	let idDiv = config.parent;
	config.parent += 'd1a3455sd65asdf665asdf776asd7676as5df'; // вообще без понятия как сделать кусок который никогда не продубирует пользователь, поэтому так, можно еще дописать пару десятков рядков))
	(config.search) ? (z = '<input type="text" id="' + config.parent + 'Input"oninput="search(`' + config.parent + '.config`, `' + config.parent + '.data`)">' + createModal(config) + '<div id="' + config.parent + '"></div>') : (z = createModal(config) + '<div id="' + config.parent + '"></div>');
	document.getElementById(idDiv).innerHTML = z;
	DataTable(config, data);
}

function DataTable(config, data, idButton, typeSortNew)
{
	if(!data) {get(config.apiUrl, config); return 0;}

	let table = '<div id="' + config.parent + 'modalDivEdit"></div><table class="table">';
	let counter = 0;
	let dataArray = [];
	dataObj = {...data};
	while(dataObj[counter] != undefined) 
	{
		dataArray[counter] = dataObj[counter];// если запуск функции после сортировки то дата стала объектом мы ее делаем массивом дальше если это подтверждается то присваиваем
		counter++;
	}
	dataTable[config.parent + '.config'] = {...config};
	(idButton) ? (counter = 0) : (dataTable[config.parent + '.data'] = dataArray);
	table += createHead(config, idButton, typeSortNew);
	table += createBody(data, config.parent);
	table += '</table>';
	document.getElementById(config.parent).innerHTML = table;
}

function createHead(config, idButton, typeSortNew)
{
	let counter = 0;
	let temp = '';
	let tmp2;
	(typeSortNew == 0) ? (tmp2 = 1) : (tmp2 = tmp2); (typeSortNew == 1) ? (tmp2 = 2) : (tmp2 = tmp2); (typeSortNew == 2) ? (tmp2 = 0) : (tmp2 = tmp2);
	table = '<thead><tr>';
	while(counter != config.columns.length)
	{
		temp = '<td>' + config.columns[counter].title + '</td>'; // если ифы дальше запустяться то темп перезапишется
		dataTable[config.parent + '.nameProperties' + counter] = config.columns[counter].value;
		dataTable[config.parent + '.calculateAge' + counter] = config.columns[counter].calculateAge;


		if(config.columns[counter].sortable && config.columns[counter].type == 'number')
		{
			(idButton && (idButton == config.parent + '_buttonSort' + counter)) ? (classBtn = classNumbers[tmp2]) : (classBtn = classString[1]); // (idButton) если функция запущена через кнопку
			temp = '<td>' + config.columns[counter].title + '<i class="fas ' + classBtn + '" id="' + config.parent + '_buttonSort' + counter + '" data-number="' + counter + '"onclick="sortAndBuildTable(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
		}
		else if(config.columns[counter].sortable)
		{
			(idButton && (idButton == config.parent + '_buttonSort' + counter)) ? (classBtn = classString[tmp2]) : (classBtn = classString[1]); // (idButton) если функция запущена через кнопку
			temp = '<td>' + config.columns[counter].title + '<i class="fas ' + classBtn + '" id="' + config.parent + '_buttonSort' + counter + '" data-number="' + counter + '"onclick="sortAndBuildTable(`' + config.parent + '_buttonSort' + counter + '`, `' + config.parent + '`)"></i>' + '</td>';
		}
		(idButton) ? (dataTable[config.parent + '.' + idButton + 'Type'] = typeSortNew) : (dataTable[config.parent + '.' + config.parent + '_buttonSort' + counter + 'Type'] = 0);

		table += temp;
		dataTable[config.parent + '.type' + counter] = config.columns[counter].type;
		counter++;
	}
	dataTable[config.parent + '.size'] = counter;	
	table += '<td>Act</td></tr></thead>';
	return table;
}
function createBody(data, id)
{
	dataObj = {...data};
	let dataArray = [];
	let counter = 0;
	while(dataObj[counter] != undefined)
	{
		dataArray[counter] = dataObj[counter];
		counter++;
	}
	dataTable[id + '.dataNow'] = dataArray;
	let counter1 = 0;
	counter = 0;
	let temp = '';
	table = '<tbody>';
	while(counter1 != data.length)
	{
		counter = 1;
		table += '<tr><td>' + (+counter1 + 1) + '</td>';
		while(counter != dataTable[id + '.size']+1)
		{
			if(counter == dataTable[id + '.size'])
			{
				table += '<td><button onclick="deleteEl(`' + data[counter1].id + '`, `' + id + '`)">' + 'Del' +'</button><button onclick="createEditModal(`' + data[counter1].id + '`, `' + id + '`)">' + 'Edit' +'</button></td>';				
			}
			else
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
	difference = (temp2 - temp)/(365*24*60*60*1000);
	(difference < 1) ? (difference = Math.trunc(difference / 0.08333333333333333) + ' month') : (difference = Math.trunc(difference));
	return difference;
}

function sortAndBuildTable(idButton, id)
{
	let dataNow = dataTable[id + '.dataNow'];
	let dataNowArray = [];
	typeSort = dataTable[id + '.' + idButton + 'Type'];
	nameColumn = dataTable[id + '.' + 'nameProperties' + document.getElementById(idButton).dataset.number];
	let counter = 0;
	while(dataNow[counter] != undefined)
	{
		dataNowArray[counter] = dataNow[counter];
		counter++;
	}
	if(typeSort == 0)
	{
		dataNowArray.sort(function(a, b) {return('' + a[nameColumn]).localeCompare(b[nameColumn]);});
		typeSort = 1;
	}
	else if(typeSort == 1)
	{
		dataNowArray.sort(function(a, b) {return('' + b[nameColumn]).localeCompare(a[nameColumn]);});
		typeSort = 2;
	}
	else if(typeSort == 2)
	{
		dataNowArray = dataTable[id + '.data'];
		typeSort = 0;
	}
	counter = 0;
	DataTable(dataTable[id + '.config'], dataNowArray, idButton, typeSort);
}

function search(configLink, dataLink)
{	
	let config = dataTable[configLink]; let data = dataTable[dataLink];
	let dataResult = [];
	if(config.search == true) dataResult = searchStandart(data, config, document.getElementById(config.parent + 'Input').value);
	else
	{
		let fields = [];
		let filters = config.search.filters;
		(config.search.fields) ? (fields = config.search.fields) : (fields = walkThroughTheArrayAndTakeValues(config.columns));
		let temp = 0;
		let counterdataResult = -1;
		let counter = 0;
		let counter2 = 0;
		let counter3 = 0;
		while(counter != fields.length)
		{
			counter2 = 0;
			while(counter2 != data.length)
			{
				temp = 0;
				counter3 = 0;
				while(counter3 != filters.length)
				{
					x = document.getElementById(config.parent + 'Input').value;
					textAfterFilter = filters[counter3](x);
					x = data[counter2][fields[counter]];
					dataAfterFilter = filters[counter3](x);
					(textAfterFilter == dataAfterFilter) ? (temp++) : (temp = temp);
					counter3++;
				}
				counterdataResult++;
				(temp && !dublikation(dataResult, data[counter2])) ? (dataResult[counterdataResult] = data[counter2]) : (counterdataResult--);
				counter2++;
			}
			counter++;
		}
	}
	DataTable(config, dataResult, 1, 2);//если запустить без значений 3 и 4 то функция перезаписывает дата тэйбл, и все, он работает с пустотой
}

function searchStandart(data, config, text)
{
	let dataArray = [];
	let counter = 0;
	let counter2 = 0;
	let counter3 = 1;
	let temp = 0;
	while(counter != data.length)
	{
		temp = 0;
		counter3 = 1;
		while(counter3 != config.columns.length)
		{
			(data[counter][config.columns[counter3].value] == text) ? temp = 1 : temp = temp; //если хоть одно значение с рядка подходит то добавляем рядок
			counter3++;
		}
		if(temp){dataArray[counter2] = data[counter]; counter2++;}
		counter++;
	}
	return dataArray;
}

function walkThroughTheArrayAndTakeValues(fields)
{
	let arrayValues = [];
	let counter = 1;
	while(counter != fields.length)
	{
		arrayValues[counter - 1] = fields[counter]['value'];
		counter++;
	}
	return arrayValues;
}

function dublikation(array, text)
{
	counter = 0;
	temp = 0;
	while(counter != array.length)
	{
		(array[counter] == text) ? (temp++) : (temp = temp);
		counter++;
	}
	return temp;
}

function createEditModal(idEl, idDiv)
{
	let counter = 1;
	let config = dataTable[idDiv + '.config'];
	let id1 = config.parent + 'modalEditElements';
	let temp = '<div class="backgroundModal" id="' + id1 + '1"><div class="modalWindowCenter"><i class="fas fa-times" onclick="modal(`' + id1 + '1`)"></i><div>';
	while(counter != config.columns.length)
	{
		temp += '<p>' + config.columns[counter].value + '</p><input data-target="' + config.columns[counter].value + '" id="' + id1 + '1Input' + counter + '">';
		counter++;
	}
	temp += '</div><button onclick="modal(`' + id1 + '1`); buildArrayAndStart(`' + idEl + '`, `' + config.parent + '`)">Save</button></div></div>';
	document.getElementById(config.parent + 'modalDivEdit').innerHTML = temp;//value
}

let arrayIdInputsValueEdit = {};//я знаю что это не эррей, но так получилось)
function buildArrayAndStart(idEl, id)
{
	let counter = 1;
	let arrayTemp = [];
	while(counter != dataTable[id + '.config'].columns.length)
	{
		arrayTemp[counter-1] = document.getElementById(id + 'modalEditElements1Input' + counter).value;
		counter++;
	}
	arrayIdInputsValueEdit[id] = arrayTemp;
	editEl(idEl, id, arrayIdInputsValueEdit[id]);
}