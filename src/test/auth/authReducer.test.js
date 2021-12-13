import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"


describe('Pruebas en authReducer', () => {
    
    test('debe retornar el estado por defeco', () => {

        const state = authReducer({},{type: types.logout, payload: {} })
        expect(state.logged).toBe(false)
    })
    

    test('debe autenticar y colocar el name del usuario', () => {
        const state = authReducer({},{type: types.login, payload: {user: "CHRIS"} })
        expect(state.logged).toBe(true)
        expect(state.user).toBe("CHRIS");
    })
    
    test('debe de borrar el name del usuario y logg en false ', () => {
        const state = authReducer({user:"CHRIS", logged: true},{type: types.logout, payload: {} })
        expect(state).toEqual({logged: false})
    })
    

})
