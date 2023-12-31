import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
import { ExcelExportService } from './services/excel-export.service';
import { SharedService } from './services/shared.service';

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
    AddTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    AllService,
    SharedService,
    ExcelExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
