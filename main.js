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
				shoesFloor = _data.aryCommonShoesFloor2;
				break;
			case 'uncommon':
				strShoesType = '綠';
				qualityLineColor = 'rgb(34, 139, 34)';
				shoesQuantity = _data.aryUncommonShoesQuantity;
				shoesFloor = _data.aryUncommonShoesFloor2;
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

			case '4-scroll':
				aryDataSets.push({
					label: '灰',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(169, 169, 169)',
					borderColor: 'rgb(169, 169, 169)',
					data: _data.aryCommonScrollFloor,
				});
				aryDataSets.push({
					label: '綠',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(34, 139, 34)',
					borderColor: 'rgb(34, 139, 34)',
					data: _data.aryUncommonScrollFloor,
				});
				aryDataSets.push({
					label: '藍',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryRareScrollFloor,
				});
				aryDataSets.push({
					label: '紫',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(148, 0, 211)',
					borderColor: 'rgb(148, 0, 211)',
					data: _data.aryEpicScrollFloor,
				});
				break;

			case '3-gem-rb':
				aryDataSets.push({
					label: '一級RB',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(255, 215, 0)',
					borderColor: 'rgb(255, 215, 0)',
					data: _data.aryGemsFloor_rb1,
				});
				aryDataSets.push({
					label: '二級RB',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(147, 112, 219)',
					borderColor: 'rgb(147, 112, 219)',
					data: _data.aryGemsFloor_rb2,
				});
				aryDataSets.push({
					label: '三級RB',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryGemsFloor_rb3,
				});
				break;
			case '4-gem-lv1':
				aryDataSets.push({
					label: '一級E',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(255, 215, 0)',
					borderColor: 'rgb(255, 215, 0)',
					data: _data.aryGemsFloor_e1,
				});
				aryDataSets.push({
					label: '一級C',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(178, 34, 34)',
					borderColor: 'rgb(178, 34, 34)',
					data: _data.aryGemsFloor_c1,
				});
				aryDataSets.push({
					label: '一級L',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryGemsFloor_l1,
				});
				aryDataSets.push({
					label: '一級R',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(147, 112, 219)',
					borderColor: 'rgb(147, 112, 219)',
					data: _data.aryGemsFloor_r1,
				});
				break;

			case '4-gem-lv2':
				aryDataSets.push({
					label: '二級E',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(255, 215, 0)',
					borderColor: 'rgb(255, 215, 0)',
					data: _data.aryGemsFloor_e2,
				});
				aryDataSets.push({
					label: '二級C',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(178, 34, 34)',
					borderColor: 'rgb(178, 34, 34)',
					data: _data.aryGemsFloor_c2,
				});
				aryDataSets.push({
					label: '二級L',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryGemsFloor_l2,
				});
				aryDataSets.push({
					label: '二級R',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(147, 112, 219)',
					borderColor: 'rgb(147, 112, 219)',
					data: _data.aryGemsFloor_r2,
				});
				break;

			case '4-gem-lv3':
				aryDataSets.push({
					label: '三級E',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(255, 215, 0)',
					borderColor: 'rgb(255, 215, 0)',
					data: _data.aryGemsFloor_e3,
				});
				aryDataSets.push({
					label: '三級C',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(178, 34, 34)',
					borderColor: 'rgb(178, 34, 34)',
					data: _data.aryGemsFloor_c3,
				});
				aryDataSets.push({
					label: '三級L',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryGemsFloor_l3,
				});
				aryDataSets.push({
					label: '三級R',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(147, 112, 219)',
					borderColor: 'rgb(147, 112, 219)',
					data: _data.aryGemsFloor_r3,
				});
				break;

			case '4-gem-lv4':
				aryDataSets.push({
					label: '四級E',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(255, 215, 0)',
					borderColor: 'rgb(255, 215, 0)',
					data: _data.aryGemsFloor_e4,
				});
				aryDataSets.push({
					label: '四級C',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(178, 34, 34)',
					borderColor: 'rgb(178, 34, 34)',
					data: _data.aryGemsFloor_c4,
				});
				aryDataSets.push({
					label: '四級L',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(0, 191, 255)',
					borderColor: 'rgb(0, 191, 255)',
					data: _data.aryGemsFloor_l4,
				});
				aryDataSets.push({
					label: '四級R',
					yAxisID: 'IdCommonFloor',
					backgroundColor: 'rgb(147, 112, 219)',
					borderColor: 'rgb(147, 112, 219)',
					data: _data.aryGemsFloor_r4,
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
		const stepnDB1 = await (await fetch('./db/stepnDB1.json')).json();
		const stepnDB2 = await (await fetch('./db/stepnDB2.json')).json();

		// *** stepnDB1 ***
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

		// *** stepnDB2 ***
		const aryCommonShoesFloor2 = [];
		const aryUncommonShoesFloor2 = [];
		const aryCommonScrollFloor = [];
		const aryUncommonScrollFloor = [];
		const aryRareScrollFloor = [];
		const aryEpicScrollFloor = [];
		const aryGemsFloor_rb1 = [];
		const aryGemsFloor_rb2 = [];
		const aryGemsFloor_rb3 = [];
		const aryGemsFloor_e1 = [];
		const aryGemsFloor_e2 = [];
		const aryGemsFloor_e3 = [];
		const aryGemsFloor_e4 = [];
		const aryGemsFloor_c1 = [];
		const aryGemsFloor_c2 = [];
		const aryGemsFloor_c3 = [];
		const aryGemsFloor_c4 = [];
		const aryGemsFloor_l1 = [];
		const aryGemsFloor_l2 = [];
		const aryGemsFloor_l3 = [];
		const aryGemsFloor_l4 = [];
		const aryGemsFloor_r1 = [];
		const aryGemsFloor_r2 = [];
		const aryGemsFloor_r3 = [];
		const aryGemsFloor_r4 = [];

		// *** stepnDB1 ***
		stepnDB1.stepn.forEach((item) => {
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

		// *** stepnDB2 ***
		stepnDB2.stepn.forEach((item) => {
			aryCommonShoesFloor2.push(item.floor.shoes.com);
			aryUncommonShoesFloor2.push(item.floor.shoes.ucom);
			aryCommonScrollFloor.push(item.floor.scrolls.com);
			aryUncommonScrollFloor.push(item.floor.scrolls.ucom);
			aryRareScrollFloor.push(item.floor.scrolls.rare);
			aryEpicScrollFloor.push(item.floor.scrolls.epic);
			aryGemsFloor_rb1.push(item.floor.gems.rb1);
			aryGemsFloor_rb2.push(item.floor.gems.rb2);
			aryGemsFloor_rb3.push(item.floor.gems.rb3);
			aryGemsFloor_e1.push(item.floor.gems.e1);
			aryGemsFloor_e2.push(item.floor.gems.e2);
			aryGemsFloor_e3.push(item.floor.gems.e3);
			aryGemsFloor_e4.push(item.floor.gems.e4);
			aryGemsFloor_c1.push(item.floor.gems.c1);
			aryGemsFloor_c2.push(item.floor.gems.c2);
			aryGemsFloor_c3.push(item.floor.gems.c3);
			aryGemsFloor_c4.push(item.floor.gems.c4);
			aryGemsFloor_l1.push(item.floor.gems.l1);
			aryGemsFloor_l2.push(item.floor.gems.l2);
			aryGemsFloor_l3.push(item.floor.gems.l3);
			aryGemsFloor_l4.push(item.floor.gems.l4);
			aryGemsFloor_r1.push(item.floor.gems.r1);
			aryGemsFloor_r2.push(item.floor.gems.r2);
			aryGemsFloor_r3.push(item.floor.gems.r3);
			aryGemsFloor_r4.push(item.floor.gems.r4);
		});

		return {
			// *** stepnDB1 ***
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

			// *** stepnDB2 ***
			aryCommonShoesFloor2,
			aryUncommonShoesFloor2,
			aryCommonScrollFloor,
			aryUncommonScrollFloor,
			aryRareScrollFloor,
			aryEpicScrollFloor,
			aryGemsFloor_rb1,
			aryGemsFloor_rb2,
			aryGemsFloor_rb3,
			aryGemsFloor_e1,
			aryGemsFloor_e2,
			aryGemsFloor_e3,
			aryGemsFloor_e4,
			aryGemsFloor_c1,
			aryGemsFloor_c2,
			aryGemsFloor_c3,
			aryGemsFloor_c4,
			aryGemsFloor_l1,
			aryGemsFloor_l2,
			aryGemsFloor_l3,
			aryGemsFloor_l4,
			aryGemsFloor_r1,
			aryGemsFloor_r2,
			aryGemsFloor_r3,
			aryGemsFloor_r4,
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

	$('#btn-4-scroll').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4-scroll');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-3-gem-rb').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '3-gem-rb');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-gem-lv1').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4-gem-lv1');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-gem-lv2').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4-gem-lv2');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-gem-lv3').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4-gem-lv3');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});

	$('#btn-4-gem-lv4').on('click', function (e) {
		stepnChart.data.datasets = prepareDataSets(stepnData, '4-gem-lv4');
		stepnChart.options.scales.IdCommonFloor.display = true;
		stepnChart.options.scales.IdCommonFloor.position = 'left';
		stepnChart.options.scales.IdCommonQuantity.display = false;
		stepnChart.resetZoom();
		stepnChart.update();
	});
});
