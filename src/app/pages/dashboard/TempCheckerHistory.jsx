'use strict';
const React = require('react');
const ClassNames = require('classnames');
const HighChart = require('../../components/HighChart');


const chartOptions = {
	chart: {
		type: 'spline',
		zoomType: 'x'
	},
	title: {
		text: ''
	},
	legend: {
		enabled: false
	},
	xAxis: {
		title: {
			text: 'Time'
		},
		type: 'datetime',
		tickInterval: 1800000,
		endOnTick: true,
		startOnTick: true,
		labels: {
			step: 5,
			rotation: -45,
			format: '{value:%m/%d <b>%H:%M</b>}'
		}
	},
	yAxis: {
		title: {
			text: 'Temperature'
		},
		tickInterval: 0.5,
		minRange: 3,
		ceiling: 100,
		labels: {
			format: '{value:.2f} °C',
			step: 2
		}
	},
	lang: {
		noData: 'Snapshots not loaded yet'
	},
	plotOptions: {
		spline: {
			marker: {
				enabled: false
			}
		}
	},
	noData: {
		style: {
			fontWeight: 'bold',
			fontSize: '15px',
			color: '#303030'
		}
	},
	tooltip: {
		shared: true,
		valueSuffix: '°C',
		valueDecimals: 2
	}
};

class TempCheckerHistory extends React.Component {
	constructor(props, context) {
		super(props, context);

		if (props.tempCheckerSnapshots) {
			this.state = {
				initialData: this.getSnapshotsData(props.tempCheckerSnapshots),
				lastTime: props.tempCheckerSnapshots.get('lastTime')
			};
		}
		else {
			this.state = {};
		}
	}

	getSnapshotsData(tempCheckerSnapshots, startTime) {
		if (tempCheckerSnapshots) {
			return tempCheckerSnapshots
			.get('data')
			.toArray()
			.filter(function filterSnapshots(snapshot) {
				return snapshot.time > (startTime || 0);
			})
			.sort(snapshotSorter)
			.reduce(function separateSnapshots(initialData, snapshot) {
				var sample = snapshot.data;

				initialData.temp.push([snapshot.time, sample.temp]);
				initialData.target.push([snapshot.time, sample.target - sample.hysteresis, sample.target + sample.hysteresis]);

				return initialData;
			}, {
				temp: [],
				target: []
			});
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(nextProps) {
		var chart = this.refs.chart;

		if (!chart
			|| !nextProps.tempCheckerSnapshots
			|| this.state.lastTime >= nextProps.tempCheckerSnapshots.get('lastTime')
		) {
			return;
		}

		var snapshotsData = this.getSnapshotsData(nextProps.tempCheckerSnapshots, this.state.lastTime);
		var addMethod = this.state.lastTime ? 'addPoint' : 'setData';

		this.setState({
			lastTime: nextProps.tempCheckerSnapshots.get('lastTime')
		});

		return Object.keys(snapshotsData).forEach(function updateSeries(seriesId) {
			chart[addMethod](seriesId, snapshotsData[seriesId]);
		});
	}

	render() {
		const series = this.getSeries();

		return <div className={this.props.className}>
			<div className={ClassNames('tempChecker-history panel panel-default')}>
				<div className='panel-heading'>
					<h4>Temp Checker History</h4>
				</div>
				<div className='panel-body'>
					<HighChart ref='chart' {...chartOptions} series={series}/>
				</div>
			</div>
		</div>;
	}

	getSeries() {
		var initialData = this.state.initialData;

		return [
			{
				id: 'temp',
				name: 'Temperature',
				zIndex: 1,
				data: initialData ? initialData.temp : null
			}, {
				id: 'target',
				name: 'Target',
				type: 'areasplinerange',
				linkedTo: ':previous',
				fillOpacity: 0.3,
				zIndex: 0,
				data: initialData ? initialData.target : null
			}
		];
	}
}
module.exports = TempCheckerHistory;

TempCheckerHistory.displayName = 'TempCheckerHistory';
TempCheckerHistory.proptypes = {
	tempCheckerSnapshots: React.PropTypes.object
};

function snapshotSorter(a, b) {
	if (a.time < b.time) {
		return -1;
	}
	else if (b.time < a.time) {
		return 1;
	}
	else {
		return 0;
	}
}
