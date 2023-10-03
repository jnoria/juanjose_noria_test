import Overlap  from '../src/overlap';
import Utils from '../src/utils';

describe('Testing validation', () => {
  test("Line string with value 'anything' should result false ", () => {
    expect(Utils.isValidLine("anything")).toBe(false);
  });
  test("Line string with value '1' should result false ", () => {
    expect(Utils.isValidLine("1")).toBe(false);
  });
  test("Line string with value '1,' should result false ", () => {
    expect(Utils.isValidLine("1,")).toBe(false);
  });
  test("Line string with value '1,2' should result true ", () => {
    expect(Utils.isValidLine("1,2")).toBe(true);
  });
  test("Line string with value '10.4,2.2' should result true ", () => {
    expect(Utils.isValidLine("10.4,2.2")).toBe(true);
  });
});

describe('Testing overlap', () => {
  test('x1=1, x2=3, x3=3, x4=4  should result false (not overlapped)', () => {
    expect(Overlap.overlap(1,2,3,4)).toBe(false);
  });
  test('x1=1, x2=2, x3=1, x4=2  should result true (overlapped)', () => {
    expect(Overlap.overlap(1,2,1,2)).toBe(true);
  });
  test('x1=1, x2=100, x3=99, x4=100  should result true (overlapped)', () => {
    expect(Overlap.overlap(1,100,99,100)).toBe(true);
  });
  test('x1=-1, x2=1, x3=0, x4=1  should result true (overlapped)', () => {
    expect(Overlap.overlap(-1,1,0,1)).toBe(true);
  });
});

