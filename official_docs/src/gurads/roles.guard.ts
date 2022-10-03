import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // context.getHandler() : 현재 실행중인 handler 정보, guard가 호출된 handler
    // 지금 실해웆ㅇ인 handler의 roles정보를 가져온다 by reflector.get([metainfo key], context.getHandler())
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const user = request.user;

    return this.matchRoles(roles, ['admin']);
  }

  matchRoles(acceptableRoles: string[], usersRoles: string[]) {
    return acceptableRoles.length === usersRoles.length;
  }
}
