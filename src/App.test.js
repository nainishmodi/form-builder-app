import { shallow } from 'enzyme';
import App from './App';

describe('Form Builder App testing', () => {
  test('renders Form Builder App in the document', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.container').getElements().length).toEqual(1);
  });
})
