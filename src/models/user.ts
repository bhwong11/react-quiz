const url = 'localhost:4000/api';

class User{
    static show(id:String|Number){
        return fetch(`${url}/users/${id}`).then(response=>response.json())
    }
    static update(id:String|Number){
        return fetch(`${url}/users/${id}`,{
            method:'PUT',
            body:JSON.stringify(data)
        }).then(response=>response.json())
    }
}