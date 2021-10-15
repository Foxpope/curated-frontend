import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  users$!: Observable<User[]>
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term))
    )
  }

}
