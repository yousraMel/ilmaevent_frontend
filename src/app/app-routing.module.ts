
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { RequestComponent } from './pages/request/request.component';
import { PoliticComponent } from './pages/politic/politic.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: RequestComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'politic', component: PoliticComponent },
  { path: 'terms', component: TermsComponent },
  {
    path: 'admin',
    component: AdminBoardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
