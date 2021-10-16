import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

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
