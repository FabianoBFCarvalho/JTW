import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule,NavController }                from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { HomePage}                                  from "./home";
import { AuthenticationService }                    from "../../sevice/authenticationService";
import { Observable }                               from "rxjs/Observable";

class serviceMock {
    login(login: string, password: string): Observable<Boolean> {
        return new Observable<Boolean>(response => response.next(true));
    }
}

describe('Test HomePage', () => {

    let de: DebugElement;
    let comp: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let mockNavController = {push: () => {}};

    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(HomePage)
            ],
            declarations: [HomePage],
            providers: [
                {
                    provide: AuthenticationService,
                    useClass: serviceMock
                },
                {
                    provide: NavController,
                    useValue: mockNavController
                },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should creat HomePage', () => expect(comp).toBeDefined());

});