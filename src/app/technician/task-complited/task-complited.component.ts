import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-complited',
  templateUrl: './task-complited.component.html',
  styleUrls: ['./task-complited.component.scss']
})
export class TaskComplitedComponent implements OnInit {

  id = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((r) => {
      this.id = r['id'];
    });
  }

  ngOnInit(): void {}

}
