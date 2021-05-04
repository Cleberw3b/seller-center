//
//      Logger Interface
//

// Log Types
export type LoggerType = 'REQUEST' | 'RESPONSE' | 'EVENT'

// Log Severity
export type SeverityType = 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL'

// Logger Interface
export interface Logger {
    type: LoggerType
    severity: SeverityType
    service: string
    timestamp: string
    message: string
}
