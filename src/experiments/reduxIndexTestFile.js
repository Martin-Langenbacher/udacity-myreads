// >>>   Library Code   <<<
//
// The store should have four parts
function createStore(reducer) {
  // 1. The state
  let state;
  let listeners = [];

  // 2. Get the state
  const getState = () => state;

  // 3. Listen to changes on the state.
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4. Update the state (responsible for updating the state inside our actual store)
  const dispatch = (action) => {
    state = reducer(state, action);
    // state = todos(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// >>>   App Code   <<<
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

// 3b) We also have a function which takes in a state and an
//     action and returns us the new state of our app
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todoItem) =>
        todoItem.id !== action.id
          ? todoItem
          : Object.assign({}, todoItem, { complete: !todoItem.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// ==>> How to use it...
const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch(
  addTodoAction({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 1,
    name: "Wash the car",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 2,
    name: "Go to the gym",
    complete: true,
  })
);

store.dispatch(removeTodoAction(1));
store.dispatch(removeTodoAction(0));

store.dispatch(
  addGoalAction({
    id: 0,
    name: "Learn Redux",
  })
);

store.dispatch(toggleTodoAction(0));

store.dispatch(
  addGoalAction({
    id: 1,
    name: "Lose 20 pounds",
  })
);

store.dispatch(removeGoalAction(0));

// Deleted ??? <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/*

unsubscribe();
*/
