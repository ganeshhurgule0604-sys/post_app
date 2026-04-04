import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (exceptionResponse as any).message;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(status).json({
      statusCode: status,
      success: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
