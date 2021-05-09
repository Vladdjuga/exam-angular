import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileDto } from 'src/models/accountDtos';
import { ResultCollectionDto, ResultDto } from 'src/models/apiResults/apiResultDto';
import { ChatDto } from 'src/models/chatDto';
import { MessageDto } from 'src/models/messageDto';
import { AccountService } from 'src/services/account.service';
import { AfterViewChecked } from 'angular2/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit , AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef=new ElementRef(1);

  chats:Array<ChatDto>=[];
  current_messages:Array<MessageDto>=[];
  current_chat=new ChatDto();
  profile = new ProfileDto();
  message=new MessageDto();

  constructor(private service:AccountService,private datepipe:DatePipe) {
    this.service.getProfile(localStorage.getItem("token") as string).subscribe((res: ResultCollectionDto) => {
      if (res.isSuccess) {
        this.profile = res.data[0];
      }
    })
    service.onChanged.subscribe(()=>this.ngOnUpdate());
   }

  ngOnInit() {
      this.service.getChats(localStorage.getItem('token') as string).subscribe((res:ResultCollectionDto)=>{
        if(res.isSuccess){
          this.chats=res.data
        }
        else{
          //
        }
      })
  }
  ngOnUpdate() {
    this.service.getChats(localStorage.getItem('token') as string).subscribe((res:ResultCollectionDto)=>{
      if(res.isSuccess){
        this.chats=res.data
        this.current_chat=this.chats.find(el=>el.id==this.current_chat.id) as ChatDto;
        this.loadChats(this.current_chat);
      }
      else{
        //
      }
    })
}
  loadChats(chat:ChatDto){
    this.current_chat=chat;
    this.current_messages=chat.messages;
  }
  getCorrectDate(date:Date){
    return this.datepipe.transform(new Date(date),'hh:mm yyyy-MM-dd');
  }
  getCorrectTime(date:Date){
    return this.datepipe.transform(new Date(date),'hh:mm');
  }
  sendMessage(){
    this.service.sendMessage(localStorage.getItem('token') as string,this.current_chat.id.toString(),this.message).subscribe((res:ResultDto)=>{
      if(res.isSuccess){
        this.message=new MessageDto();
        this.ngOnUpdate();
      }
      else{
        console.log(res)
      }
    })
  }

}
