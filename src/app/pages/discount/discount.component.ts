import { Component,OnInit } from '@angular/core';
import { IDiscountResponce } from 'src/app/shared/interface/common.interface';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit{
constructor(
  private discountService:DataService
){}
ngOnInit(): void {
  this.getDiscounts()
}
public discounts = this.discountService.discounts;

getDiscounts(){
  return this.discountService.getAllFirebase().subscribe(data=>{
    this.discounts = data as IDiscountResponce[];
  })
}
}
