//Criei esta Interface para seguir os padrões do SOLID, Usar a injeção de dependência ou abstrações (interfaces) para tornar as classes mais flexíveis e seguindo o DIP.
export interface ITelemetryClient {
    diagnosticMessage(): string;
    getOnlineStatus(): boolean;
    connect(telemetryServerConnectionString: string): void;
    disconnect(): void;
    send(message: string): void;
    receive(): string;
}