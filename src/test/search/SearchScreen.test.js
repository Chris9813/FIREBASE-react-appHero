import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { SearchScreen } from "../../components/search/SearchScreen"


describe('pruebas en el componente SearchScreen ', () => {
    
    test('debe mostrarse correctamente con valores por defecto ', () => {
        const wrapper = mount(
        <MemoryRouter initialEntries = {["/search"]}>
            <Route path = "/search" component = {SearchScreen}/>
        </MemoryRouter>        
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("search a hero")
    })
    
    test('debe mostrar  batman y el input con el valor del queryString ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/search?q=batman"]}>
                <Route path = "/search" component = {SearchScreen}/>
            </MemoryRouter>        
            )
        expect( wrapper.find("input").prop("value")).toBe("batman") 
        expect( wrapper ).toMatchSnapshot();
        console.log(wrapper.find("input").prop("value"));
    })

    test('debe de mostrar un error si no se encuentra el hero ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/search?q=batman12"]}>
                <Route path = "/search" component = {SearchScreen}/>
            </MemoryRouter>        
            )
        expect( wrapper.find("input").prop("value")).toBe("batman12") 
        expect( wrapper ).toMatchSnapshot();
        console.log(wrapper.find("input").prop("value"));
        expect(wrapper.find(".alert-warning").text().trim()).toBe("There is no a hero batman12, is a bich, search anoter thing");
    })


    test('debe de llamar el push del history ', () => {
        const history = {
            push: jest.fn(),
        };
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/search?q=batman"]}>
                <Route path = "/search" 
                component = {() => <SearchScreen history = {history}/>}/>
            </MemoryRouter>        
            )
        
        wrapper.find("input").simulate("change", {
            target : {
                name: "name",
                value: "batman",
            }
        });

        wrapper.find("form").prop("onSubmit")({
            preventDefault(){}
        })

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`)
    })

    

})
