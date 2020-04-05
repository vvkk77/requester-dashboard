import app from '../main';

export default {
    requestOtp(phoneNumber) {
        return app.axios({
            url: '/requestOtp',
            data: {
                phoneNumber: phoneNumber
            }
        });
    }
};
