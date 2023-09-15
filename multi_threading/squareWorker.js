const { parentPort, workerData } = require('worker_threads');

function calculateSquare(number) {
    return number * number;
}

const squareResult = calculateSquare(workerData.number);
parentPort.postMessage({ result: squareResult });
