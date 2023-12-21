import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(newUser: CreateUserDto, metadata: ArgumentMetadata) {
    // it's just for example
    const parseAgeToInt = parseInt(newUser.age.toString());

    if (isNaN(parseAgeToInt)) {
      throw new HttpException(
        'Invalid data type for field age. Expect number',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { ...newUser, age: parseAgeToInt };
  }
}
