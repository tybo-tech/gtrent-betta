import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-complited',
  templateUrl: './task-complited.component.html',
  styleUrls: ['./task-complited.component.scss']
})
export class TaskComplitedComponent implements OnInit {

  id = '';
  id2 = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((r) => {
      this.id = r['id'];
      this.id2 = r['id2'];
    });
  }

  ngOnInit(): void {}

}
