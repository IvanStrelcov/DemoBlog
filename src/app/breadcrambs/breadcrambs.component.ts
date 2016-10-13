import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrambs',
  templateUrl: './breadcrambs.component.html'
})
export class BreadcrambsComponent implements OnInit {

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {

  }

}
