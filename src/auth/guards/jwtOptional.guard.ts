import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}
