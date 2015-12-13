var inherits = require('util').inherits;
var React = require('react');
var Highcharts = require('highcharts');
var Hash = require('object-hash');
var assign = require('object-assign');

var HighChart = function(props, context) {
	React.Component.call(this, props, context);

	this.state = {};
}; HighChart.prototype.constructor = HighChart;
inherits(HighChart, React.Component);
module.exports = HighChart;

HighChart.displayName = 'HighChart';
HighChart.proptypes = {
	options: React.PropTypes.object
};

HighChart.prototype.getChart = function () {
	return this.chart;
};

HighChart.prototype.addPoint = function (seriesId, point) {
	return this.chart.get(seriesId).addPoint(point);
};

HighChart.prototype.addSeries = function (series) {
	this.chart.addSeries(series);
};

HighChart.prototype.shouldComponentUpdate = function (nextProps) {
	return Hash(this.props.options) !== Hash(nextProps.options);
};

HighChart.prototype.componentDidMount = function () {
	var chartConfig = assign({}, this.props.options.chart, {
		renderTo: this.refs.canvas
	});

	var config = assign({}, this.props.options, {
		chart: chartConfig
	});

	this.renderChart(config);
};

HighChart.prototype.componentWillUnmount = function () {
	if (this.chart) {
		this.chart.destroy();
		this.chart = undefined;
	}
};

HighChart.prototype.componentDidUpdate = function () {
	var chartConfig = assign({}, this.props.options.chart, {
		renderTo: this.refs.canvas
	});

	var config = assign({}, this.props.options, {
		chart: chartConfig
	});

	this.renderChart(config);
};

HighChart.prototype.render = function () {
	return <div className={this.props.className}>
		<div ref='canvas' className='serial-chart'></div>
	</div>;
};

HighChart.prototype.renderChart = function (config) {
	if (this.chart) {
		this.chart.destroy();
	}

	this.chart = new Highcharts.Chart(config);
};
