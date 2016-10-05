'use strict';
const React = require('react');
const ClassNames = require('classnames');
const Moment = require('moment');


class ZonesList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return <div className={this.props.className}>
			<div className={ClassNames('zones-history panel panel-default')}>
				<div className='panel-heading'>
					<h4>Zones</h4>
				</div>
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>id</th>
							<th>Name</th>
							<th>Value</th>
							<th>Sensors</th>
							<th>Update</th>
						</tr>
					</thead>
					<tbody>
						{this.props.zones.map((zone) => (
							<tr key={zone.id}>
								<th>{zone.id}</th>
								<td>{zone.name}</td>
								<td>{Number(zone.value).toFixed(2)}°</td>
								<td>{zone.sensors
									? zone.sensors.map((sensor, index) => {
										return <div key={index}>{sensor}</div>;
									})
									: '*'}</td>
								<td title={Moment(zone.lastUpdate)}>{Moment(zone.lastUpdate).format('LTS')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>;
	}
}

ZonesList.displayName = 'ZonesList';
ZonesList.proptypes = {
	zones: React.PropTypes.array.isRequired,
	className: React.PropTypes.string
};


module.exports = ZonesList;
