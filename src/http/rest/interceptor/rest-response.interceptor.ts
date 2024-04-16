import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable, switchMap } from 'rxjs';

/**
 * Interceptor que valida a response de uma rota REST
 */
@Injectable()
export class RestResponseInterceptor<T extends object>
  implements NestInterceptor<any, T>
{
  /**
   * Construtor do interceptor
   * @param {new () => T} dto - O DTO a ser validado
   */
  constructor(private readonly dto: new () => T) {}

  /**
   * Método que intercepta a resposta e valida o DTO
   * @param {_context: ExecutionContext} _context - O contexto de execução
   * @param {next: CallHandler<any>} next - O próximo manipulador na cadeia de interceptores
   * @returns {Observable<T> | Promise<Observable<T>>} - A resposta validada ou uma exceção BadRequest
   */
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<T> | Promise<Observable<T>> {
    return next.handle().pipe(
      switchMap(async (data) => {
        const transformedData = plainToInstance(
          this.dto,
          instanceToPlain(data),
          { excludeExtraneousValues: true },
        );

        const errors = await validate(transformedData);

        if (errors.length > 0) {
          throw new BadRequestException({
            message: 'Response validation failed',
            errors,
          });
        }
        return transformedData;
      }),
    );
  }
}
