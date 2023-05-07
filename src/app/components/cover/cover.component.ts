import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.coverId = params["coverId"];
    })
  }
  coverId = ''

  backPressed() {
    this._location.back()
  }
}
