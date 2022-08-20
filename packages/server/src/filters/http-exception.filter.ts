/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { error } from '../utils/httpUtils';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const errorMessage =
      // @ts-ignore
      exception.message ||
      // @ts-ignore
      (exception.getMessage && exception.getMessage()) ||
      'UNKNOWN_ERROR';

    // @ts-ignore
    response.status(exception.status || 400).json(error(errorMessage));
  }
}
