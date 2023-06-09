import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { CastCrewComponent } from './cast-crew/cast-crew.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { DisplayMyReviewsComponent } from './display-my-reviews/display-my-reviews.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'userprofile/:username', component:UserProfileComponent},
  {path:'userprofile/myReviews/:username', component:DisplayMyReviewsComponent},
  {path:'login', component:LoginComponent},
  {path:'createaccount', component:CreateAccountComponent},
  {path:'settings', component:SettingsComponent},
  {path:'logout', component:LoginComponent},
  {path: 'movieinfo/:movieid', component:MovieInfoComponent},
  {path: 'castcrew/:movieid', component:CastCrewComponent},
  {path: 'search/:search', component:SearchComponent},
  {path: 'showusers', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }