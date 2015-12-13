var inherits = require('util').inherits;
var React = require('react');
var ClassNames = require('classnames');
var HighChart = require('./HighChart');

var chartOptions = {
	chart: {
		type: 'areaspline'
	},
	title: {
		text: 'Average fruit consumption during one week'
	},
	legend: {
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'top',
		x: 150,
		y: 100,
		floating: true,
		borderWidth: 1,
		backgroundColor: '#FFFFFF'
	},
	xAxis: {
		categories: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		],
		plotBands: [{ // visualize the weekend
			from: 4.5,
			to: 6.5,
			color: 'rgba(68, 170, 213, .2)'
		}]
	},
	yAxis: {
		title: {
			text: 'Fruit units'
		}
	},
	tooltip: {
		shared: true,
		valueSuffix: ' units'
	},
	credits: {
		enabled: false
	},
	plotOptions: {
		areaspline: {
			fillOpacity: 0.5
		}
	},
	series: [{
		name: 'John',
		data: [3, 4, 3, 5, 4, 10, 12]
	}, {
		name: 'Jane',
		data: [1, 3, 4, 3, 3, 5, 4]
	}]
};

var ZonesHistory = function(props, context) {
	React.Component.call(this, props, context);

	this.state = {};
}; ZonesHistory.prototype.constructor = ZonesHistory;
inherits(ZonesHistory, React.Component);
module.exports = ZonesHistory;

ZonesHistory.displayName = 'ZonesHistory';
ZonesHistory.proptypes = {
	tempChecker: React.PropTypes.object.isRequired,
	zones: React.PropTypes.object.isRequired,
	fetchZonesValues: React.PropTypes.func.isRequired
};

ZonesHistory.prototype.render = function () {
	var options = chartOptions;

	return <div className={this.props.className}>
		<div className={ClassNames('zones-history panel panel-default')}>
			<div className='panel-heading'>
				<h4>Zones History</h4>
			</div>
			<div className='panel-body'>
				<HighChart options={options}/>
			</div>
		</div>
	</div>;
};
