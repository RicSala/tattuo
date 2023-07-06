export const uiReducer = (state, action) => {

  switch (action.type) {

    case '[UI] - onOpen register modal':
      return {
        ...state,
        RegisterModalisOpen: true,
      };

    case '[UI] - onClose register modal':
      return {
        ...state,
        RegisterModalisOpen: false,
      };
    case '[UI] - onOpen Login modal':
      return {
        ...state,
        LoginModalisOpen: true,
      };

    case '[UI] - onClose Login modal':
      return {
        ...state,
        LoginModalisOpen: false,
      };
    case '[UI] - onOpen Rent modal':
      return {
        ...state,
        RentModalisOpen: true,
      };

    case '[UI] - onClose Rent modal':
      return {
        ...state,
        RentModalisOpen: false,
      };
    case '[UI] - onOpen Search modal':
      return {
        ...state,
        SearchModalisOpen: true,
      };

    case '[UI] - onClose Search modal':
      return {
        ...state,
        SearchModalisOpen: false,
      };


    default:
      return state;
  }
};