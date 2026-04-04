import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class CommonResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const startTime = Date.now();

    return next.handle().pipe(
      map((data: T) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const response = data as any;
        const ctx = context.switchToHttp();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = ctx.getResponse();

        const responseTime = Date.now() - startTime;

        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          data: response?.data ?? response,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          message: response?.message ?? 'success',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          metaData: response?.metadata ?? {},

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          statusCode: res.statusCode,
          responseTime: responseTime,
        };
      }),
    );
  }
}
