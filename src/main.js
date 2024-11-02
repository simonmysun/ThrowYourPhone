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
  const interval = e.interval > 1 ? e.interval / 1000 : e.interval;

  const a = Math.sqrt((xg * xg) + (yg * yg) + (zg * zg));
  pastTicksData.push(a);
  pastTicksAvg += (a - pastTicksData.shift(1)) / windowSize;

  if (throwing && pastTicksAvg < 3) {
    lastThrowTime += interval;
  }
  if (pastTicksAvg < 3) {
    if (!throwing) {
      throwing = true;
      document.body.className = 'animated';
    }
  } else {
    if (throwing) {
      if (lastThrowTime !== 0) {
        const newRecord = (lastThrowTime * lastThrowTime * 9.8 / 8).toFixed(2);
        $lastThrow.innerHTML = newRecord;
        if (lastThrowTime > bestThrowTime) {
          bestThrowTime = lastThrowTime;
          document.title = `New Record: ${newRecord}m`;
          $bestThrow.innerHTML = newRecord;
          $comment.innerHTML = `${newRecord}m (<b>New Record</b>)<br>${getComment(newRecord)}<br>` + $comment.innerHTML;
        } else {
          $comment.innerHTML = `${newRecord}m<br>${getComment(newRecord)}<br>` + $comment.innerHTML;
        }
      }
      lastThrowTime = 0;
      throwing = false;
      document.body.className = '';
    }
  }
  log(`g=${pastTicksAvg.toFixed(1)}, throwing=${throwing}, a=${a.toFixed(1)}, lastThrowTime=${lastThrowTime.toFixed(1)}, interval=${interval}`);
};

if (window.DeviceMotionEvent) {
  window.ondevicemotion = handleDeviceMotion;
} else {
  log('Device Motion not supported.');
}
