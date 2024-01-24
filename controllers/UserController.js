const provierHelper = require("./common/utils");

const providerMap = {
    "aws": 0,
    "sendGrid": 0
}

const sendMessage = (req, res) => {
    try {
        const { email = "", message = "" } = req.body;

        if(!email) throw new Error("No email provided");

        const resp = provierHelper.awsSendMessageHelper(email, message);

        if(resp.status != 200)
            throw new Error(resp.msg);

        return res.status(200).json({ msg: "Success" });
    } catch(err) {
        console.log(err);
        return res.status(401).json({ msg: "Failure" });
    }
}

const sendMessagesInBatch = (req, res) => {
    try {
        const { payload = [] } = req.body;

        if(payload.length === 0) throw new Error("No data provided");

        const erroredEmails = [];

        for(let idx=0;idx<payload.length;idx++) {
            const { email = "", message = "" } = payload[idx];

            if(!email) {
                erroredEmails.push({ idx, email });
                continue;
            }

            let provider = "";
            const proviers = Object.keys(providerMap);

            for(const pvd of proviers) {
                if(!provider || (providerMap[provider] > providerMap[pvd]))
                    provider = pvd;
            }

            providerMap[provider]++;
            console.log(provider);
            let resp = {};

            if(provider === "aws")
                resp = provierHelper.awsSendMessageHelper(email, message);
            else if(provider === "sendGrid")
                resp = provierHelper.sendGridSendMessageHelper(email, message);
            
            if(resp.status !== 200) {
                erroredEmails.push({ idx, email });
            }

            console.log(providerMap);
        }

        return res.status(200).json({ msg: { erroredEmails } });
    } catch(err) {
        console.log(err);
        return res.status(401).json({ msg: "Failure" });
    }
}

module.exports = {
    sendMessage,
    sendMessagesInBatch
};

// Array of [{email,msg}]