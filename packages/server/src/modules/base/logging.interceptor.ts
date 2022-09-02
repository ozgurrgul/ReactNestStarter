import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

/**
 * Logs controllers incoming requests
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const userId = request.user ? request.user.id : null;
    const ip = request.headers['X-Forwarded-For'] || request.ip;
    this.logger.log(
      `${request.method} ${request.url} ${ip} | userId: ${userId}`,
    );
    return next.handle();
  }
}
