const inherits = require('util').inherits;
const React = require('react');
const Highcharts = require('highcharts');
const Hash = require('object-hash');

const HighChart = function(props, context) {
	React.Component.call(this, props, context);

	this.state = {};
}; HighChart.prototype.constructor = HighChart;
inherits(HighChart, React.Component);
module.exports = HighChart;

HighChart.displayName = 'HighChart';
HighChart.proptypes = {
	chart: React.PropTypes.object,
	colors: React.PropTypes.array,
	credits: React.PropTypes.object,
	data: React.PropTypes.object,
	drilldown: React.PropTypes.object,
	exporting: React.PropTypes.object,
	labels: React.PropTypes.object,
	lang: React.PropTypes.object,
	legend: React.PropTypes.object,
	loading: React.PropTypes.object,
	navigation: React.PropTypes.object,
	noData: React.PropTypes.object,
	pane: React.PropTypes.object,
	plotOptions: React.PropTypes.object,
	series: React.PropTypes.array,
	subtitle: React.PropTypes.object,
	title: React.PropTypes.object,
	tooltip: React.PropTypes.object,
	xAxis: React.PropTypes.object,
	yAxis: React.PropTypes.object
};

HighChart.prototype.getChart = function () {
	return this.chart;
};

HighChart.prototype.getSeries = function(seriesId) {
	return this.chart.get(seriesId);
};

HighChart.prototype.redraw = function () {
	return this.chart.redraw();
};

HighChart.prototype.addPoint = function (seriesId, point, redraw, shift) {
	return this.chart.get(seriesId).addPoint(point, redraw, shift);
};

HighChart.prototype.setData = function (seriesId, data) {
	return this.chart.get(seriesId).setData(data);
};

HighChart.prototype.addSeries = function (series) {
	this.chart.addSeries(series);
};

HighChart.prototype.shouldComponentUpdate = function (nextProps) {
	return Hash(this.props) !== Hash(nextProps);
};

HighChart.prototype.componentDidMount = function () {
	this.renderChart({
		...this.props,
		chart: {
			...this.props.chart,
			renderTo: this.refs.canvas
		}
	});
};

HighChart.prototype.componentWillUnmount = function () {
	if (this.chart) {
		this.chart.destroy();
		this.chart = undefined;
	}
};

HighChart.prototype.componentDidUpdate = function () {
	this.renderChart({
		...this.props,
		chart: {
			...this.props.chart,
			renderTo: this.refs.canvas
		}
	});
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
