//TODO реализовать DTO для /orders

export class PostOrderDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class PostOrdersDto {
  tickets: PostOrderDto[];
}
