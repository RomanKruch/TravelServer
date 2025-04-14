import { IsOptional, MinLength, Validate, IsNotEmpty } from 'class-validator';
import { CustomEmailValidator } from 'src/helpers/customEmailValidation';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @Validate(CustomEmailValidator)
  email?: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'OldPassword is required!' })
  @MinLength(8, { message: 'OldPassword length must be 8 or more!' })
  oldPassword: string;

  @IsNotEmpty({ message: 'NewPassword is required!' })
  @MinLength(8, { message: 'NewPassword length must be 8 or more!' })
  newPassword: string;
}
