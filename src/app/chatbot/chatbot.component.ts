import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { {(function(d, m){
    var kommunicateSettings = {"appId":"30832656668a6d3a1587ffa812666dddf","popupWidget":true,"automaticChatOpenOnNavigation":true};
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);(window as any).kommunicate = m; m._globals = kommunicateSettings;
  })(document, (window as any).kommunicate || {});
    }
    
   
}
onLogout(){
  this.userService.deleteToken();
  this.router.navigate(['/logout']); 
  (window as any).Kommunicate.logout();
  }}
