import { Component, OnDestroy, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
import { Game } from '../models/game';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-game-chatbox',
  templateUrl: './game-chatbox.component.html'
})
export class GameChatboxComponent implements OnInit {

  //Scrollcontainer of the scrollbar (Used to scroll the scrollbar down when a message appears)
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private chatSocket;

  isOpen: boolean;
  chatboxText: string;
  _game: Game;
  messageData: any[];

  //Get the game for the socket
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

  //Send a new message to the chatsocket
  sendMessage(message) {
    this.chatSocket.emit('send message', {
      username: this.api.email,
      gameId: this._game._id,
      msg: message
    })
  }

  //Change visibility of the chatbox
  moveChatbox() {
    this.isOpen = !this.isOpen

    if (this.isOpen) {
      this.chatboxText = "Hide"
    } else {
      this.chatboxText = "Show"
    }

  }

  //Open a new socket connection
  private openSocket() {
    this.chatSocket = io(`?gameId=${this._game._id}`);
    this.chatSocket.on('new message', data => this.newMessage(data));
  }

  //Called when a new message is received from the socket
  private newMessage(data) {
    this.messageData.push(data);
    var audio = new Audio();
    audio.src = "assets/sounds/notification.mp3";
    audio.load();
    audio.play();
    setTimeout(() => this.scrollToBottom(), 1);
  }

  //Scroll the scrollbar down when a message appears
  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
