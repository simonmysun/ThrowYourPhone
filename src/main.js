import './styles.css';
import getComment from './comment';

const dataDiv = document.getElementById('data');

const log = (message) => {
  dataDiv.innerHTML = message;
};
log(`g=0m/s^2`);

const pastTicksData = [9.8, 9.8];
let pastTicksAvg = 9.8;

const $lastThrow = document.getElementById('lastThrow');
const $bestThrow = document.getElementById('bestThrow');
const $comment = document.getElementById('comment');
const $requestPermission = document.getElementById('request-permission');
let throwing = false;
let lastThrowTime = 0;
let bestThrowTime = 0;
const windowSize = 2; // increase to smooth out the data and reduce sensitivity

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

if (DeviceOrientationEvent && typeof (DeviceOrientationEvent.requestPermission) === "function") {
  $requestPermission.onclick = async () => {
    const permissionState = await DeviceOrientationEvent.requestPermission();
    if (permissionState === "granted") {
      $requestPermission.style.display = 'none';
    } else {
      alert('Permission denied. Please quit and restart your browser to see the prompt again.');
      $comment.innerHTML = '<b>Permission denied. Please quit and restart your browser to see the prompt again.</b>';
    }
  }
} else {
  $requestPermission.style.display = 'none';
}

if (window.DeviceMotionEvent) {
  window.ondevicemotion = handleDeviceMotion;
} else {
  alert('Device not supported: no acceleration sensor found');
  $comment.innerHTML = '<b>Device not supported: no acceleration sensor found</b>';
  window.ondevicemotion = null;
}
