import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers.auth;

    if (authToken === "token") {
      return true;
    } else {
      throw new ForbiddenException("접근 권한이 없습니다.");
    }
  }
}
