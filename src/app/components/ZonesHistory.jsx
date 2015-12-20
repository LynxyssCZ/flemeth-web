'use strict';
const React = require('react');
const ClassNames = require('classnames');
const HighChart = require('./HighChart');


const chartOptions = {
	chart: {
		type: 'line'
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
	noData: {
		style: {
			fontWeight: 'bold',
			fontSize: '15px',
			color: '#303030'
		}
	},
	tooltip: {
		shared: true,
		valueSuffix: '°C'
	}
};

class ZonesHistory extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {};
	}

	shouldComponentUpdate(newProps) {
		return !(
			this.props.zones.equals(newProps.zones)
			&& this.props.fetchSnapshots !== newProps.fetchSnapshots
		);
	}

	render() {
		const series = this.getSeries();

		return <div className={this.props.className}>
			<div className={ClassNames('zones-history panel panel-default')}>
				<div className='panel-heading'>
					<h4>Zones History</h4>
				</div>
				<div className='panel-body'>
					<HighChart {...chartOptions} series={series}/>
				</div>
			</div>
		</div>;
	}

	getSeries() {
		return this.props.zones.map(function(zone, key) {
			const zoneDef = {
				id: zone.get('id'),
				name: zone.get('name')
			};

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
	zones: React.PropTypes.object.isRequired,
	fetchSnapshots: React.PropTypes.func.isRequired
};
