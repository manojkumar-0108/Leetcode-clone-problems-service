const { StatusCodes } = require('http-status-codes');

function pingCheck(req, res, next) {
    try {
        return res
            .status(StatusCodes.OK)
            .json({
                success: true,
                message: "Server is live",
                error: [],
                data: []
            });
    } catch (error) {
        next(error);
    }

}

module.exports = pingCheck;