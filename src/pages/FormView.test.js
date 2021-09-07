import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import FormView from "./FormView";
import initialState from '../mockTestData';

describe("Form Builder App", () => {
  //Mocking useparams
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ id: 1234 }),
  }));
  
  const mockStore = configureStore();
  let store, wrapper;

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <FormView />
        </Router>
      </Provider>
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test("should have FormView component", () => {
    console.log(wrapper.debug());
    //TO be continue
  });
});
