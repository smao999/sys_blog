import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

interface JwtUserData {
  id: string;
  username: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData
  }
}

@Injectable()
export class LoginGuard implements CanActivate {

  @Inject()
  private readonly reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    
    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler()
    ]);

    if(!requireLogin) return true;

    const authorization = request.headers.authorization;
    

    if(!authorization) {
      throw new UnauthorizedException('未登录');
    };
    
    
    try {
      // const token = authorization.split(' ')[1]; // 加bearer 前缀
      const user = this.jwtService.verify<JwtUserData>(authorization);

      
      request.user = {
        id: user.id,
        username: user.username
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('登录过期, token失效');
    }
  }
}
