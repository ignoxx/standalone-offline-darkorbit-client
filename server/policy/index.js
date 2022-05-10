const { createServer } = require('net');

const POLICY_REQUEST_HEADER = '<policy-file-request/>\0';
const POLICY_RESPONSE = "<?xml version=\"1.0\"?><cross-domain-policy><allow-access-from domain=\"127.0.0.1\" to-ports=\"*\" secure=\"false\" /><site-control permitted-cross-domain-policies=\"all\" /></cross-domain-policy>\0";


const policyServer = createServer((socket) => {
    socket.setEncoding('utf8');

    function onData(data) {
        console.log("policyServer on data: " + data)

        if (data == POLICY_REQUEST_HEADER)
            socket.write(POLICY_RESPONSE);
    }

    socket.on('data', onData);

    socket.on('error', function (err) {
        if (socket && socket.end) {
            socket.end();
            socket.destroy();
        }
    });

    socket.on('end', function () {
        socket.end();
    });
})


module.exports = policyServer