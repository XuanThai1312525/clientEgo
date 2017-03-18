import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        const { username, password } = params;

        var admin = {
          "username" : "admin-event-go-2017",
          "password" : "@dmin-3v3nt-g0-2017"
        }

       var supplier = {
         "username" : username,
         "password" : password
       }

      var temp = {
         admin: admin,
         supplier: supplier
       }
      console.log(JSON.stringify(temp));

      const request = new Request('https://evgo.herokuapp.com/api/v1.0/suppliers/signup', {
          method: 'POST',
          body: JSON.stringify(temp),
          headers: new Headers({ 'Content-Type': 'application/json' }),

      })

      return fetch(request)
          .then(response => {
              if (response.status < 200 || response.status >= 300) {
                  throw new Error(response.statusText);
              }
              console.log(response.json());
               return response.json();

          })
          .then(({ token }) => {
              localStorage.setItem('token', token)
              console.log(token);
          });
         return Promise.resolve();
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unkown method');
};
