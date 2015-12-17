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

	render() {
		var series = [];

		this.props.zones.forEach(function() {
			console.log(arguments);
		});

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
}
module.exports = ZonesHistory;

ZonesHistory.displayName = 'ZonesHistory';
ZonesHistory.proptypes = {
	tempChecker: React.PropTypes.object.isRequired,
	zones: React.PropTypes.object.isRequired,
	fetchZonesValues: React.PropTypes.func.isRequired
};
