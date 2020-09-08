import { mount } from '@vue/test-utils';
import test from 'ava';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

test('is a Vue instance', (t) => {
  const wrapper = mount(ThemeSwitcher);
  t.is(wrapper.isVueInstance(), true);
});
