
class AuthRepo {

     constructor(){
         this.apiEndpoint = "https://boardinf.herokuapp.com";



         this.login = this.apiEndpoint+'/users/login';
         this.signup = this.apiEndpoint+'/users/signup';
         this.contacts = this.apiEndpoint+'/contacts/all';
     }


}


export default AuthRepo;