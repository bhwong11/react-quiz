const url = 'https://quiz-backend-bryant-wong.herokuapp.com/api/';

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

    static async login(data:object){
        const responseResult = await fetch(`${url}/auth/login`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>{
            return response.json()
            }).then(json=>{
                console.log('JSON!!!!!',json)
                localStorage.setItem('uid',json.token)
                localStorage.setItem('user',JSON.stringify(json))
                return json
        })
        return responseResult
        
    }
}

export default Auth