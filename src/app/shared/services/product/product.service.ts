import { Injectable } from '@angular/core';
import { IProductRequest, IProductResponce } from '../../interface/common.interface';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionReference, Firestore, collectionData,docData } from '@angular/fire/firestore';
import { DocumentData, collection, addDoc, doc, updateDoc,deleteDoc,getDocs } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` }

  public products: Array<IProductResponce> = [];
  private productCollection!:CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs:Firestore
  ) { 
    this.productCollection = collection(this.afs, 'products')
  }

  // getAll(): Observable<IProductResponce[]> {
  //   return this.http.get<IProductResponce[]>(this.api.products)
  // }

  // getOne(id: number): Observable<IProductResponce> {
  //   return this.http.get<IProductResponce>(`${this.api.products}/${id}`)
  // }

  // getAllByCategory(category: string): Observable<IProductResponce[]> {
  //   return this.http.get<IProductResponce[]>(`${this.api.products}?category.path=${category}`)
  // }

  // create(product: IProductRequest): Observable<IProductResponce> {
  //   return this.http.post<IProductResponce>(this.api.products, product)
  // }

  // update(product: IProductRequest, id: number): Observable<IProductResponce> {
  //   return this.http.patch<IProductResponce>(`${this.api.products}/${id}`, product)
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`)
  // }

  //--------------------------------------------------

  getAllFirebase(){
    return collectionData(this.productCollection,{idField:'id'})
  }

  getOneFirebase(id:string){
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference,{idField:'id'});
  }

  
  async getProductsByCategoryFirebase(category:string) {
    try {
      const querySnapshot = await getDocs(this.productCollection);
      const products: IProductResponce[] = [];
  
      querySnapshot.forEach((doc) => {
        const product = doc.data() as IProductResponce;
        const path = product['category'];

        if (path['path'] === category) {
          products.push({
            ...product,
            id: doc.id,
          });
        }
      });
  
      return { products };
    } catch (error) {
      console.error("помилка при отриманні категорій:", error);
      throw error;
    }
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product)
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, { ...product })
  }

  deleteFirebase(id: string){
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference)
  }

 
}
