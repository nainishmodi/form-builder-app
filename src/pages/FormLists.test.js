import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import FormLists from "./FormLists";
import initialState from '../mockTestData';

describe("Form Builder App", () => {
  const mockStore = configureStore();
  let store, wrapper, table, row, header;

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <FormLists />
        </Router>
      </Provider>
    );
    table = wrapper.find("table");
    row = table.find("tr");
    header = table.find("th");
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test("should have FormLists component", () => {
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(2);
    expect(header).toHaveLength(4);
  });
});
