import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllService } from '../../services/all.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class PortfolioComponent implements OnInit {
  images: any[] = [];
  posters: any[] = [];

  constructor(private allService: AllService) { }
  // https://www.positronx.io/how-to-integrate-owl-carousel-2-in-angular/
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit() {
    this.allService.getAllMedia().subscribe((resp: any) => {
      this.images = this.filterAndSortMedia(resp, 'Image');
      this.posters = this.filterAndSortMedia(resp, 'Affiche');
    });
  }
  private filterAndSortMedia(resp: any[], mediaType: string): any[] {
    const filteredMedia = resp.filter((media: any) => media.type === mediaType && media.active === true);
    return filteredMedia.sort((a: any, b: any) => a.rank - b.rank);
  }
}
