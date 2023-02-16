const initialState = {
  availableItems: [
    'как+выучить+js',
    'somePath',
    'Картинка',
    'anotherPath',
  ],
  newPages : [
      'shop'
  ],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    default: return state;
  }
}
