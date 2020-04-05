<template>
    <section class="page-content">
        <div class="form-wrap">
            <h2>Enter the Lab Details</h2>

            <b-field label="Name" :label-position="labelPosition">
                <b-input></b-input>
            </b-field>

            <b-field label="Google Map Link" :label-position="labelPosition">
                <b-input></b-input>
            </b-field>

            <b-field label="Lab Id" :label-position="labelPosition">
                <b-input></b-input>
            </b-field>

            <b-field label="Lab Opetating Hours">
                <b-field grouped>
                    <b-select placeholder="Opening Time">
                        <option>6 AM</option>
                        <option>6 AM</option>
                        <option>6 AM</option>
                    </b-select>
                    <span class="label-to">to</span>
                    <b-select placeholder="Closing Time">
                        <option>5 PM</option>
                        <option>5 PM</option>
                        <option>5 PM</option>
                    </b-select>
                </b-field>
            </b-field>

            <b-field label="">
                <b-field grouped>
                    <b-select placeholder="Start day">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </b-select>
                    <span class="label-to">to</span>
                    <b-select placeholder="End Day">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </b-select>
                </b-field>
            </b-field>

            <hr />

            <h2>Your details</h2>

            <b-field label="Name" :label-position="labelPosition">
                <b-input></b-input>
            </b-field>

            <b-field label="Designation" :label-position="labelPosition">
                <b-input></b-input>
            </b-field>

            <b-button type="is-primary" expanded="true">Submit</b-button>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {}
};
</script>

<style lang="scss" scoped>
.label-to {
    margin-right: 10px;
    font-weight: 600;
    position: relative;
    top: 8px;
    font-size: 14px;
}
.button.is-primary {
    margin-top: 50px;
}
</style>
