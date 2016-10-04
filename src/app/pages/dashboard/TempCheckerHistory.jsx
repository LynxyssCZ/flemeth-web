'use strict';
const React = require('react');
const ClassNames = require('classnames');
const HighChart = require('../../components/HighChart');
const Highcharts = require('highcharts');


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
				return (snapshot.time > (startTime || 0));
			}, this)
			.sort(snapshotSorter)
			.reduce(function separateSnapshots(initialData, snapshot) {
				var sample = snapshot.data;

				initialData.temp.push({
					x: snapshot.time,
					y: sample.temp,
					color: snapshot.state === false ? 'red' : null
				});
				initialData.target.push({
					x: snapshot.time,
					low: sample.target - sample.hysteresis,
					high: sample.target + sample.hysteresis
				});

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
		var setData = !this.state.lastTime;

		if (snapshotsData) {
			this.setState({
				lastTime: nextProps.tempCheckerSnapshots.get('lastTime')
			});

			Object.keys(snapshotsData).forEach(function updateSeries(seriesId) {
				const series = chart.getSeries(seriesId);

				if (setData) {
					series.setData(snapshotsData[seriesId]);
				}
				else {
					snapshotsData[seriesId].forEach(function addPoint(point) {
						series.addPoint(point, false, series.data.length >= this.props.snapshotsCount);
					}, this);
				}
			}, this);

			chart.redraw();
		}
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
				color: Highcharts.getOptions().colors[0],
				lineColor: '#303030',
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
	tempCheckerSnapshots: React.PropTypes.object,
	snapshotsCount: React.PropTypes.number
};

TempCheckerHistory.defaultProps = {
	snapshotsCount: 288
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
