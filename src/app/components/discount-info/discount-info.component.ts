import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { IDiscountResponce } from 'src/app/shared/interface/common.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {
  public currentDiscount!: IDiscountResponce;
  public terms:any;

  constructor(
    private discountService: DataService,
    private activateRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getCurrentDiscount();
  }

  getCurrentDiscount(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.discountService.getOneFirebase(id as string).subscribe(data => {
      this.currentDiscount = data as IDiscountResponce;
      this.terms = this.currentDiscount.description.split('.');
    })
  }

}
