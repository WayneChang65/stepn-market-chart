'use strict';
$(function () {
	let myChart;
	function prepareDataSets(_data) {
		let aryDataSets = [];
		aryDataSets.push({
			label: '綠鞋 - 數量',
			yAxisID: 'IdCommonQuantity',
			backgroundColor: 'rgb(34, 139, 34)',
			borderColor: 'rgb(34, 139, 34)',
			data: _data.aryCommonShoesQuantity,
		});
		aryDataSets.push({
			label: '綠鞋 - 地板價',
			yAxisID: 'IdCommonFloor',
			backgroundColor: 'rgb(255, 20, 147)',
			borderColor: 'rgb(255, 20, 147)',
			borderDash: [2, 5],
			data: _data.aryCommonShoesFloor,
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


	async function chartIt() {
		const data = await getData();
		console.log(prepareOptions(data));
		const config = {
			type: 'line',
			data: {
				labels: data.aryDateTime,
				datasets: prepareDataSets(data),
			},
			options: prepareOptions(data),
		};
		myChart = new Chart(document.getElementById('myChart'), config);
	}

	async function getData() {
		const stepnDB = await (await fetch('./db/stepnDB.json')).json();
		const aryDateTime = [];
		const aryRunners = [];
		const aryCommonShoesQuantity = [];
		const aryCommonShoesFloor = [];

		stepnDB.stepn.forEach((item) => {
			aryDateTime.push(moment(item.time).format('M/D HH:mm '));
			aryRunners.push(item.runners);
			aryCommonShoesQuantity.push(item.shoes[1].quality);
			aryCommonShoesFloor.push(item.shoes[1].floor);
		});

		return {
			aryDateTime,
			aryRunners,
			aryCommonShoesQuantity,
			aryCommonShoesFloor,
		};
	}

	// *** Entry Point ***
	chartIt();

	// *** Event Handler ***
	$('#btn-test-1').on('click', function (e) {
		console.log('btn-test-1');
		console.log(myChart.data.datasets[0].data);
	});
});


