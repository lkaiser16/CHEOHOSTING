import { Injectable, OnInit } from '@angular/core';
import { UserService } from './app/core/_services/user.service';
import { UserDto } from './app/dtos/UserDto';

@Injectable()
export class Globals {

  currentUser = null;
  noAdmin = true;
  role = 'test';
  public URL1 = 'https://192.168.0.4:45455';
  public URL2 = 'https://81.5.200.208:4201';

  public URL  = 'https://10.0.0.5:45455';

  localstorageArtikel = 'bestellvorgangArtikel';
  localstorageBestellvorgang1 = 'bestellvorgang1Dto';
  localstorageBestellvorgang2 = 'bestellvorgang2Dto';

  publicKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNsus7dJSfzjZuqNOkvcBjDJgp
  E7H1J0kthODXpM6HbN6+megjGyBfOlMjRhj+C5HLoXJ/8lx42h1lTbB6dp/sQJ2a
  84gps9bF0cdN9H69EfkeN7j5pu/f93LOe1ppkJQfA1PVn2Q/UVgCEy3eeIsbg2ug
  1cEG5sdz34tV1OthCQIDAQAB
  -----END PUBLIC KEY-----`;

}
