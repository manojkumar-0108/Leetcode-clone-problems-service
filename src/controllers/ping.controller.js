const { StatusCodes } = require('http-status-codes');

function pingCheck(req, res) {
    return res
        .status(StatusCodes.OK)
        .json({
            success: true,
            message: "Server is live",
            error: [],
            data: []
        });
}

module.exports = pingCheck;