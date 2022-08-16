import { ConsoleTransport, Format, Houston, LogLevel, LogLevelDisplay } from '../deps.ts';

const logger = new Houston([
    new ConsoleTransport(
        [LogLevel["Error"], LogLevel["Warning"], LogLevel["Info"], LogLevel["Success"]],
        {
            format: Format["text"],
            logLevelDisplay: LogLevelDisplay["Icon"],
        }
    )
])

export default logger