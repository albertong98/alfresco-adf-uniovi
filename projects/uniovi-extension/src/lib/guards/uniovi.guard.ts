/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { AppStore, getUserProfile } from '@alfresco/aca-shared/store';
import { ProfileState } from '@alfresco/adf-extensions';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isInGroup } from '../rules/uniovi.rules';


@Injectable({ providedIn: 'root' })
export class UnioviGuard implements CanActivate {
  profile$: Observable<ProfileState>;

  constructor(private store: Store<AppStore>, private router: Router) {
    this.profile$ = this.store.select(getUserProfile);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const groupId : string = route.data.groupId;
    return this.profile$.pipe(
      filter(profile => !!profile && !!profile.id),
      map((profile) => { 
        const canActivate = isInGroup(profile, groupId) || false;
        if (!canActivate) {
          this.router.navigate(['/']); 
        }
        return canActivate;
      })
    );
  }
}
