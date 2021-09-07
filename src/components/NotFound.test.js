import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import NotFound from './NotFound';

describe('Form Builder App', () => {
  test('should have Not Found component', () => {
    const wrapper = shallow( <NotFound /> );
    expect(wrapper.find('h1').text()).toEqual('Oops!');
    expect(wrapper.find('h2').text()).toEqual('404 Not Found');
    expect(wrapper.find('.error-details').text()).toContain('Requested page not found!');
    expect(wrapper.find(NavLink).first().props().to).toEqual("/");
    expect(wrapper.find(NavLink).first().text()).toEqual("Back to the Dashboard");
    //Unmounting component
    wrapper.unmount();
  });
})
