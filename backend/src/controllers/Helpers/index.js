exports.CreateRandomCode = (len) => {
    var code = ""
    for (var i = 0; i < len; i++) {
        code = code + Math.floor(Math.random() * 10)
    }
    return code
}

exports.SendSms = (message, mobile) => {
    if (this.CheckIsNumber(mobile)) {
        //send sms
    }
}
exports.SendEmail = (message, email) => {
    if (this.ValidateEmail(email)) {
        //send email
    }
}

exports.CheckIsNumber = (num) => {
    var pattern = new RegExp("^[0-9]{" + num.length + "}$")
    return (pattern.test(num) && num.length > 0)
}
exports.ValidateEmail = (email) => {
    return !(
        !email ||
        (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,30}$/i.test(email))
    )
}

