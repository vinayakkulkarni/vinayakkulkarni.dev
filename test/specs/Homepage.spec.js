import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import test from 'ava';
import Homepage from '@/pages/index.vue';

test('is a Vue instance', (t) => {
  const wrapper = shallowMount(Homepage, {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  });
  t.is(wrapper.isVueInstance(), true);
});
