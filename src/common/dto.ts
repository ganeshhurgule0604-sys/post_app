export class ResponseDto<T> {
  data: T;
  metaData: any;
}

export class CreateAndUpdateEntityResponse {
  id: number;
  message: string;
}

export class PaginationDto {
  page: number;

  limit: number;
}
