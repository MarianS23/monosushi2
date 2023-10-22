import { Injectable } from '@angular/core';
import { IdiscountRequest,IDiscountResponce } from '../interface/common.interface';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionReference, Firestore, collectionData, docData } from '@angular/fire/firestore';
import { DocumentData, collection, addDoc, doc, updateDoc,deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = environment.BACKEND_URL;
  private api = {discounts:`${this.url}/discounts`}
  public discounts:Array<IDiscountResponce> = [];
  private discountCollection!:CollectionReference<DocumentData>;
  constructor(
    private http:HttpClient,
    private afs:Firestore
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
   }

  getAll():Observable<IDiscountResponce[]>{
    return this.http.get<IDiscountResponce[]>(this.api.discounts)
  }

  getOne(id:number):Observable<IDiscountResponce>{
    return this.http.get<IDiscountResponce>(`${this.api.discounts}/${id}`)
  }

  create(discount:IdiscountRequest):Observable<IDiscountResponce>{
    return this.http.post<IDiscountResponce>(this.api.discounts,discount)
  }

  update(discount:IdiscountRequest, id:number):Observable<IDiscountResponce>{
    return this.http.patch<IDiscountResponce>(`${this.api.discounts}/${id}`,discount)
  }

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }

  //---------------------------
  getAllFirebase(){
    return collectionData(this.discountCollection,{idField:'id'})
  }

  getOneFirebase(id:string){
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocumentReference,{idField:'id'});
  }

  createFirebase(discount: IdiscountRequest) {
    return addDoc(this.discountCollection, discount)
  }

  updateFirebase(discount: IdiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, { ...discount })
  }

  deleteFirebase(id: string){
    const discountsDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountsDocumentReference)
  }
  
}
