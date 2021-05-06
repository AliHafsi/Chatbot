import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NotifierModule } from "angular-notifier";
import { NotifierService } from 'angular-notifier';
import { takeWhile } from 'rxjs/operators';
import * as firebase from 'firebase';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-reu',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  templateUrl: './reu.component.html',
  styles: ['.k-calendar ',
  ],


})


export class ReuComponent implements OnInit {
  private notifier: NotifierService;
  public msg = "";

  subscription: Subscription;




  public data: any = {
    "response": []
  };


  constructor(private userService: UserService, private router: Router, notifier: NotifierService) {
    this.notifier = notifier;
    var firebaseConfig = {
      apiKey: "AIzaSyAU5dnZZLjFmKL9LNVSiE8fnuBCOtAekSg",
      authDomain: "chatbotali-f1e02.firebaseapp.com",
      databaseURL: "https://chatbotali-f1e02.firebaseio.com",
      projectId: "chatbotali-f1e02",
      storageBucket: "chatbotali-f1e02.appspot.com",
      messagingSenderId: "415113313444",
      appId: "1:415113313444:web:c3114fb38f747038c97a31"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref("/events").on("value", function (resp) {
      //console.log(JSON.stringify(resp.val()))
      localStorage.setItem("ev", JSON.stringify(resp.val()).replace(/"/g, "'"))
    })

    //console.log("[" + localStorage.getItem("ev").substring(1, localStorage.getItem("ev").length - 1) + "]")
    //var tm = localStorage.getItem("ev").substring(1, localStorage.getItem("ev").length - 1)
    var a = JSON.parse(localStorage.getItem("ev").replace(/'/g, '"'))
    console.log(a)
    Object.values(a).forEach(val => {
      let aaa = val["StartTime"].split(",")
      console.log(aaa)
      val["StartTime"] = new Date(parseInt(aaa[0]), parseInt(aaa[1]), parseInt(aaa[2]), parseInt(aaa[3]), parseInt(aaa[4]))
      console.log(val["StartTime"])

      let aa = val["EndTime"].split(",")
      console.log(aa)
      val["EndTime"] = new Date(parseInt(aa[0]), parseInt(aa[1]), parseInt(aa[2]), parseInt(aa[3]), parseInt(aa[4]))
      console.log(val["EndTime"])

      this.data.response.push(val)
    });

    console.log(this.data)
    this.eventSettings.dataSource = this.data.response
    //localStorage.clear();
  }

  //public ach = ""
  public selectedDate: Date = new Date(2020, 8, 21);
  public eventSettings: EventSettingsModel = {
    dataSource: this.data.response
  };

  public showNotification(type: string, message: string): void {

    this.notifier.notify(type, this.msg);
  }
  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }
  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }
  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }
  s1 = [];
  s2 = [];
  setInterval = setInterval;
  ngOnInit() {
    const source = interval(60000);
    this.subscription = source.subscribe(val => this.compare(todayDateFormatted));
    setInterval(this.compare, 600000, this.s1, todayDateFormatted);
    var boo;

    var today = new Date();
    var todayDateFormatted = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
    {
      (function (d, m) {
        var kommunicateSettings = { "appId": "30832656668a6d3a1587ffa812666dddf", "popupWidget": true, "automaticChatOpenOnNavigation": true };
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s); (window as any).kommunicate = m; m._globals = kommunicateSettings;
      })(document, (window as any).kommunicate || {});
    }
    function toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    }

    this.data.response.forEach(el => { this.s1.push(el['StartTime']) })


  }

  toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  compare(le: any): void {
    var diffInHours;
    var diffinminutes;
    var diff;
    this.s1.forEach(e1 => { if (this.toTimestamp(e1) === this.toTimestamp(le)) { this.msg = "Vous avez une réunion maintenant"; console.log(this.msg); console.log(e1); this.showNotification('default', this.msg); } })
    this.s1.forEach(e1 => { diff = e1.valueOf() - le.valueOf(); diffInHours = diff / 1000 / 60 / 60; if (diffInHours === 1) { this.msg = "Vous avez une réunion dans une heure"; this.showNotification('default', this.msg); } })
    this.s1.forEach(e1 => { diff = e1.valueOf() - le.valueOf(); diffinminutes = diff / 1000 / 60; if (diffinminutes === 5) { this.msg = "Vous avez une réunion dans 5 minutes"; this.showNotification('default', this.msg); } })
  }
  opensnack(text: string): void {
    console.log(text);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
    (window as any).Kommunicate.logout();
  }

}


