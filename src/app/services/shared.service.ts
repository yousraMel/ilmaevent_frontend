import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  editMode = false;

  constructor() { }

 activeFilterAndSortItems(resp: any[]): any[] {
    const filteredItems = resp.filter((item: any) => item.active === true);
    return filteredItems.sort((a: any, b: any) => a.rank - b.rank);
  }

  validateAllFormFields(formGroup: FormGroup): void {
    // Mark all form controls as touched to display validation errors
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      console.log(`Control "${field}" Errors:`, control?.errors);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  isFieldValid(field: string, formGroup: FormGroup) {
      return !formGroup?.get(field)?.valid && formGroup?.get(field)?.touched;
  }

  displayFieldCss(field: string,formGroup: FormGroup): any {
    // Define CSS classes based on field validity
    return {
      'has-error': this.isFieldValid(field, formGroup),
      'has-feedback': this.isFieldValid(field, formGroup)
    };
  }
}
