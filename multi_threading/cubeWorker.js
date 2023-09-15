const { parentPort, workerData } = require('worker_threads');

function calculateCube(number) {
    return number * number * number;
}

const cubeResult = calculateCube(workerData.number);
parentPort.postMessage({ result: cubeResult });
