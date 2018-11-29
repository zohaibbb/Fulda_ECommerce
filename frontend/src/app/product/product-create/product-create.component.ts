import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';
// import { AddProductService } from '../../services/add-product.service';
// import {GetAllCategoriesService} from '../../services/get-all-categories.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form;
  categories;
  count = 0;
  posted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService
    ) {
      this.form = fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        condition: ['', [Validators.required]],
        price: ['', [Validators.required]],
        category_id: ['', [Validators.required]]
      });
    }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get condition() { return this.form.get('condition'); }
  get price() { return this.form.get('price'); }
  get category_id() { return this.form.get('category_id'); }

  post() {
    console.log(this.form);
    this.form.seller_id = 1; // will be made dynamic in future
    this.signingService.postProduct(this.form.value)
      .subscribe(
        result => {
          console.log(result);
          this.form.reset();
          this.posted = true;
          setTimeout(() => {
            this.posted = false;
          }, 5000);
        },
        err => console.log(err)
      );
  }
  selectedFile = [];
  ngOnInit() {
    this.signingService.getCategories()
      .subscribe(categories => this.categories = categories);
    // this.Categories=this.getallcategories.getAllCategories();
  }

  
  onFileSelected(event) {
    for (let entry of event.target.files) {

      this.selectedFile[this.count] = <File>entry;

      console.log(this.selectedFile[this.count]);
      this.count = this.count + 1;
      //console.log(entry);

      const fd = new FormData();
      fd.append('image', this.selectedFile[0], this.selectedFile[0].name);

      console.log(fd);

      //console.log(entry); // 1, "string", false
    }


    // this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    // this.selectedFile = event.target.files[1]

    // console.log(this.selectedFile);
  }
  // addnewProduct(form: NgForm) {

    // console.log(JSON.stringify(form.value));
    //alert(JSON.stringify(form.value));
    //alert(form.value);


    // this.addproductservice.addProduct()
    //   .subscribe(res => {
    //     alert('Successfully added to database and wait for the approval')
    //   },
    //     err => console.log('err =>', err));

  // }


}
