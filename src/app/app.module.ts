import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RequestComponent } from './pages/request/request.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { AllService } from '../services/all.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AdminRequestComponent } from './admin/admin-request/admin-request.component';
import { AdminBenefitComponent } from './admin/admin-benefit/admin-benefit.component';
import { AddBenefitPopupComponent } from './admin/add-benefit-popup/add-benefit-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminBoardComponent,
    HomeComponent,
    RequestComponent,
    NavigationComponent,
    FooterComponent,
    ContactComponent,
    PortfolioComponent,
    AboutComponent,
    TruncatePipe,
    AdminRequestComponent,
    AdminBenefitComponent,
    AddBenefitPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    AllService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
