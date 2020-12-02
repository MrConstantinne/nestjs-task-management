import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, { message: 'Логин не может быть меньше 4 знаков' })
  @MaxLength(20, { message: 'Логин не может быть больше 20 знаков' })
  username: string;
  @IsString()
  @MinLength(8, { message: 'Пароль не может быть меньше 8 знаков' })
  @MaxLength(20, { message: 'Пароль не может быть более 20 знаков' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Пароль должен содержать заглавные и строчные буквы, хотя бы одно число и символ',
  })
  password: string;
}
