import {  combineReducers, createStore } from 'redux';

// actions.js
export const updateUserInfo = (obj) => ({
  type: 'UPDATE_USER_INFO', obj
});

export const save = (user) => ({
  type: 'SAVE_USER', user
});

export const usrSelected = (user) => ({
  type: 'USER_SELECTED', user
});

const initialState = {
	informacionUsuario: {},
	previousUser: {},	
	countryList: [],
	userList: []
}




// reducers.js
export const users = (state = initialState, action) => {
  switch (action.type) {
	  
	case 'UPDATE_USER_INFO':
	
	let temp = JSON.parse(JSON.stringify(state.informacionUsuario));
	temp[action.obj.prop] = action.obj.value;
	
	return {
	  ...state,
	  informacionUsuario: temp
	};	
	  
	case 'SAVE_USER':
	  
	  temp = JSON.parse(JSON.stringify(state));
	  
	  let newUser = {name: temp.informacionUsuario.name, 
					surname: temp.informacionUsuario.surname,
					birthDay: temp.informacionUsuario.birthDay,
					country: temp.informacionUsuario.country};
	  
	  temp.userList.push(newUser);
	  
	  localStorage.setItem("users", JSON.stringify(temp.userList));		
	  //JSON.parse(localStorage.getItem("users")) para obtener la lista de usuarios de localstorage si quisiera
	  
	  return{
		  ...state,
		  informacionUsuario: {name: '', surname:'', birthDay: '', country: ''},
		  previousUser: newUser,
		  userList: temp.userList
	  }
	  
	case 'USER_SELECTED':
	
		return{
		  ...state,
		  previousUser: {name: action.user.name, surname: action.user.surname, birthDay: action.user.birthDay, country: action.user.country}
	  }
	  
    default:
      return state;
  }
};

export const reducers = combineReducers({
  users,
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
