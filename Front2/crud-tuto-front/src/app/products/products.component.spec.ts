import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ProductService } from '../shared/Service/Product.service';
import { ProductsComponent } from './products.component';
import { Product } from '../shared/Model/Product';

class MockProductService {
  getAllProducts() {
    return of([]);
  }
  
  addProduct(product: Product) {
    return of({});
  }

  editProduct(product: Product) {
    return of({});
  }

  deleteProduct(id: number) {
    return of({});
  }
}

class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductService: MockProductService;
  let modalService: NgbModal;

  beforeEach(async () => {
    mockProductService = new MockProductService();

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        {
          provide: NgbModal,
          useValue: {
            open: () => ({
              result: new Promise((resolve, reject) => resolve('x'))
            })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all products on init', () => {
    spyOn(mockProductService, 'getAllProducts').and.callThrough();
    component.ngOnInit();
    expect(mockProductService.getAllProducts).toHaveBeenCalled();
  });

  /*it('should add a product', () => {
    spyOn(mockProductService, 'addProduct').and.callThrough();
    component.addProduct({});
    expect(mockProductService.addProduct).toHaveBeenCalledWith({});
  });*/

  it('should edit a product', () => {
    spyOn(mockProductService, 'editProduct').and.callThrough();
    const product = { idProduit: 1, codeProduit: '123', libelleProduit: 'Product', prix: 100, dateCreation: new Date(), dateDerniereModification: new Date() };
    component.editProduct(product);
    expect(mockProductService.editProduct).toHaveBeenCalledWith(product);
  });

  it('should delete a product', () => {
    spyOn(mockProductService, 'deleteProduct').and.callThrough();
    component.deleteProduct(1);
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('should open a modal', () => {
    spyOn(modalService, 'open').and.callThrough();
    component.open({}, null);
    expect(modalService.open).toHaveBeenCalled();
  });

 

  it('should set form to false on cancel', () => {
    component.cancel();
    expect(component.form).toBeFalse();
  });
});
