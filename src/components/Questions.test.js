import { mount } from 'enzyme';
import Questions from './Questions';

const fakeQuestions = {"formQuestions":{"questionId":1630937169130,"questionTitle":"Gender","questionType":"text","questionLists":[]}}
const updateAnswer = jest.fn();

describe('Form Builder App', () => {
  test('should have Questions component', () => {
    const wrapper = mount( <Questions formQuestions={fakeQuestions.formQuestions} updateAnswer={updateAnswer} /> );
    const label = wrapper.find('[htmlFor="Gender"]');
    expect(label.text()).toBe('Gender');
    const input = wrapper.find('input[type="text"]');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'Dumy text' } });
    expect(updateAnswer).toHaveBeenCalled();
    expect(updateAnswer).toHaveBeenCalledWith(fakeQuestions.formQuestions.questionId, "Dumy text");
    //Unmounting component
    wrapper.unmount();
  });
})
