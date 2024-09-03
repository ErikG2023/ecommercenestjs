import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard: Verificando token');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard: Handling request');
    console.log('Error:', err);
    console.log('User:', user);
    console.log('Info:', info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
