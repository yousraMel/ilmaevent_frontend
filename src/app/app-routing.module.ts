
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestComponent } from './pages/request/request.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: RequestComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminBoardComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
