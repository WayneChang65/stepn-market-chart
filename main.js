'use strict';
$(function () {
	let stepnChart;
	let stepnData;
	function prepareDataSets(_data, _shoesType = 'common') {
		let strShoesType = '';
		let qualityLineColor = '';
		let shoesQuantity;
		let shoesFloor;
		let runnersQuantity;
		switch (_shoesType) {
			case 'common':
				strShoesType = '灰';
				qualityLineColor = 'rgb(169, 169, 169)';
				shoesQuantity = _data.aryCommonShoesQuantity;
				shoesFloor = _data.aryCommonShoesFloor;
				break;
			case 'uncommon':
				strShoesType = '綠';
				qualityLineColor = 'rgb(34, 139, 34)';
				shoesQuantity = _data.aryUncommonShoesQuantity;
				shoesFloor = _data.aryUncommonShoesFloor;
				break;
			case 'rare':
				strShoesType = '藍';
				qualityLineColor = 'rgb(0, 191, 255)';
				shoesQuantity = _data.aryRareShoesQuantity;
				shoesFloor = _data.aryRareShoesFloor;
				break;
			case 'epic':
				strShoesType = '紫';
				qualityLineColor = 'rgb(148, 0, 211)';
				shoesQuantity = _data.aryEpicShoesQuantity;
				shoesFloor = _data.aryEpicShoesFloor;
				break;
			case 'runners':
				strShoesType = '跑者人數';
				qualityLineColor = 'rgb(255, 69, 0)';
				runnersQuantity = _data.aryRunners;
				break;

			default:
				break;
		}

		let aryDataSets = [];
		switch (_shoesType) {
			case 'runners':
				aryDataSets.push({
					label: '跑者 - 數量',
					yAxisID: 'IdCommonQuantity',
					backgroundColor: qualityLineColor,
					borderColor: qualityLineColor,
					data: runnersQuantity,
				});
				break;
			case '4_shoes_quantity':
				aryDataSets.push({
					label: '灰',
					yAxisID: 'IdCommonQuantity',
					backgroundColor: 'rgb(169, 169, 169)',
					borderColor: 'rgb(169, 169, 169)',
					data: _data.aryCommonShoesQuantity,
				});
				aryDataSets.push({
					label: '綠',
					yAxisID: 'IdCommonQuantity',
					backgroundColor: 'rgb(34, 139, 34)',
					borderColor: 'rgb(34, 139, 34)',
					data: _data.aryUncommonShoesQuantity,
				});
				aryDataSets.push({
					label: '藍',
					yAxisID: 'IdCommonQuantity',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryRareShoesQuantity,
				});
				aryDataSets.push({
					label: '紫',
					yAxisID: 'IdCommonQuantity',
					backgroundColor: 'rgb(148, 0, 211)',
					borderColor: 'rgb(148, 0, 211)',
					data: _data.aryEpicShoesQuantity,
				});
				break;

			case '4_shoes_floor':
				aryDataSets.push({
					label: '灰',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(169, 169, 169)',
					borderColor: 'rgb(169, 169, 169)',
					data: _data.aryCommonShoesFloor,
				});
				aryDataSets.push({
					label: '綠',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(34, 139, 34)',
					borderColor: 'rgb(34, 139, 34)',
					data: _data.aryUncommonShoesFloor,
				});
				aryDataSets.push({
					label: '藍',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryRareShoesFloor,
				});
				aryDataSets.push({
					label: '紫',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(148, 0, 211)',
					borderColor: 'rgb(148, 0, 211)',
					data: _data.aryEpicShoesFloor,
				});
				break;

			default:
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
				break;
		}
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
			plugins: {
				zoom: {
					limits: {
						x: { minRange: 50 },
					},
					pan: {
						enabled: true,
						mode: 'x',
					},
					zoom: {
						wheel: {
							enabled: true,
						},
						pinch: {
							enabled: true,
						},
						mode: 'x',
						onZoomComplete({ chart }) {
							chart.update();
						},
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
			aryEpicShoesFloor,
		};
	}

	// *** Entry Point ***
	init();

	// *** Event Handler ***
	$('#btn-common').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'common');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-uncommon').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'uncommon');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-rare').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'rare');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-epic').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'epic');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-quantity').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(
			stepnData,
			'4_shoes_quantity'
		);
		stepnChart.options.scales.IdCommonFloor.display = false;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-floor').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4_shoes_floor');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-runners').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, 'runners');
		stepnChart.options.scales.IdCommonFloor.display = false;
		stepnChart.options.scales.IdCommonFloor.position = 'right';
		stepnChart.options.scales.IdCommonQuantity.display = true;
		stepnChart.resetZoom();
		stepnChart.update();
	});
});
