import { mount, shallow } from "enzyme"
import { MemoryRouter } from "react-router"
import { PrivateRoute } from "../../routers/PrivateRoute"


describe('Prueas en private router', () => {

    const props = {
        location: {pathname: "/marvel"}
    }
    
    Storage.prototype.setItem = jest.fn()

    test('debe de mostrar el componente si esta autenticado y guaradar el localstorage', () => {
            const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated = {true}
                    component = {() => <span>LISTO</span>}
                    {...props}
                />)
            </MemoryRouter>)
        expect(wrapper.find("span").exists()).toBe(true)
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel")
    })

    test('debe bloquear e componente si no esta autenticado ', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated = {false}
                    component = {() => <span>LISTO</span>}
                    {...props}
                />)
            </MemoryRouter>)
        expect(wrapper.find("span").exists()).toBe(false)
    })
    
    

})
