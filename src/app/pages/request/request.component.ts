import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../services/all.service';
import { ConfirmationService } from '../../services/confirmation.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class RequestComponent implements OnInit {
  editMode = false;
  requestForm!: FormGroup;
  types: any[] = [];
  benefits: any[] = [];
  controls: any[] = [];
  request: any;
  requestId: any;
  socialNetworksFormArray!: FormArray;

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    // Initialize the form and fetch necessary data on component initialization
    this.initForm();
    this.fetchTypes();
    this.fetchBenefits();
  }

  initForm(): void {
    // Initialize the main form with default values and validators
    this.requestForm = this.fb.group({
      'type': [null, Validators.required],
      'label': [''],
      'description': [''],
      'isFree': [this.mapValueToForm(null)],
      'fee': [0.00],
      'mode': ['', Validators.required],
      'institution': ['', Validators.required],
      'committeeLeader': ['', Validators.required],
      'address': [''],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'webSite': [''],
      'benefits': this.fb.array([]),
      'socialNetworks': this.fb.array([]),
      'recaptcha': ['', Validators.required],
      'participantsNb': [0, [Validators.required, Validators.min(1)]],
    });

    // Initialize the form array for social networks
    this.socialNetworksFormArray = this.fb.array([]);
    this.requestForm.addControl('socialNetworks', this.socialNetworksFormArray);
  }

  fetchTypes(): void {
    // Fetch available types and update the component property
    this.allService.getAllTypes().subscribe((data: any[]) => {
      this.types = this.sharedService.activeFilterAndSortItems(data);
    });
  }

  fetchBenefits(): void {
    // Fetch available benefits and update the component property
    this.allService.getAllBenefits().subscribe((data: any[]) => {
      this.benefits = this.sharedService.activeFilterAndSortItems(data);

      // Add a form control for each benefit in the form array
      const benefitsFormArray = this.requestForm.get('benefits') as FormArray;
      this.benefits.forEach(() => benefitsFormArray.push(new FormControl()));
      this.controls = benefitsFormArray.controls;
    });
  }

  addSocialNetwork(): void {
    // Add a new social network field to the form array
    this.socialNetworksFormArray.push(this.fb.control(''));
  }

  removeSocialNetwork(index: number): void {
    // Remove a social network field from the form array
    this.socialNetworksFormArray.removeAt(index);
  }

  getSocialNetworkControl(index: number): FormControl {
    // Get the form control for a specific social network field
    return this.socialNetworksFormArray.at(index) as FormControl;
  }

  mapValueToForm(value: any): string {
    // Map a boolean value to a string ('yes', 'no', 'neutral')
    if (value === true) {
      return 'yes';
    } else if (value === false) {
      return 'no';
    } else {
      return 'neutral';
    }
  }

  mapFormToValue(value: string): any {
    // Map a string value ('yes', 'no', 'neutral') to a boolean
    if (value === 'yes') {
      return true;
    } else if (value === 'no') {
      return false;
    } else {
      return null;
    }
  }

  onSubmitRequest(): void {
    // Handle form submission
    if (this.requestForm.valid) {
      // Prepare request payload and submit to the backend
      this.request = this.requestForm.value;
      this.request.status = "Nouveau";
      this.request.isFree = this.mapFormToValue(this.requestForm.get('isFree')?.value);
      this.request.socialNetworks = this.socialNetworksFormArray.value;
      const selectedBenefits = this.requestForm.value.benefits
        .map((selected: boolean, index: number) => selected ? this.benefits[index] : null)
        .filter((benefit: any) => benefit !== null);

      this.request.benefits = selectedBenefits;

      this.allService.addRequest(this.request).subscribe(
        data => {
          console.log('Response:', data);
          this.request = data;
          this.requestId = this.request.id;
          this.initForm();
          this.confirmationService.openSubmitDialog('Votre demande est soumise avec succès. Veuillez vérifier votre e-mail pour confirmer vos informations.');
        },
        error => {
          console.error('Error:', error);
          this.confirmationService.openErrorDialog('Une erreur est survenue. Veuillez réessayer ultérieurement.');
        }
      );
    } else {
      // If form is not valid, mark all fields as touched to display validation errors
      console.log('NOT VALIDATED FORM');
      console.log('Form Status:', this.requestForm.status);

      this.validateAllFormFields(this.requestForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    // Mark all form controls as touched to display validation errors
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      console.log(`Control "${field}" Errors:`, control?.errors);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  isFieldValid(field: string) {
    if (field === 'benefits') {
      const benefitsFormArray = this.requestForm.get('benefits') as FormArray;

      // Check if none of the benefit checkboxes are selected
      return benefitsFormArray.controls.every(control => !control.value) && benefitsFormArray.touched;
    } else {
      return !this.requestForm?.get(field)?.valid && this.requestForm?.get(field)?.touched;
    }
  }

  displayFieldCss(field: string): any {
    // Define CSS classes based on field validity
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
}
