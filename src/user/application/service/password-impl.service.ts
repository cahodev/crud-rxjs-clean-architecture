import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, this.saltRounds));
  }

  comparePassword(password: string, hashedPassword: string): Observable<boolean> {
    return from(bcrypt.compare(password, hashedPassword));
  }
}
