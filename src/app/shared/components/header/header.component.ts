import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { LocalStorageService } from '@services/local-storage.service';
import { STORAGE_KEYS } from '@utils/constants/local-storage-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input({ required: true }) pageTitle: string = '';
  userName!: string;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.userName = (
      this.localStorageService.getItem(STORAGE_KEYS.userSession) as User
    ).username;
  }

  logout() {
    this.localStorageService.removeItem(STORAGE_KEYS.userSession);
    this.router.navigateByUrl('/login');
  }
}
