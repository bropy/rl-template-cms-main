import { type Logger, pino } from 'pino'

// interface
interface IDebugUtil {
  text: string
  value: unknown
  isActiveOnProd?: boolean
}

// logger util
export const loggerUtil = (props: IDebugUtil) => {
  const { text, value, isActiveOnProd = false } = props

  const logger: Logger = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
    timestamp: pino.stdTimeFunctions.epochTime,
    enabled: process.env.NODE_ENV !== 'production' || isActiveOnProd,
    redact: [],
  })

  logger.info(`[${text}]: ${JSON.stringify(value, null, 2)}`)
}
