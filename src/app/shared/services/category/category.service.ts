import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryRequest, ICategoryResponce } from '../../interface/common.interface';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, collection, addDoc, doc, updateDoc,deleteDoc } from '@firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };
  public categories: Array<ICategoryResponce> = [];
  private categoryCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }



  getAll(): Observable<ICategoryResponce[]> {
    return this.http.get<ICategoryResponce[]>(this.api.categories)
  }
  getOne(path: string): Observable<ICategoryResponce[]> {
    return this.http.get<ICategoryResponce[]>(this.api.categories[0])
  }
  create(category: ICategoryRequest): Observable<ICategoryResponce> {
    return this.http.post<ICategoryResponce>(this.api.categories, category)
  }
  update(category: ICategoryRequest, id: number): Observable<ICategoryResponce> {
    return this.http.patch<ICategoryResponce>(`${this.api.categories}/${id}`, category)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`)
  }

  //-------------------------------------
  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category)
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' })
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category })
  }

  deleteFirebase(id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference)
  }
}
