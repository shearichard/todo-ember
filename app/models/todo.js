import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  text: DS.attr('string'),
  done: DS.attr('boolean')
});
