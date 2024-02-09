import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { DragScrollDirective } from '../directives/drag-scroll.directive';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { AddBenefitComponent } from './admin/admin-benefit/add-benefit/add-benefit.component';
import { AdminBenefitComponent } from './admin/admin-benefit/admin-benefit.component';
import { AdminBoardComponent } from './admin/admin-board/admin-board.component';
import { AddMediaComponent } from './admin/admin-media/add-media/add-media.component';
import { AdminMediaComponent } from './admin/admin-media/admin-media.component';
import { AdminRequestComponent } from './admin/admin-request/admin-request.component';
import { AddTypeComponent } from './admin/admin-type/add-type/add-type.component';
import { AdminTypeComponent } from './admin/admin-type/admin-type.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { SubmitDialogComponent } from './dialogs/submit-dialog/submit-dialog.component';
import { FieldErrorDisplayComponent } from './helpers/field-error-display/field-error-display.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { RequestComponent } from './pages/request/request.component';
import { AllService } from './services/all.service';
import { AuthService } from './services/auth.service';
import { ConfirmationService } from './services/confirmation.service';
import { ExcelExportService } from './services/excel-export.service';
import { SharedService } from './services/shared.service';
import { AdminHelpComponent } from './admin/admin-help/admin-help.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PoliticComponent } from './pages/politic/politic.component';

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
    SubmitDialogComponent,
    ErrorDialogComponent,
    FieldErrorDisplayComponent,
    DragScrollDirective,
    AdminMediaComponent,
    AddMediaComponent,
    AdminHelpComponent,
    PoliticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    CarouselModule,
  ],
  providers: [
    provideClientHydration(),
    AllService,
    SharedService,
    ExcelExportService,
    AuthService,
    ConfirmationService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Ldwj0spAAAAAGS7KnPp41VMPY9upGMLFSqGbcGi',
        type: 'image', // or 'audio' for reCAPTCHA v2 Checkbox
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
