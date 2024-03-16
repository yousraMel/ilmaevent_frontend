import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AllService } from '../../services/all.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class PortfolioComponent implements OnInit {
  // images: any[] = [];
  // posters: any[] = [];

  posters = [
    { url: '../../../assets/img/portfolio/AFF1.jpg', label: 'Image 1', title: 'Title 1' },
    { url: '../../../assets/img/portfolio/AFF2.jpg', label: 'Image 2', title: 'Title 2' },
    { url: '../../../assets/img/portfolio/AFF3.jpg', label: 'Image 3', title: 'Title 3' },
    { url: '../../../assets/img/portfolio/AFF4.jpg', label: 'Image 4', title: 'Title 4' },
    { url: '../../../assets/img/portfolio/AFF5.jpg', label: 'Image 5', title: 'Title 5' },
    { url: '../../../assets/img/portfolio/AFF6.jpg', label: 'Image 6', title: 'Title 6' },
    { url: '../../../assets/img/portfolio/AFF7.png', label: 'Image 7', title: 'Title 7' },
    { url: '../../../assets/img/portfolio/AFF8.jpg', label: 'Image 8', title: 'Title 8' },
    { url: '../../../assets/img/portfolio/AFF9.jpg', label: 'Image 9', title: 'Title 9' },
    { url: '../../../assets/img/portfolio/AFF10.jpg', label: 'Image 10', title: 'Title 10' },
    { url: '../../../assets/img/portfolio/AFF11.jpg', label: 'Image 11', title: 'Title 11' },
    { url: '../../../assets/img/portfolio/AFF12.jpg', label: 'Image 12', title: 'Title 12' },
    { url: '../../../assets/img/portfolio/AFF13.jpg', label: 'Image 13', title: 'Title 13' },
    { url: '../../../assets/img/portfolio/AFF14.jpg', label: 'Image 14', title: 'Title 14' }
    // Add more images as needed
  ];

  images = [
    { url: '../../../assets/img/portfolio/IMG1.jpg', label: 'Image 1', description: '' },
    { url: '../../../assets/img/portfolio/IMG2.jpg', label: 'Image 2', description: '' },
    { url: '../../../assets/img/portfolio/IMG3.jpg', label: 'Image 3', description: '' },
    { url: '../../../assets/img/portfolio/IMG4.jpg', label: 'Image 4', description: '' },
    // { url: '../../../assets/img/portfolio/IMG5.jpg', label: 'Image 5', description: '' },
    // { url: '../../../assets/img/portfolio/IMG6.jpg', label: 'Image 6', description: '' },
    // { url: '../../../assets/img/portfolio/IMG7.jpg', label: 'Image 7', description: '' },
    { url: '../../../assets/img/portfolio/IMG8.jpg', label: 'Image 8', description: '' },
    { url: '../../../assets/img/portfolio/IMG9.jpg', label: 'Image 9', description: '' },
    // { url: '../../../assets/img/portfolio/IMG10.jpg', label: 'Image 10', description: '' },
    // { url: '../../../assets/img/portfolio/IMG11.jpg', label: 'Image 11', description: '' }


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
      // this.images = this.filterAndSortMedia(resp, 'Image');
      // this.posters = this.filterAndSortMedia(resp, 'Affiche');
    });
  }
  private filterAndSortMedia(resp: any[], mediaType: string): any[] {
    const filteredMedia = resp.filter((media: any) => media.type === mediaType && media.active === true);
    return filteredMedia.sort((a: any, b: any) => a.rank - b.rank);
  }
}
