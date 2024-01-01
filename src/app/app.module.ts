import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { TruncatePipe } from '../pipes/truncate.pipe';
import { AllService } from '../services/all.service';
import { AddBenefitComponent } from './admin/admin-benefit/add-benefit/add-benefit.component';
import { AdminBenefitComponent } from './admin/admin-benefit/admin-benefit.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { AdminRequestComponent } from './admin/admin-request/admin-request.component';
import { AddTypeComponent } from './admin/admin-type/add-type/add-type.component';
import { AdminTypeComponent } from './admin/admin-type/admin-type.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { RequestComponent } from './pages/request/request.component';
import { AuthService } from './services/auth.service';
import { ExcelExportService } from './services/excel-export.service';
import { SharedService } from './services/shared.service';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';

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
    AddBenefitComponent,
    AdminTypeComponent,
    AddTypeComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
  ],
  providers: [
    provideClientHydration(),
    AllService,
    SharedService,
    ExcelExportService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
