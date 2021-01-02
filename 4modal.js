let arrayIdInputsValue = {};
function createModal(config)
{
	let counter = 1;
	let id1 = config.parent + 'modalElements';
	let temp = '<button onclick="modal(`' + id1 + '1`)">Add</button><div class="backgroundModal unvisible" id="' + id1 + '1"><div class="modalWindowCenter"><i class="fas fa-times" onclick="modal(`' + id1 + '1`)"></i><div>';
	while(counter != config.columns.length)
	{
		temp += '<p>' + config.columns[counter].value + '</p><input data-target="' + config.columns[counter].value + '" id="' + id1 + '1Input' + counter + '">';
		counter++;
	}
	temp += '</div><button onclick="modal(`' + id1 + '1`); buildArrayAndSave(`' + config.parent + '`)">Save</button></div></div>';
	return temp;
}

function modal(id)
{
	document.getElementById(id.slice(0, -1) + '1').classList.toggle('unvisible');
}

function buildArrayAndSave(id)
{
	let counter = 1;
	let arrayTemp = [];
	while(counter != dataTable[id + '.config'].columns.length)
	{
		arrayTemp[counter-1] = document.getElementById(id + 'modalElements1Input' + counter).value;
		counter++;
	}
	arrayIdInputsValue[id] = arrayTemp;
	save(id, arrayIdInputsValue[id]);
}