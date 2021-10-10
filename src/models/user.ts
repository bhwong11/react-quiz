const url = 'localhost:4000/api';

class User{
    static show(id:String|Number){
        return fetch(`${url}/users/${id}`).then(response=>response.json())
    }

    static update(id:String|Number,data:object){
        return fetch(`${url}/users/${id}`,{
            method:'PUT',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        }).then(response=>response.json())
    }

    static delete(id:String|Number){
        return fetch(`${url}/users/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            }
        }).then(response=>response.json())
    }
}

export default User;