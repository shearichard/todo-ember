import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'todo-ember/config/environment';

export default Base.extend({
  //We are extending the Ember base authenticator and 
  //implementing the restore and authenticate methods.
  //
  //https://ember-simple-auth.com/api/classes/BaseAuthenticator.html
  //

  restore(data) {
    //Restores the session from a session data object. 
    //This method is invoked by the session either on application startup 
    //if session data is restored from the session store or when properties 
    //in the store change due to external events (e.g. in another tab) and 
    //the new session data needs to be validated for whether it constitutes 
    //an authenticated session.
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(username, password) {
    //Authenticates the session with the specified args. 
    //These options vary depending on the actual authentication mechanism the 
    //authenticator implements (e.g. a set of credentials or a Facebook 
    //account id etc.). The session will invoke this method in order to 
    //authenticate itself
    //
    //For our purposes this is where we call the `/api-auth-token/` endpoint
    //which we have made available in the Django backend
    //
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.host + '/api-auth-token/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then((response) => {
        Ember.run(function() {
          resolve({
            token: response.token
          });
        });
      }, (xhr, status, error) => {
        var response = xhr.responseText;
        Ember.run(function() {
          reject(response);
        });
      });
    });
  },
});
