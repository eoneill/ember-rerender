var Todo = DS.Model.extend({
  isCompleted: DS.attr('boolean'),
  title      : DS.attr('string')
});

Todo.reopenClass({
  FIXTURES: [
    {
      id         : 1,
      isCompleted: true,
      title      : 'Learn Ember.js'
    },
    {
      id         : 2,
      isCompleted: false,
      title      : '...'
    },
    {
      id         : 3,
      isCompleted: false,
      title      : 'Profit!'
    }
  ]
});

export default Todo;