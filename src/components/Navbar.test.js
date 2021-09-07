import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

describe('Form Builder App', () => {
  test('should have Navbar component', () => {
    const wrapper = shallow( <Navbar /> );
    expect(wrapper.find(NavLink).first().props().to).toEqual("/");
    expect(wrapper.find(NavLink).first().text()).toEqual("Form Builder App");
    expect(wrapper.find(NavLink).at(2).props().to).toEqual("/forms");
    expect(wrapper.find(NavLink).at(2).text()).toEqual("Form Lists");
    expect(wrapper.find(NavLink).at(3).props().to).toEqual("/formbuilder");
    expect(wrapper.find(NavLink).at(3).text()).toEqual("Form Builder");
    //Unmounting component
    wrapper.unmount();
  });
})
