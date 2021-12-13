import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DeshboardRoutes } from "../../routers/DeshboardRoutes";

describe('Pruebas en <DasboardRoutes />', () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "CHRIS"
        }
    }

    
    test('debe mostrarse correctamente ', () => {

        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value = {contextValue}>
                <DeshboardRoutes />
            </AuthContext.Provider>
            </MemoryRouter>
            
        )
        expect(wrapper).toMatchSnapshot();
    })


})
