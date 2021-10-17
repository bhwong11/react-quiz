const url = 'https://quiz-backend-bryant-wong.herokuapp.com/api/';

class User{
    static all(){
        return fetch(`${url}/users/all`,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.uid}`
            }
        }).then(response=>response.json())
    }
    static show(){
        return fetch(`${url}/users/`,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.uid}`
            }
        }).then(response=>response.json())
    }

    static update(data:object){
        return fetch(`${url}/users/`,{
            method:'PUT',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json',
                authorization:`Bearer ${localStorage.uid}`
            }
        }).then(response=>response.json())
    }

    static delete(){
        return fetch(`${url}/users/`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
                authorization:`Bearer ${localStorage.uid}`
            }
        }).then(response=>response.json())
    }
}

export default User;