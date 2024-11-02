import './styles.css';
import getComment from './comment';

const dataDiv = document.getElementById('data');

const log = (message) => {
  dataDiv.innerHTML = message;
};

const pastTicksData = [10, 10];
let pastTicksAvg = 10;

const $lastThrow = document.getElementById('lastThrow');
const $bestThrow = document.getElementById('bestThrow');
const $comment = document.getElementById('comment');
let throwing = false;
let lastThrowTime = 0;
let bestThrowTime = 0;
const windowSize = 2;

const handleDeviceMotion = (e) => {
  const xg = e.accelerationIncludingGravity.x;
  if (xg === null) {
    alert('Device not supported: no acceleration sensor found');
    $comment.innerHTML = '<b>Device not supported: no acceleration sensor found</b>';
    window.ondevicemotion = null;
    return;
  }
  const yg = e.accelerationIncludingGravity.y;
  const zg = e.accelerationIncludingGravity.z;

  const a = Math.sqrt((xg * xg) + (yg * yg) + (zg * zg));
  pastTicksData.push(a);
  pastTicksAvg += (a - pastTicksData.shift(1)) / windowSize;

  if (pastTicksAvg < 3) {
    if (!throwing) {
      throwing = true;
      document.body.className = 'animated';
      lastThrowTime = performance.now();
    }
  } else {
    if (throwing) {
      interval = (performance.now() - lastThrowTime) / 1000;
      const newRecord = (interval * interval * 9.8 / 8).toFixed(2);
      $lastThrow.innerHTML = newRecord;
      if (interval > bestThrowTime) {
        bestThrowTime = interval;
        document.title = `New Record: ${newRecord}m`;
        $bestThrow.innerHTML = newRecord;
        $comment.innerHTML = `${newRecord}m (<b>New Record</b>)<br>${getComment(newRecord)}<br>` + $comment.innerHTML;
      } else {
        $comment.innerHTML = `${newRecord}m<br>${getComment(newRecord)}<br>` + $comment.innerHTML;
      }
      throwing = false;
      document.body.className = '';
    }
  }
  log(`g=${pastTicksAvg.toFixed(1)}m/s^2`);
};

log(`g=${pastTicksAvg.toFixed(1)}m/s^2`);
if (window.DeviceMotionEvent) {
  window.ondevicemotion = handleDeviceMotion;
} else {
  alert('Device not supported: no acceleration sensor found');
  $comment.innerHTML = '<b>Device not supported: no acceleration sensor found</b>';
  window.ondevicemotion = null;
}
