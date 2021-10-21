const getDate = _ => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
}
const timeMonitor = _ => {
  currTime.textContent = new Date().toLocaleTimeString('en-GB');
  if (currDate.textContent !== getDate()) currDate.textContent = getDate();
  if (greeting.textContent !== `Good ${getTimeOfDay()},`) {
    greeting.textContent = `Good ${getTimeOfDay()},`;
  }
  setTimeout(timeMonitor, 1000);
};
timeMonitor();

if (localStorage.userName) userName.value = localStorage.getItem('userName') + '!';

userName.oninput = _ => {
  if (userName.value.length > 7) userName.size = userName.value.length;
  else userName.size = 7;
  localStorage.setItem('userName', userName.value);
}
userName.onchange = _ => userName.value ? userName.value += '!' : '';