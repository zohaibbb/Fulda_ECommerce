import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../services/signing.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminapproval',
  templateUrl: './adminapproval.component.html',
  styleUrls: ['./adminapproval.component.scss']
})
export class AdminapprovalComponent implements OnInit {
  products;
  constructor(
    private title: Title,
    private signingService: SigningService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    const searchKeyword = this.route.snapshot.params.name;

    this.signingService.getProdcuts()
      .subscribe(results => {
      //  if (Array.isArray(results.body) && results.body.length > 0)
       {
       }
      }, err => console.log('err => ', err));
  }

}
