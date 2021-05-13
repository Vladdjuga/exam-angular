import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from 'rxjs';
import { AccountService } from 'src/services/account.service';
 @Injectable({
        providedIn: 'root'
      })
export class IsAdminGuard implements CanActivate{
    
    constructor(private accountService: AccountService){}
 
    canActivate() : Observable<boolean> | boolean{
         let res = this.accountService.isAdmin();
         return res;
    } 
}