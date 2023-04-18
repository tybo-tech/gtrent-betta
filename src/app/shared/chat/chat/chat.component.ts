import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/models/email.model';
import { ITEM, Item } from 'src/models/item.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { EmailService } from 'src/services/email.service';
import { ItemService } from 'src/services/item.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chats: Item[] = [];
  userId = '';
  type = 'Chat';
  user?: User;
  chatTo?: User;
  item: Item = ITEM;
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;

  constructor(
    private itemService: ItemService,
    private accountService: AccountService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService,

  ) {
    this.activatedRoute.params.subscribe((r) => {
      this.userId = r['id'];
      this.getUser();
    });
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.accountService.user.subscribe((data) => {
      this.user = data;
    });
  }

  scrollToBottom(): void {
    if (this.myScrollContainer)
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {}
  }

  afterSend() {
    this.item = ITEM;
    this.item.Description = '';
  }
  send() {
    this.item.CompanyId = this.userId;
    this.item.RelatedParentId = this.user?.UserId || ''; // Send Id
    this.item.RelatedId = this.chatTo?.UserId || ''; // reciever to Id
    this.item.ItemType = this.type;
    this.item.ItemStatus = 'Unread';
    this.item.ItemCategory = this.type;
    this.item.ImageUrl = this.user?.Dp || ''; // Send Dp
    this.item.Name = this.user?.Name || ''; // Send Name
    this.item.ItemCode = this.chatTo?.Name || ''; // reciever Name
    this.item.ParentId = this.chatTo?.Dp || ''; // reciever Dp
    this.itemService.add(this.item).subscribe((data) => {
      if (data && data.ItemId) {
        this.chats.push(data);
        this.afterSend();
        this.sendEmail(data.Description||'')
      }
    });
  }

  getItems() {
    this.itemService
      .getByParentIdAndRelated(this.user?.UserId + '', this.chatTo?.UserId + '')
      .subscribe((data) => {
        this.chats = data;
        setTimeout(() => {
          this.markAllAsRead();
        }, 500);
      });
  }

  getUser() {
    this.userService.getUserSync(this.userId).subscribe((data) => {
      if (data) {
        this.chatTo = data;
        if (this.user) {
          this.getItems();
          setInterval(() => {
            this.getItems();
          }, 5000);
        }
      }
    });
  }

  markAllAsRead() {
    const sentToMe = this.chats.filter(x=>x.RelatedId === this.user?.UserId && x.ItemStatus === 'Unread');
    if (sentToMe.length) {
      sentToMe.map(x=>x.ItemStatus = 'Read');
      sentToMe.map(x=>x.ModifyUserId =`${new Date()}`);
      this.itemService.updateRange(sentToMe).subscribe(data=>{
        if(data && data.length && this.user){
          this.accountService.refreshOnce();
        }
      })
    }
  }

  sendEmail(
    text: string,
  ) {
    if (!this.user || !this.chatTo) return;
    let msg = `
    
    <p style="padding: 30px; background: rgb(244, 243, 243); max-width: 500px;font-family: Arial;
    ">
   ${text}

    <a
      style="
        display: block;
        width: fit-content;
        padding: 10px;
        background: rgb(80, 255, 112);
        color: black;
        margin: 30px 0;
        text-decoration: none;
        font-family: Arial;
        border-radius: 30px;
      "
      href="https://gtrentapp.tybo.co.za/${this.chatTo.UserType?.toLocaleLowerCase()}/chats"
      >Reply in gtrent app</a
    >
  </p>
    `
    const emailToSend: Email = {
      FromEmail:this.user.Email,
      FromName: this.user.Name,
      FromPhone: '',
      ToEmail: this.chatTo.Email,
      ToName: this.chatTo.Name,
      Subject: 'Gtrent: '+this.user.Name +' sent you a message.',
      Message: msg,
    };
    this.emailService
      .sendGeneralTextEmail(emailToSend)
      .subscribe((response) => {
        if (response > 0) {

        }
      });
  }
}
