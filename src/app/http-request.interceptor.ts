import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.attachHeaders) {
      const modifiedReq = req.clone({
        setHeaders: {
          'X-MASTER-KEY': '$2a$10$.mH0VoUR1QAmQ1397Ii1sOM4SzBoT4ZdWI6irAg8ypDDp5VYmjvuq',
          'X-ACCESS-KEY': '$2a$10$O0PFnDpKhvecFgX1nVsFOOCkhMyKQh.CqXQBJshmppWHB/l6T901C'
        }
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}
