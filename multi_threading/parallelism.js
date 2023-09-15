const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function calculateParallel(funcFileName, number) {
    return new Promise((resolve) => {
        const worker = new Worker(funcFileName, { workerData: { number } });
        worker.on('message', (message) => {
            resolve(message.result);
        });
    });
}

async function calculate() {
    const numbers = [1, 2, 3, 4, 5];
    console.log("Starting calculations...");

    const startTimestamp = new Date().getTime();
    
    const squarePromises = numbers.map((number) => calculateParallel('./squareWorker.js', number));
    const cubePromises = numbers.map((number) => calculateParallel('./cubeWorker.js', number));

    const squareResults = await Promise.all(squarePromises);
    const cubeResults = await Promise.all(cubePromises);

    console.log('Numbers:', numbers);
    console.log('Square Results:', squareResults);
    console.log('Cube Results:', cubeResults);
}

calculate();
