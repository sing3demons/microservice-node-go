export class LogDto {
  appName?: string
  componentName?: string
  recordType?: string
  dateTime?: string
  recordName?: string
  guid?: string
  sessionId?: string
  transactionId?: string
  originateServiceName?: string
  appResult?: string
  appResultCode?: string
  serviceTime?: string
  instance?: string
  detail?: LogDetailDto
}

export class LogDetailDto {
  action?: string
  message?: any
  timestamp?: string
}
