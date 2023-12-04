import { expect } from 'chai';
import 'mocha';
import Alarm from '../tire-pressure-monitoring-system/alarm';
import Sensor from '../tire-pressure-monitoring-system/sensor';

describe('Tyre Pressure Monitoring System', () => {

	describe('Alarm', () => {
		
		it('Check if the alarm is on', () => {
			const alarm = new Alarm(new Sensor(16));
			expect(alarm.isAlarmOn()).eql(false);
		});
		it('Check if the alarm goes on if the tyre pressure is low', () => {
			const alarm = new Alarm(new Sensor(10));
			alarm.check()
			expect(alarm.isAlarmOn()).eql(true);
		});
		it('Check if the alarm goes on if the tyre pressure is High', () => {
			const alarm = new Alarm(new Sensor(22));
			alarm.check()
			expect(alarm.isAlarmOn()).eql(true);
		});

	});

});
