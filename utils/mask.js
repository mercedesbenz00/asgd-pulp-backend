exports.applyMask = (ktp) => {
    if(!ktp)
        return "";

    ktp = ktp.substring(0, ktp.length - 4).replace(/\d/g,"*") + ktp.substring(ktp.length - 4, ktp.length);
    return ktp;
};