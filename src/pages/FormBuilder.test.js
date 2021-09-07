import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import FormBuilder from "./FormBuilder";
import initialState from '../mockTestData';

describe("Form Builder App", () => {
  const mockStore = configureStore();
  let store, wrapper, addQuestionBtn;

  // add a div with #modal-area id to the global body
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-area");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);
  //mock fn of window alert
  window.alert = jest.fn();

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <FormBuilder />
        </Router>
      </Provider>
    );
    addQuestionBtn = wrapper.find("#addQuestionBtn");
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test("should have FormBuilder component", () => {
    expect(wrapper.find("#form-name-label").text()).toBe("Form Name");
    expect(addQuestionBtn.props()["disabled"]).toBe(true);
    expect(addQuestionBtn.text()).toBe("Add Question");
  });

  test("should have FormBuilder component", () => {
    const input = wrapper.find("#form-name");
    input.simulate("focus");
    input.simulate("change", { target: { value: "Hello world form" } });
    //Open modal after adding form name
    addQuestionBtn.simulate("click");
  });

  //Modal suite
  test("should have FormBuilder component", () => {
    expect(wrapper.find(".modal-title").text()).toEqual(
      "Create a new question"
    );
    expect(wrapper.find('[htmlFor="questionTitle"]').text()).toEqual(
      "Question / Title"
    );
    expect(wrapper.find('[htmlFor="questionType"]').text()).toEqual(
      "Answer Type"
    );
    const modalFooterElm = wrapper.find(".modal-footer").find("button");
    const createCloseBtn = modalFooterElm.at(2);
    //Modal footer buttons assertion
    expect(modalFooterElm).toHaveLength(3);
    expect(modalFooterElm.at(0).text()).toEqual("Close");
    expect(modalFooterElm.at(1).text()).toEqual("Create");
    expect(createCloseBtn.text()).toEqual("Create & close");
    //Check validation
    createCloseBtn.simulate("click");
    expect(window.alert).toBeCalledWith("Please enter Question/Title");
    //Adding some text to the question title
    const questionTitleInput = wrapper.find("#questionTitle");
    questionTitleInput.simulate("focus");
    questionTitleInput.simulate("change", {
      target: { value: "Enter your name" },
    });
    createCloseBtn.simulate("click");
  });
});
