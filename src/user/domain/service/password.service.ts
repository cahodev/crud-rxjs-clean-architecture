import { Observable } from 'rxjs';

export const PASSWORD_SERVICE = 'PASSWORD_SERVICE';

export interface PasswordService {
  hashPassword(password: string): Observable<string>;
  comparePassword(password: string, hashedPassword: string): Observable<boolean>;
}