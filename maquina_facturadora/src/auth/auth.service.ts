import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './models/JwtAuthPayload';

@Injectable()
export class AuthDataService {
  constructor(
    private jwtService: JwtService
  ) {}

  async getTokenAuthData(token: string): Promise<JwtAuthPayload> {
    const payload: JwtAuthPayload =await this.jwtService.decode(token);
    return payload;
  }
}