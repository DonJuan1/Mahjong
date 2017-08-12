import { Component, OnDestroy, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { Game } from '../models/game';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-game-chatbox',
  templateUrl: './game-chatbox.component.html'
})
export class GameChatboxComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private chatSocket;

  isOpen: boolean;
  chatboxText: string;
  _game: Game;
  messageData: any[];

  @Input() set game(value: Game) {
    this._game = value;
    if (this._game != null) {
      this.openSocket();
    }
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.messageData = [];
    this.isOpen = true;
    this.chatboxText = "Hide"
  }

  ngOnDestroy() {
    this.chatSocket.disconnect();
  }

  sendMessage(message) {
    this.chatSocket.emit('send message', {
      username: this.api.email,
      gameId: this._game._id,
      msg: message
    })
  }

  moveChatbox() {
    this.isOpen = !this.isOpen

    if (this.isOpen) {
      this.chatboxText = "Hide"
    } else {
      this.chatboxText = "Show"
    }

  }

  private openSocket() {
    this.chatSocket = io(`https://mehjong.herokuapp.com?gameId=${this._game._id}`);
    this.chatSocket.on('new message', data => this.newMessage(data));
  }

  private newMessage(data) {
    this.messageData.push(data);
    var audio = new Audio();
    audio.src = "assets/sounds/notification.mp3";
    audio.load();
    audio.play();
    setTimeout(() => this.scrollToBottom(), 1);
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
