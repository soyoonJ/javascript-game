const $screen = document.getElementById("screen");
const $result = document.getElementById("result");

let maxRandomTime = 3000;
let minRandomTime = 1000;
let timeoutId = 0;
let startTime = 0;
let endTime = 0;
const responseTimes = [];

// TODO: remove, add 합치는거 시도해보기
const waitingToReady = () => {
  $screen.classList.remove("waiting");
  $screen.classList.add("ready");
  $screen.textContent = "초록색이 되면 클릭하세요";
};
const readyToWaiting = () => {
  $screen.classList.remove("ready");
  $screen.classList.add("waiting");
  $screen.textContent = "너무 성급하시군요! 클릭하여 다시 시작하세요";
};
const readyToNow = () => {
  startTime = new Date();
  $screen.classList.remove("ready");
  $screen.classList.add("now");
  $screen.textContent = "클릭하세요!";
};
const nowToWaiting = () => {
  $screen.classList.remove("now");
  $screen.classList.add("waiting");
  $screen.textContent = "클릭해서 시작하세요";
};

const setResponseResult = () => {
  endTime = new Date();

  const currentResponseTime = endTime - startTime;
  responseTimes.push(currentResponseTime); // TODO: recordTime으로 빼주는 방법도 있음 -> 좀 더 직관적으로!
  const averageResponseTime =
    responseTimes.reduce((acc, cur) => acc + cur, 0) / responseTimes.length;

  $result.textContent = `현재: ${currentResponseTime}ms, 평균: ${averageResponseTime}ms`;
};

$screen.addEventListener("click", () => {
  const isReady = $screen.classList.contains("waiting");
  const isReadyBeforeStart = $screen.classList.contains("ready");
  const isNow = $screen.classList.contains("now");

  if (isReady) {
    waitingToReady();
    timeoutId = setTimeout(
      readyToNow,
      Math.random() * (maxRandomTime - minRandomTime) + minRandomTime
    );
  } else if (isReadyBeforeStart) {
    clearTimeout(timeoutId);
    readyToWaiting();
  } else if (isNow) {
    setResponseResult();
    nowToWaiting();
  }
});
