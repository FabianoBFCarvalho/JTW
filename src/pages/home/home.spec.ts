import { async, TestBed, ComponentFixture }         from "@angular/core/testing";
import { DebugElement }                             from "@angular/core";
import { IonicModule, NavController,
         ToastController, LoadingController }       from "ionic-angular";
import { By }                                       from "@angular/platform-browser";
import { HomePage}                                  from "./home";
import { AuthenticationService }                    from "../../service/authenticationService";
import { MockNavController }                        from "../../mock/mockNavController";
import { ToastMock }                                from '../../mock/toastMock';
import { AuthenticationServiceMock }                from '../../mock/authenticationServiceMock';


describe('Test HomePage', () => {

    let de: DebugElement;
    let comp: HomePage;
    let fixture: ComponentFixture<HomePage>;


    beforeEach(async(() => {
        
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(HomePage)
            ],
            declarations: [
                HomePage
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useClass: AuthenticationServiceMock
                },
                {
                    provide: NavController,
                    useValue: MockNavController
                },
                {
                    provide:ToastController,
                    useClass: ToastMock
                },
                {
                    provide:LoadingController,
                    useClass: ToastMock
                }
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

    it('test login empty email and password', () => {
        comp.login('','');
        expect(comp.message).toBe('preencha todos os campos!');
    });

    it('test login successfully', () => {
        comp.login('fabiano@quickfast.com','senha');
        expect(comp.message).toBe('Bem vindo!');
    });

    it('test login wrong',() => {
        comp.login('fabiano@teste.com','livre');
        expect(comp.message).toBe('Usuario ou senha invalido');
    });

});