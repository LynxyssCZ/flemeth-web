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
		layout: 'horizontal',
		align: 'center',
		verticalAlign: 'bottom',
		borderWidth: 1,
		backgroundColor: '#FFFFFF'
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

class ZonesHistory extends React.Component {
	constructor(props, context) {
		super(props, context);

		if (props.zonesSnapshots) {
			this.state = {
				initialData: this.getSnapshotsData(props.zonesSnapshots),
				lastTime: props.zonesSnapshots.get('lastTime')
			};
		}
		else {
			this.state = {};
		}
	}

	getSnapshotsData(zonesSnapshots, startTime) {
		if (zonesSnapshots) {
			return zonesSnapshots
			.get('data')
			.toArray()
			.filter(function filterSnapshots(snapshot) {
				return (snapshot.time > (startTime || 0));
			}, this)
			.sort(snapshotSorter)
			.reduce(function separateSnapshots(initialData, snapshot) {
				var temps = snapshot.data;

				for (var i = 0; i < temps.length; i++) {
					var zoneTemp = temps[i];


					if (initialData[zoneTemp.zoneId]) {
						initialData[zoneTemp.zoneId].push([snapshot.time, zoneTemp.temp]);
					}
					else {
						initialData[zoneTemp.zoneId] = [[snapshot.time, zoneTemp.temp]];
					}
				}

				return initialData;
			}, {});
		}
	}

	shouldComponentUpdate(newProps) {
		return !(newProps.zones.keySeq().equals(this.props.zones.keySeq()));
	}

	componentWillReceiveProps(nextProps) {
		var chart = this.refs.chart;

		if (!chart
			|| !nextProps.zonesSnapshots
			|| this.state.lastTime >= nextProps.zonesSnapshots.get('lastTime')
		) {
			return;
		}

		var snapshotsData = this.getSnapshotsData(nextProps.zonesSnapshots, this.state.lastTime);
		var setData = !this.state.lastTime;

		if (snapshotsData) {
			this.setState({
				lastTime: nextProps.zonesSnapshots.get('lastTime')
			});

			Object.keys(snapshotsData).filter(function(zoneId) {
				return this.props.zones.has(zoneId);
			}, this).forEach(function updateSeries(seriesId) {
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

			if (setData) {
				this.setState({
					initialData: snapshotsData
				});
			}
		}
	}

	render() {
		const series = this.getSeries();

		return <div className={this.props.className}>
			<div className={ClassNames('zones-history panel panel-default')}>
				<div className='panel-heading'>
					<h4>Zones History</h4>
				</div>
				<div className='panel-body'>
					<HighChart ref='chart' {...chartOptions} series={series}/>
				</div>
			</div>
		</div>;
	}

	getSeries() {
		var initialData = this.state.initialData;

		return this.props.zones.map(function(zone, key) {
			const zoneDef = {
				id: zone.get('id'),
				name: zone.get('name'),
				data: initialData ? initialData[zone.get('id')] : null
			};

			if (!zone.get('priority')) {
				zoneDef.visible = false;
			}

			if (key === 'global') {
				zoneDef.name = 'Global';
			}

			return zoneDef;
		}).toArray();
	}
}
module.exports = ZonesHistory;

ZonesHistory.displayName = 'ZonesHistory';
ZonesHistory.proptypes = {
	zonesSnapshots: React.PropTypes.object,
	snapshotsCount: React.PropTypes.number
};

ZonesHistory.defaultProps = {
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
