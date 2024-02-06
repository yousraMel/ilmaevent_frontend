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
  // posters: any[] = [];

  posters = [
    { url: '../../../assets/img/portfolio/Image1.jpg', label: 'Image 1', title: 'Title 1' },
    { url: '../../../assets/img/portfolio/Image2.jpg', label: 'Image 2', title: 'Title 2' },
    { url: '../../../assets/img/portfolio/Image3.jpg', label: 'Image 3', title: 'Title 3' },
    { url: '../../../assets/img/portfolio/Image4.jpg', label: 'Image 3', title: 'Title 4' },
    { url: '../../../assets/img/portfolio/Image1.jpg', label: 'Image 3', title: 'Title 1' }
    // Add more images as needed
  ];

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
      // this.posters = this.filterAndSortMedia(resp, 'Affiche');
    });
  }
  private filterAndSortMedia(resp: any[], mediaType: string): any[] {
    const filteredMedia = resp.filter((media: any) => media.type === mediaType && media.active === true);
    return filteredMedia.sort((a: any, b: any) => a.rank - b.rank);
  }
}
