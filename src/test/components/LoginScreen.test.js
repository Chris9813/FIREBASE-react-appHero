import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { LoginScreen } from "../../components/login/LoginScreen";


describe('Pruebas en el componente <LoginScreen />', () => {
    
    const history = {
        replace: jest.fn(),
        listen: jest.fn(),
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            user: "Jessi"
        }

    }

    const wrapper = mount(
    
        <AuthContext.Provider value = {contextValue}>
            <LoginScreen history = {history}/>
        </AuthContext.Provider>
        
    );

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de realizar el dispatch y la navegacion ', () => {
        wrapper.find("button").simulate("click")
        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(history.replace).toHaveBeenCalled();
    })
    
    test('debe gurdar informacion en el localStorge ', () => {
        const handleClick = wrapper.find("button").prop("onClick")
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/");
        localStorage.setItem("lastPath", "/dc")
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    })
    
    
})
