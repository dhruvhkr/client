function reducer(state, action) {
  //For info which action got dipatched
  console.log(action.type);
  switch (action.type) {
    case "initialState":
      return {
        ...action.payload,
      };
    case "policy_id":
      return { ...state, Policy_id: action.payload };
    case "customer_id":
      return { ...state, Customer_id: action.payload };
    case "Fuel":
      return { ...state, Fuel: action.payload };
    case "VEHICLE_SEGMENT":
      return { ...state, VEHICLE_SEGMENT: action.payload };
    case "Premium":
      return { ...state, Premium: action.payload };
    case "bodily_injury_liability":
      return { ...state, bodily_injury_liability: action.payload };
    case "personal_injury_protection":
      return { ...state, personal_injury_protection: action.payload };
    case "property_damage_liability":
      return { ...state, property_damage_liability: action.payload };
    case "collision":
      return { ...state, collision: action.payload };
    case "comprehensive":
      return { ...state, comprehensive: action.payload };
    case "Customer_Gender":
      return { ...state, Customer_Gender: action.payload };
    case "Customer_Income_group":
      return { ...state, Customer_Income_group: action.payload };
    case "Customer_Region":
      return { ...state, Customer_Region: action.payload };
    case "Customer_Marital_status":
      return { ...state, Customer_Marital_status: action.payload };
    default:
      return state;
  }
}

export default reducer;
