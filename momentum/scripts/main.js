export function main() {

  const getDate = _ => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  }
  const getTimeOfDay = _ => {
    const hours = new Date().getHours();
    if (hours < 6) return 'night';
    else if (hours < 12) return 'morning';
    else if (hours < 18) return 'afternoon';
    else return 'evening';
  }
  currTime.textContent = new Date().toLocaleTimeString();
  currDate.textContent = getDate();
  greeting.textContent = `Good ${getTimeOfDay()},`;
  
  setTimeout(function timeMonitor() {
    currTime.textContent = new Date().toLocaleTimeString();

    if (currDate.textContent !== getDate()) currDate.textContent = getDate();
    
    if (greeting.textContent !== `Good ${getTimeOfDay()},`) {
      greeting.textContent = `Good ${getTimeOfDay()},`;
    }
    setTimeout(timeMonitor, 1000);
  }, 1000);
  
  if (localStorage.userName) userName.value = localStorage.getItem('userName') + '!';

  userName.oninput = _ => {
    if (userName.value.length > 7) userName.size = userName.value.length;
    else userName.size = 7;
    localStorage.setItem('userName', userName.value);
  }
  userName.onchange = _ => userName.value ? userName.value += '!' : '';
}