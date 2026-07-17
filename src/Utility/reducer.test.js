import { reducer, initialState } from "./reducer";
import { Type } from "./action.type";

describe("cart reducer", () => {
  it("adds a product to the basket", () => {
    const item = { id: 1, title: "Test Product" };

    const nextState = reducer(initialState, {
      type: Type.ADD_TO_BASKET,
      item,
    });

    expect(nextState.basket).toHaveLength(1);
    expect(nextState.basket[0]).toEqual(item);
  });

  it("removes a product from the basket", () => {
    const item = { id: 1, title: "Test Product" };
    const stateWithItem = reducer(initialState, {
      type: Type.ADD_TO_BASKET,
      item,
    });

    const nextState = reducer(stateWithItem, {
      type: Type.REMOVE_FROM_BASKET,
      id: item.id,
    });

    expect(nextState.basket).toEqual([]);
  });
});
