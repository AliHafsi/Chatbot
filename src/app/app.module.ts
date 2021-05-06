// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from './globals'

// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';



//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ReuComponent } from './reu/reu.component';
import { LogoutComponent } from './logout/logout.component';
import { SigninComponent } from './logout/signin/signin.component';
import { ReunionComponent } from './reunion/reunion.component';

const customNotifierOptions: NotifierOptions = {

};
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,

    UserProfileComponent,
    SignInComponent,
    HomepageComponent,
    ChatbotComponent,
    ReuComponent,
    LogoutComponent,
    SigninComponent,
    ReunionComponent,



  ],
  imports: [
    NotifierModule.withConfig(customNotifierOptions),
    NotifierModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule, ScheduleModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left',
          distance: 12
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
  ]
  ,
  providers: [
    Globals, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, AuthGuard, UserService],
  bootstrap: [AppComponent]
  ,
})
export class AppModule { }
