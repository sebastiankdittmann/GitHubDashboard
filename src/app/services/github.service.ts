import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Repository} from '../model/repositories';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _apiUrl = 'https://api.github.com';

  constructor(private _httpClient: HttpClient) { }

  getPublicRepositoriesForUser(userName: string): Observable<Repository[]> {
    return  this._httpClient.get<Repository[]>(`${this._apiUrl}/users/${userName}/repos`);
  }
}
