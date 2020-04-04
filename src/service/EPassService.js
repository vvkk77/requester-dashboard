import app from '../main';

export default {
    signIn(email, password) {
        return app.$axios.post('/signin', {
            email,
            password,
            accountType: 'user'
        });
    },

    createAccount({ name, email, password, orgID, orgName }) {
        return app.$axios.post('/createAccount', {
            name,
            email,
            password,
            orgID,
            orgName
        });
    },

    verifyOTP({ emailId, otp }) {
        return app.$axios.post('/verifyOTP', {
            identifier: emailId,
            accountIdentifierType: 'email',
            otp
        });
    },

    requestOTP(emailId) {
        return app.$axios.post('/requestOTP', {
            identifier: emailId,
            accountIdentifierType: 'email'
        });
    },

    updatePassword({ email, password, authToken }) {
        return app.$axios.post('/updatePassword', {
            email,
            password,
            authToken
        });
    },

    createOrder() {
        // return app.$axios.post('/createOrder', formData, { headers: fileHeaders });
    },

    downloadQRCodes(orderID) {
        return app.$axios.post('/downloadQRCodes', {
            orderID
            // authToken: getAuthToken()
        });
    },

    getOrders() {
        return app.$axios.post('/getOrders', {
            // accountID: get('accountID'),
            // authToken: getAuthToken()
        });
    },

    getOrganization() {
        return app.$axios.post('/getOrganization', {
            // authToken: getAuthToken()
        });
    }
};
