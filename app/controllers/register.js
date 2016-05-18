import Ember from 'ember';
import ENV from 'todo-ember/config/environment';

export default Ember.Controller.extend({

  actions: {
    register() {
      let {username, email, password, confirm_password} = this.getProperties(
        'username',
        'email',
        'password',
        'confirm_password'
      );

      Ember.$.ajax({
        url: ENV.host + '/api-register/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirm_password: confirm_password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then((response) => {
        //If the success callback is fired, 
        //we hide the login form and show 
        //the “Signup Complete” message
        this.set('signupComplete', true);
      }, (xhr, status, error) => {
        //If the failure callback is fired
        //we write the error message below
        //the form. 
        this.set('error', xhr.responseText);
      });
    }
  }
});
