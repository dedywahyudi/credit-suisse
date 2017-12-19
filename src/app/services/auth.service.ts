import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private api = environment.api;
  private $user: Promise<any>;

  constructor(private http: Http) {}

  /**
   * me Get logged user
   */
  me() {
    // if user promise already exists, return it
    if (this.$user) {
      return this.$user;
    }

    // fetch user data, catch any error
    return this.$user = this.http.get(this.api.currentUser)
      .map((res: Response) => res.json())
      .toPromise()
      .catch(e => ({}));
  }
}
