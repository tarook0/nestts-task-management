import { IsString, isString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDuo {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // At least 1 uppercase letter [A-Z].
  // At least 1 lowercase letter [a-z].
  // At least 1 digit \d.
  // At least 1 special character (e.g., @, $, !, %, *, ?, &, #).
  // Minimum length of 12 characters, maximum of 64.
  // No whitespace allowed
   @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,64}$/,
    {
      message:
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character (@$!%*?&#), and be 12-64 characters long',
    }
  )
  password: string;
}
