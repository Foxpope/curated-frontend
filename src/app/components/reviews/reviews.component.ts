import { Component, Input } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() reviews : Review[] = [];

  constructor() { 
  }

  ngOnChanges() {
    this.reviews.forEach((review) => {
      console.log(review.review);
    })
  }
}
