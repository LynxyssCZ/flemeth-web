'use strict';
const React = require('react');
const ClassNames = require('classnames');
const Moment = require('moment');


class SensorsList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <div className={this.props.className}>
			<div className={ClassNames('sensors-history panel panel-default')}>
				<div className='panel-heading'>
					<h4>Sensors list</h4>
				</div>
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>id</th>
							<th>Type</th>
							<th>Average</th>
							<th>Meta</th>
							<th>Update</th>
						</tr>
					</thead>
					<tbody>
						{this.props.sensors.sort((sensorA, sensorB) => {
							return sensorA.id > sensorB.id;
						}).map((sensor) => (
							<tr key={sensor.id}>
								<th>{sensor.id}</th>
								<td>{sensor.type}</td>
								<td>{Number(sensor.average).toFixed(2)}°</td>
								<td>{this.parseMeta(sensor.meta)}</td>
								<td title={Moment(sensor.lastUpdate)}>{Moment(sensor.lastUpdate).format('LTS')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>;
	}

	parseMeta(meta) {
		if (meta) {
			return <pre>
				{Object.keys(meta).map((metaKey) => {
					return metaKey + ': ' + meta[metaKey] + '\n';
				})}
			</pre>;
		}
		else {
			return <p className="text-muted">N/A</p>;
		}
	}
}

SensorsList.displayName = 'SensorsList';
SensorsList.proptypes = {
	sensors: React.PropTypes.array.isRequired,
	className: React.PropTypes.string
};


module.exports = SensorsList;
