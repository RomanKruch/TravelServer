import { IsNotEmpty, MinLength, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomEmailValidator } from 'src/helpers/customEmailValidation';

class UserInfoDto {
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @Validate(CustomEmailValidator)
  email: string;
}

export class RegisterDto {
  @ValidateNested()
  @Type(() => UserInfoDto)
  userInfo: UserInfoDto;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(8, { message: 'Password length must be 8 or more!' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @Validate(CustomEmailValidator)
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(8, { message: 'Password length must be 8 or more!' })
  password: string;
}
