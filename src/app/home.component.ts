import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-home',
  template: `
    <h1 class="home">
      Welcome to the Recipe Book!
    </h1>
  `,
  styles: [`
    .home{
      text-align: center;
    }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
