import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom';
import FormBuilder from './FormBuilder';

describe('Form Builder App', () => {
  const initialState = {"formBuilder": [{"formId":"form1630866082952","formName":"Hello form","formCreatedDate":"2021-09-05T18:21:22.952Z","formQuestions":[{"questionId":1630866073439,"questionTitle":"h","questionType":"checkbox","questionLists":["abc","xyz","nkm"]}],"submissions":[{"formId":"form1630866082952","1630866073439":["abc"]}]}]}
  const mockStore = configureStore();
  let store,wrapper,addQuestionBtn;

  // add a div with #modal-area id to the global body
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-area');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  beforeAll(() => {
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><Router><FormBuilder /></Router></Provider>);
    addQuestionBtn = wrapper.find('#addQuestionBtn');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test('should have FormBuilder component', () => {
    expect(wrapper.find('#form-name-label').text()).toBe('Form Name');
    expect(addQuestionBtn.props()["disabled"]).toBe(true);
    expect(addQuestionBtn.text()).toBe('Add Question');
  });

  test('should have FormBuilder component', () => {
    const input = wrapper.find('#form-name');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'Hello world form' } });
    //Open modal after adding form name
    addQuestionBtn.simulate('click');
  });

  //Modal suite
  test('should have FormBuilder component', () => {
    expect(wrapper.find('.modal-title').text()).toEqual('Create a new question');
    expect(wrapper.find('[htmlFor="questionTitle"]').text()).toEqual('Question / Title');
    expect(wrapper.find('[htmlFor="questionType"]').text()).toEqual('Answer Type');
    expect(wrapper.find('.modal-footer').find('button')).toHaveLength(3);
    expect(wrapper.find('.modal-footer').find('button').at(0).text()).toEqual('Close');
    expect(wrapper.find('.modal-footer').find('button').at(1).text()).toEqual('Create');
    expect(wrapper.find('.modal-footer').find('button').at(2).text()).toEqual('Create & close');
    //Adding some text to the question title
    const questionTitleInput = wrapper.find('#questionTitle');
    questionTitleInput.simulate('focus');
    questionTitleInput.simulate('change', { target: { value: 'Enter your name' } });
    wrapper.find('.modal-footer').find('button').at(2).simulate('click');
  });
});
