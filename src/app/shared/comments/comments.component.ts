import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentModel } from 'src/models/task.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: CommentModel[] = [];
  @Input() user?: User;
  @Output() onValueChanged = new EventEmitter<CommentModel[]>();

  comment = '';
  showCommentTextBox = false;
  constructor() {}

  ngOnInit(): void {}
  add() {
    if (!this.user || !this.comment) return;
    this.comments.push({
      Id: this.comments.length + 1,
      UserId: this.user.UserId,
      UserName: this.user.Name,
      UserType: this.user.UserType || '',
      DateTime: `${new Date()}`,
      Content: this.comment,
      Status: 'New',
    });

    this.comment = '';
    this.showCommentTextBox = false;
    this.onValueChanged.emit(this.comments);
  }
}
