import { Component, OnInit } from '@angular/core';
import { AllService } from '../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class HomeComponent implements OnInit {

  benefits: any[] = [];
  isHovered: boolean = false;
  hoveredCardIndex: number | null = null;

  constructor(private allservice: AllService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.allservice.getAllBenefits().subscribe(
      (filteredAndSortedData: any[]) => {
        this.benefits = filteredAndSortedData;
      },
      (error: any) => {
        // Handle error
        console.error('Error fetching benefits:', error);
      }
    );

  }

  setHoveredCard(index: number) {
    this.hoveredCardIndex = index;
  }

  resetHoveredCard() {
    this.hoveredCardIndex = null;
  }

}
