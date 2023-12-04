import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ITelemetryClient } from '../telemetry-system/ITelemetryClient';
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';
describe('Telemetry System', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	  })
	describe('TelemetryDiagnosticControls', () => {

		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const mockTelemetryClient: ITelemetryClient = {
				diagnosticMessage: vi.fn().mockReturnValue('mock diagnostic message'),
				getOnlineStatus: vi.fn().mockReturnValue(true),
				connect: vi.fn(),
				disconnect: vi.fn(),
				send: vi.fn(),
				receive: vi.fn().mockReturnValue('mock status message'),
			};
			vi.spyOn(mockTelemetryClient, "send")
			vi.spyOn(mockTelemetryClient, "receive")
			var target = new TelemetryDiagnosticControls(mockTelemetryClient);
			target.checkTransmission()
			expect(mockTelemetryClient.send).toHaveBeenCalledWith(mockTelemetryClient.diagnosticMessage());
			expect(mockTelemetryClient.receive).toHaveBeenCalled();
			expect(target.readDiagnosticInfo()).toEqual("mock status message")
		});
	});

});
