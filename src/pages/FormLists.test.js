import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom';
import FormLists from './FormLists';

describe('Form Builder App', () => {
  const initialState = {"formBuilder": [{"formId":"form1630866082952","formName":"Hello form","formCreatedDate":"2021-09-05T18:21:22.952Z","formQuestions":[{"questionId":1630866073439,"questionTitle":"h","questionType":"checkbox","questionLists":["abc","xyz","nkm"]}],"submissions":[{"formId":"form1630866082952","1630866073439":["abc"]}]}]}
  const mockStore = configureStore();
  let store,wrapper,table,row,header;

  beforeAll(() => {
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><Router><FormLists /></Router></Provider>);
    table = wrapper.find('table');
    row = table.find('tr');
    header = table.find('th');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test('should have FormLists component', () => {
    expect(table).toHaveLength(1);
    expect(row).toHaveLength(2);
    expect(header).toHaveLength(4);
  });
});
