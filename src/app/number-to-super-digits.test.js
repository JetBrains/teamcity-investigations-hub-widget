/* eslint-disable no-magic-numbers */
import {expect} from 'chai';

import numberToSuperDigits from './number-to-super-digits';

describe('numberToSuperDigits', () => {
  it('zero', () => {
    expect(numberToSuperDigits(0)).to.equal('⁰');
  });
  it('one digit', () => {
    expect(numberToSuperDigits(3)).to.equal('³');
  });
  it('7 digits', () => {
    expect(numberToSuperDigits(2128506)).to.equal('²¹²⁸⁵⁰⁶');
  });
  it('negative number', () => {
    expect(numberToSuperDigits(-42)).to.equal('⁻⁴²');
  });
});
