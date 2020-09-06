class TodoService {

    constructor(){
        this.server = "https://lab5-completed.herokuapp.com";
        this.token = localStorage.getItem('access_token') ?? "";
    }

    async login(username, password){
        const response = await this.sendRequest(`${this.server}/auth`, 'POST', {username, password});
        if ('access_token' in response){
            localStorage.setItem('access_token', response['access_token']);
            this.token = response['access_token'];
        }
        return response;
    }

    createTodo(text){
        return this.sendRequest(`${this.server}/todo`, 'POST', {text});
    }

    getTodos(){
        return this.sendRequest(`${this.server}/todo`, 'GET');
    }

    getTodo(id){
        return this.sendRequest(`${this.server}/todo/${id}`, 'GET');
    }

    updateTodo(id, todo){
        return this.sendRequest(`${this.server}/todo/${id}`, 'PUT', todo);
    }

    deleteTodo(id){
        return this.sendRequest(`${this.server}/todo/${id}`, 'DELETE');
    }

    async sendRequest(url, method, data){
        try{
          //retrieve token from localStorage
          let token = window.localStorage.getItem('access_token');
      
          let options = {//options passed to fetch function
              method: method,
              headers: { 
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${token}`//send token in request
              }
          };
      
          if(data)//data will be given for PUT & POST requests
            options.body = JSON.stringify(data);//convert data to JSON string
      
          let response = await fetch(url, options);
            
          return response.json();//Get json data from response
      
        }catch(error){
          return {error};//catch and return
        }
    }
}

const todoService = new TodoService();

export default todoService;