import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StatusOkDto {
  @Expose()
  status: 'success';
}
