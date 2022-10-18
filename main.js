'use strict';
$(function () {
	let stepnChart;
	let stepnData;
	function prepareDataSets(_data, _shoesType = 'common') {
		let strShoesType = '';
		let qualityLineColor = '';
		let shoesQuantity;
		let shoesFloor;
		switch (_shoesType) {
			case 'uncommon':
				strShoesType = '綠鞋';
				qualityLineColor = 'rgb(34, 139, 34)';
				shoesQuantity = _data.aryUncommonShoesQuantity;
				shoesFloor = _data.aryUncommonShoesFloor;
				break;
			case 'rare':
				strShoesType = '藍鞋';
				qualityLineColor = 'rgb(0, 191, 255)';
				shoesQuantity = _data.aryRareShoesQuantity;
				shoesFloor = _data.aryRareShoesFloor;
				break;
			case 'epic':
				strShoesType = '紫鞋';
				qualityLineColor = 'rgb(148, 0, 211)';
				shoesQuantity = _data.aryEpicShoesQuantity;
				shoesFloor = _data.aryEpicShoesFloor;
				break;		
			default:
				strShoesType = '灰鞋';
				qualityLineColor = 'rgb(169, 169, 169)';
				shoesQuantity = _data.aryCommonShoesQuantity;
				shoesFloor = _data.aryCommonShoesFloor;
				break;
		}

		let aryDataSets = [];
		aryDataSets.push({
			label: `${strShoesType} - 數量`,
			yAxisID: 'IdCommonQuantity',
			backgroundColor: qualityLineColor,
			borderColor: qualityLineColor,
			data: shoesQuantity,
		});
		aryDataSets.push({
			label: `${strShoesType} - 地板價`,
			yAxisID: 'IdCommonFloor',
			backgroundColor: 'rgb(240, 128, 128)',
			borderColor: 'rgb(240, 128, 128)',
			borderDash: [2, 5],
			data: shoesFloor,
		});
		return aryDataSets;
	}

	function prepareOptions(_data) {
		let aryOptions = {
			scales: {
				IdCommonQuantity: {
					type: 'linear',
					display: true,
					title: {
						text: '數量',
						display: true,
					  },
					position: 'left',
				},
				IdCommonFloor: {
					type: 'linear',
					display: true,
					title: {
						text: 'Sol (Solana)',
						display: true,
					  },
					position: 'right',
					grid: {
						drawOnChartArea: false,
					},
				},
			},
		};
		return aryOptions;
	}


	async function init(_shoesType = 'common') {
		stepnData = await getData();
		console.log(prepareOptions(stepnData));

		stepnChart = new Chart(document.getElementById('StepNChart'), {
			type: 'line',
			data: {
				labels: stepnData.aryDateTime,
				datasets: prepareDataSets(stepnData),
			},
			options: prepareOptions(stepnData),
		});
	}

	async function getData() {
		const stepnDB = await (await fetch('./db/stepnDB.json')).json();
		const aryDateTime = [];
		const aryRunners = [];
		const aryCommonShoesQuantity = [];
		const aryCommonShoesFloor = [];
		const aryUncommonShoesQuantity = [];
		const aryUncommonShoesFloor = [];
		const aryRareShoesQuantity = [];
		const aryRareShoesFloor = [];
		const aryEpicShoesQuantity = [];
		const aryEpicShoesFloor = [];

		stepnDB.stepn.forEach((item) => {
			aryDateTime.push(moment(item.time).format('M/D HH:mm '));
			aryRunners.push(item.runners);
			aryCommonShoesQuantity.push(item.shoes[0].quality);
			aryCommonShoesFloor.push(item.shoes[0].floor);
			aryUncommonShoesQuantity.push(item.shoes[1].quality);
			aryUncommonShoesFloor.push(item.shoes[1].floor);
			aryRareShoesQuantity.push(item.shoes[2].quality);
			aryRareShoesFloor.push(item.shoes[2].floor);
			aryEpicShoesQuantity.push(item.shoes[3].quality);
			aryEpicShoesFloor.push(item.shoes[3].floor);
		});

		return {
			aryDateTime,
			aryRunners,
			aryCommonShoesQuantity,
			aryCommonShoesFloor,
			aryUncommonShoesQuantity,
			aryUncommonShoesFloor,
			aryRareShoesQuantity,
			aryRareShoesFloor,
			aryEpicShoesQuantity,
			aryEpicShoesFloor
		};
	}

	// *** Entry Point ***
	init();

	// *** Event Handler ***
	$('#btn-common').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'common');
		stepnChart.update();
	});

	$('#btn-uncommon').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'uncommon');
		stepnChart.update();
	});

	$('#btn-rare').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'rare');
		stepnChart.update();
	});

	$('#btn-epic').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'epic');
		stepnChart.update();
	});
});


