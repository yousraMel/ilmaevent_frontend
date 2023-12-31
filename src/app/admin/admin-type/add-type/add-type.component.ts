import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrl: './add-type.component.scss'
})
export class AddTypeComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Input() typeId: any;
  typeForm!: FormGroup;
  type: any;
  editMode: any;


  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log("typeId" + this.type)
    this.editMode = this.sharedService.editMode;

    if (this.typeId && this.editMode) {
      this.allService.getType(this.typeId).subscribe((resp: any) => {
        this.type = resp;
        console.log("THIS TYPE" + this.type)
        this.initForm(this.type);
      });
    } else {
      this.initForm(null); // Pass null to initialize an empty form
    }
  }

  initForm(type: any) {
    const typeCode = type?.code || '';
    const typeLabel = type?.label || '';
    const typeDescription = type?.description || '';
    const typeRank = type?.rank || '';
    const typeActive = type?.active || false;

    this.typeForm = this.fb.group({
      'code': new FormControl(typeCode, [Validators.required]),
      'label': new FormControl(typeLabel, [Validators.required]),
      'description': new FormControl(typeDescription),
      'rank': new FormControl(typeRank, [Validators.required]),
      'active': new FormControl(typeActive),
    });
  }

  closeAddTypePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.editMode) {
      console.log('Modifier')
      this.type = this.typeForm.value
      this.type.id = this.typeId;
      this.allService.updateType(this.type).subscribe(
        data => {
          console.log('Response:', data);
          this.type = data;
          this.typeId = this.type.id;
        },
        error => {
          console.error('Error:', error);
        }
      );
      this.closeAddTypePopup();
    } else {
      console.log('Ajouter')
      this.submit.emit(this.typeForm.value);
    }

  }
}