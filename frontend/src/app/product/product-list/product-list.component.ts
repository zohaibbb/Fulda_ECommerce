import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  articles = [{
    type: 'new',
    discount: '7%',
    imageSource: 'http://placehold.it/400x500',
    name: 'Product name',
    price: {
      original: '$330',
      discounted: '$320.99'
    },
    reviews: 8,
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    type: 'new',
    discount: '7%',
    imageSource: 'http://placehold.it/400x500',
    name: 'Product name',
    price: {
      original: '$330',
      discounted: '$320.99'
    },
    reviews: 8,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    type: 'new',
    discount: '11%',
    imageSource: 'http://placehold.it/400x500',
    name: 'Product name',
    price: {
      original: '$330',
      discounted: '$320.99'
    },
    reviews: 8,
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
  }

}
