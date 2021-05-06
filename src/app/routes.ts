import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './logout/signin/signin.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ReuComponent } from './reu/reu.component';
import { LogoutComponent } from './logout/logout.component';
import { ReunionComponent } from './reunion/reunion.component';
export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
    },
    { path: 'logout', component: LogoutComponent },
    {
        path: 'login', component: LogoutComponent,
        children: [{ path: '', component: SigninComponent }]
    },
    { path: 'home', component: HomepageComponent },
    { path: 'reunion', component: ReunionComponent },
    { path: 'chatbot', component: ChatbotComponent },
    { path: 'reunions', component: ReuComponent }]