import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ResponseDto<T> {
  data: T;
  metaData: any;
}

export class CreateAndUpdateEntityResponse {
  id: number;
  message: string;
}

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  limit: number;
}
