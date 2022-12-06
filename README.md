# Server Side Rendering

## Steps to Benchmark

1. Run `yarn build` to build the NextJS app.
2. Run `yarn start -p 3000` to start serving the NextJS app.
3. Run benchmark `node benchmark.js localhost:3000 <number-of-times>`. The benchmark runs will get saved in `./benchmarkOutput`.
