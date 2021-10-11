const url = 'localhost:4000/api';

class Auth{
    static register(data:object){
        return fetch(`${url}/auth/register`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>response.json())
    }

    static login(data:object){
        return fetch(`${url}/auth/login`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>response.json())
    }
}

export default Auth