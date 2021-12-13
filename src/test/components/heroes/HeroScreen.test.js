import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { HeroScreen } from "../../../components/heroes/HeroScreen"


describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
        hero: ["asdasd"]
    }
    
    
    
    test('debe mostrar el componente correcctamente redirect si no hay argumentos en el url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/hersdf"]}>
            <Route path="/hero/:heroeId" component = {HeroScreen}/>
            </MemoryRouter>)
        expect(wrapper.text()).toBe("");
        expect(wrapper).toMatchSnapshot()
        //expect(wrapper.find("Redirect").exists()).toBe(true)
    })
    
    test('debe mostrar un hero si el parametro existe ', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries = {["/hero/marvel-captain"]}>
        <Route path="/hero/:heroeId" component = {HeroScreen}/>
        </MemoryRouter>)
        expect(wrapper.find(".row").exists()).toBe(true)
    })
    
    test('debe regrear a la pantalla anterior con push ', () => {
        
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/hero/marvel-captain"]}>
            <Route path="/hero/:heroeId" 
            component = {(props) =>
            <HeroScreen history = {historyMock}/>}/>
            </MemoryRouter>
        )
        const button = wrapper.find("button");
        button.simulate("click");
        expect(historyMock.push).toHaveBeenCalledWith("/");
        expect(historyMock.goBack).not.toHaveBeenCalled();
    })

    test('debe regresar a la ventana anterior GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/hero/marvel-captain"]}>
            <Route path="/hero/:heroeId" 
            component = {(props) =>
            <HeroScreen history = {historyMock}/>}/>
            </MemoryRouter>
        )
        const button = wrapper.find("button");
        button.simulate("click");
        expect(historyMock.push).not.toHaveBeenCalled();
        expect(historyMock.goBack).toHaveBeenCalled();
    })
    
    test('debe de llamar el redirect si el hero no exisste ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries = {["/hero/12345678"]}>
            <Route path="/hero/:heroeId" 
            component = {(props) =>
            <HeroScreen history = {historyMock}/>}/>
            </MemoryRouter>
        )
        expect(wrapper.text()).toBe("")
    })
    
    
})
