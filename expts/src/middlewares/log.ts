import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

export function accessLogMiddleware(logFormat: 'simples' | 'completo') {
  return (req: Request, res: Response, next: NextFunction) => {
    const logFolder = process.env.LOGS_PATH || 'logs';
    const logFile = path.join(logFolder, 'access.log');

    console.log('Função iniciada.');

    try {
      if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
        console.log(`Pasta de logs criada em: ${path.resolve(logFolder)}`);
      }
    } catch (err) {
      console.error(`Erro ao criar pasta de logs: ${err}`);
      return next();
    }

    const timestamp = new Date().toISOString();
    let logEntry: string;

    if (logFormat === 'simples') {
      logEntry = `${timestamp} ${req.method} ${req.url}\n`;
    } else {
      const userAgent = req.get('User-Agent') || 'unknown';
      logEntry = `${timestamp} ${req.method} ${req.url} HTTP/${req.httpVersion} ${userAgent}\n`;
    }

    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo de log:', err);
      }
    });

    next();
  };
}
