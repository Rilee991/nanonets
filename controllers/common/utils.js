const awsSendMessageHelper = (recipient, message) => {
    return { status: 200, msg: "Message sent successfully"};
}


const sendGridSendMessageHelper = (recipient, message) => {
    return { status: 200, msg: "Message sent successfully"};
}


module.exports = {
    awsSendMessageHelper,
    sendGridSendMessageHelper
};
