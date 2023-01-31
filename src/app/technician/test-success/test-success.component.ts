import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-success',
  templateUrl: './test-success.component.html',
  styleUrls: ['./test-success.component.scss'],
})
export class TestSuccessComponent implements OnInit {
  id = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((r) => {
      this.id = r['id'];
    });
  }

  ngOnInit(): void {}
}
