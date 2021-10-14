const url = 'http://localhost:4000/api';

class Quiz{
    static all(){
        return fetch(`${url}/quiz`).then(response=>response.json())
    }
    static create(data:object){
        return fetch(`${url}/quiz`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            },
        }).then(response=>response.json())
    }
    static show(id:String | Number){
        return fetch(`${url}/quiz/${id}`).then(response=>response.json())
    }
    static update(id:String | Number,data:object){
        return fetch(`${url}/quiz/${id}`,{
            method:'PUT',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        }).then(response =>response.json())
    }
    static destroy(id:String | Number){
        return fetch(`${url}/quiz/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            }
        }).then(response =>response.json())
    }
}

export default Quiz;