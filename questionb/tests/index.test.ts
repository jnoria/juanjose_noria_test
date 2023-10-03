import VersionCompare from '../src/version-compare';
import Version  from '../src/version-compare';

describe('Testing two version', () => {
  test('The same version should return VERSION_EQUAL', () => {
    expect(VersionCompare.compare("1.0", "1.0")).toBe(VersionCompare.VERSION_EQUAL);
  });
  test('1.0 and 1.1 version should return VERSION_A_LESS', () => {
    expect(VersionCompare.compare("1.0", "1.1")).toBe(VersionCompare.VERSION_A_LESS);
  });  
  test('1.1 and 1.0 version should return VERSION_A_GREATHER', () => {
    expect(VersionCompare.compare("1.1", "1.0")).toBe(VersionCompare.VERSION_A_GREATHER);
  }); 
  test('10.1 and 10.0.1 version should return VERSION_A_GREATHER', () => {
    expect(VersionCompare.compare("10.1", "10.0.1")).toBe(VersionCompare.VERSION_A_GREATHER);
  });
  test('10.0.1 and 10.1 version should return VERSION_A_LESS', () => {
    expect(VersionCompare.compare("10.0.1", "10.1")).toBe(VersionCompare.VERSION_A_LESS);
  }); 
  test('10.0.1.1 and 10.0.1.0 version should return VERSION_A_GREATHER', () => {
    expect(VersionCompare.compare("10.0.1.1", "10.0.1.0")).toBe(VersionCompare.VERSION_A_GREATHER);
  }); 
  test('1.1. and 1.0 version should return VERSION__A_ERROR_INPUT', () => {
    expect(VersionCompare.compare("1.1.", "1.0")).toBe(VersionCompare.VERSION__A_ERROR_INPUT);
  });  
  test('1.1 and 1.0. version should return VERSION__B_ERROR_INPUT', () => {
    expect(VersionCompare.compare("1.1", "1.0.")).toBe(VersionCompare.VERSION__B_ERROR_INPUT);
  });
  test('a.0 and 1.0. version should return VERSION__A_ERROR_INPUT', () => {
    expect(VersionCompare.compare("a.0", "1.0.")).toBe(VersionCompare.VERSION__A_ERROR_INPUT);
  });    
});