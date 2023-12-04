import { ITelemetryClient } from './ITelemetryClient';

export default class TelemetryDiagnosticControls {
	private diagnosticChannelConnectionString: string;

	private telemetryClient: ITelemetryClient; //Agora depende da interface criada
	private diagnosticInfo: string;
	
	constructor(telemetryClient: ITelemetryClient) {
		this.diagnosticChannelConnectionString = '*111#';
		this.telemetryClient = telemetryClient;
	}

	public readDiagnosticInfo() {
		return this.diagnosticInfo;
	}

	public writeDiagnosticInfo(newValue: string) {
		this.diagnosticInfo = newValue;
	}
	//Aqui foi usado a tecnica de Inline Method nos ifs
	public checkTransmission() {
		this.telemetryClient.disconnect();

		let retryLeft = 3;
		while (!this.telemetryClient.getOnlineStatus() && retryLeft > 0) {
			this.telemetryClient.connect(this.diagnosticChannelConnectionString);
			retryLeft -= 1;
		}

		if (!this.telemetryClient.getOnlineStatus()) {
			throw new Error('Unable to connect');
		}

		this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
		this.diagnosticInfo = this.telemetryClient.receive();
	}
}
