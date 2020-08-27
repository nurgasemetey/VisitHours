var STORAGE_KEY="websiteVisitHoursPrefs";


document.addEventListener('DOMContentLoaded', function () {
  console.log("start");

  var localStorage = window.localStorage;
  var urlColorPairsInput = document.querySelector('textarea');
  var opacityInput = document.querySelector('input[name="opacity"]');
  var borderWidthInput = document.querySelector('input[name="border-width"]');
  var activeCheckbox = document.querySelector('input[name="active"]');
  var startMinuteInput = document.querySelector('input[name="start-minute"]');
  var endMinuteInput = document.querySelector('input[name="end-minute"]');

  console.log("divs");
  // use localStorage for the application 'state'.

  // First, grab the default state from localStorage.
  var prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  console.log("prefs", prefs);
  var urlColorPairs = prefs.urlColorPairs || '';
  var opacity = prefs.opacity || .2;
  var borderWidth = prefs.borderWidth || '15px';
  var isActive = typeof(prefs.active) === 'boolean' ? prefs.active : activeCheckbox.checked;
  var snoozeTime = prefs.snoozeTime || 5;
  var expirationTime = prefs.expirationTimeString || '';
  var startMinute = prefs.startMinute || -1;
  var endMinute = prefs.endMinute || -1;
  console.log("defaults");

  // Now initialize state with default or previous values.
  chrome.extension.getBackgroundPage().updateLocalStorage('active', isActive);
  chrome.extension.getBackgroundPage().updateLocalStorage('urlColorPairs', urlColorPairs);
  chrome.extension.getBackgroundPage().updateLocalStorage('opacity', opacity);
  chrome.extension.getBackgroundPage().updateLocalStorage('borderWidth', borderWidth);
  chrome.extension.getBackgroundPage().updateLocalStorage('snoozeTime', snoozeTime);
  chrome.extension.getBackgroundPage().updateLocalStorage('startMinute', startMinute);
  chrome.extension.getBackgroundPage().updateLocalStorage('endMinute', endMinute);


  // Update the input values with initial state.
  urlColorPairsInput.value = urlColorPairs;
  opacityInput.value = opacity;
  borderWidthInput.value = borderWidth;
  activeCheckbox.checked = isActive;
  startMinuteInput.value = startMinute;
  endMinuteInput.value = endMinute;


  urlColorPairsInput.addEventListener('input', function(e) {
    chrome.extension.getBackgroundPage().updateLocalStorage('urlColorPairs', e.target.value);
    chrome.extension.getBackgroundPage().updateTabs();
  }, false);

  startMinuteInput.addEventListener('input', function(e) {
    chrome.extension.getBackgroundPage().updateLocalStorage('startMinute', e.target.value);
    // chrome.extension.getBackgroundPage().updateTabs();
  }, false);


  endMinuteInput.addEventListener('input', function(e) {
    chrome.extension.getBackgroundPage().updateLocalStorage('endMinute', e.target.value);
    // chrome.extension.getBackgroundPage().updateTabs();
  }, false);

  opacityInput.addEventListener('input', function(e) {
    chrome.extension.getBackgroundPage().updateLocalStorage('opacity', e.target.value);
    chrome.extension.getBackgroundPage().updateTabs();
  }, false);

  borderWidthInput.addEventListener('input', function(e) {
    chrome.extension.getBackgroundPage().updateLocalStorage('borderWidth', e.target.value);
    chrome.extension.getBackgroundPage().updateTabs();
  }, false);


});
