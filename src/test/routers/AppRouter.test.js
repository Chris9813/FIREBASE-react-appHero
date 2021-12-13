import { mount, shallow } from "enzyme"
import { AuthContext } from "../../auth/AuthContext"
import { AppRouter } from "../../routers/AppRouter"


describe('Prueas en el componente <AppRouter />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe mostrar el login si no esta autenticado ', () => {
        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
    })
    
    test('debe mostra el componente marvel si esta autenticado ', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "CHRIS"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value = {contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper.find(".navbar").exists()).toBe(true)
    })
    

})
