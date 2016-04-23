import Ember from 'ember';
import SaveModelMixin from 'todo-ember/mixins/todos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('todo');
  }
});
