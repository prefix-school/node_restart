const express = require('express');
const {exec} = require('child_process');

const app = express();

app.use(
    express.json({
        verify: (req, res, buffer) => {
            req.rawBody = buffer;
        },
    }),
);

app.get('/restart', (req, res) => {
    exec('pm2 restart all', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err);
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });

    res.send(`stdout: ${stdout} | stderr: ${stderr}`)
});

app.listen(3001, () => console.log('Node.js server started on port 3001.'));
