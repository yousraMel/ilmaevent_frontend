import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    private allservice: AllService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initForm(this.request);

    this.allservice.getAllEventTypes().subscribe((data: any[]) => {
      this.types = data;
    });
  }


  initForm(request: any) {
    let requestType = null;
    let requestLabel = '';
    let requestDescription = '';
    let requestParticipantsNb = 0;
    let requestIsFree = true;
    let requestBenefits = [];
    let requestInstitution = '';
    let requestCommitteeLeader = '';
    let requestAddress = '';
    let requestPhone = '';
    let requestEmail = '';
    let requestwebSite = '';
    let requestsocialNetworks = [];

    this.requestForm = this.fb.group({
      'type': new FormControl(requestType),
      'label': new FormControl(requestLabel, Validators.required),
      'description': new FormControl(requestDescription, Validators.required),
      'participantsNb': new FormControl(requestParticipantsNb, Validators.required),
      'isFree': new FormControl(requestIsFree),
      'institution': new FormControl(requestInstitution),
      'committeeLeader': new FormControl(requestCommitteeLeader),
      'address': new FormControl(requestAddress),
      'phone': new FormControl(requestPhone),
      'email': new FormControl(requestEmail),
      'webSite': new FormControl(requestwebSite),
      'benefits': this.fb.array([]),
      'socialNetworks': this.fb.array([]),
    });

    // Fetch the list of benefits from the backend
    this.allservice.getAllBenefits().subscribe((data: any[]) => {
      this.benefits = data;

      this.benefits.forEach(element => {
        console.log('benefits : ' + element.label)
      });
      // Add a form control for each benefit in the form array
      const benefitsFormArray = this.requestForm.get('benefits') as FormArray;
      this.benefits.forEach(() => {
        const control = new FormControl(false);
        benefitsFormArray.push(control);
      });
      this.controls = benefitsFormArray.controls;
    });

    // Initialize the form array for social networks
    this.socialNetworksFormArray = this.fb.array([]);
    this.requestForm.addControl('socialNetworks', this.socialNetworksFormArray);
  }

  // Function to add a new social network field
  addSocialNetwork() {
    this.socialNetworksFormArray.push(this.fb.control(''));
  }

  // Function to remove a social network field
  removeSocialNetwork(index: number) {
    this.socialNetworksFormArray.removeAt(index);
  }

  // Function to get FormControl from FormArray
  getSocialNetworkControl(index: number): FormControl {
    return this.socialNetworksFormArray.at(index) as FormControl;
  }

  onSubmitRequest() {
    /*if (this.requestForm.valid) { */
    this.request = this.requestForm.value;
    // Include social networks in the request payload
    this.request.socialNetworks = this.socialNetworksFormArray.value;
    // Get the selected benefits
    const selectedBenefits = this.requestForm.value.benefits
      .map((selected: boolean, index: number) => selected ? this.benefits[index] : null)
      .filter((benefit: any) => benefit !== null);

    // Include the selected benefits in the request payload
    this.request.benefits = selectedBenefits;
    this.allservice.addRequest(this.request).subscribe(
      data => {
        console.log('Response:', data);
        this.request = data;
        this.requestId = this.request.id;
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.router.navigate(['home']);
  }

  // FORM VALIDATION
  /*validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }*/

  /* isFieldValid(field: any) {
     return !this.requestForm.get(field).valid && this.requestForm.get(field).touched;
   }*/

  /*displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }*/


}
