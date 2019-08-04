import { startCluster } from 'egg';

startCluster(
    {
        port: 3000,
        workers: 1,
        baseDir: __dirname,
    },
    () => {
        console.log('web server started');
    }
);
