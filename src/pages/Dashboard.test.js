import { shallow } from 'enzyme';
import DashBoard from './DashBoard';

describe('Form Builder App', () => {
  test('should have Dashboard component', () => {
    const wrapper = shallow(<DashBoard />);
    expect(wrapper.find('h2').text()).toEqual('Dashboard');
    expect(wrapper.find('p').text()).toContain('Welcome');
  });
})
