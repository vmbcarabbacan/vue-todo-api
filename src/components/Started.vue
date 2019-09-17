<template>
    <v-dialog v-model="$store.state.startedDialog" persistent width="800">
        <v-card>
            <v-tabs v-model="tab" background-color="blue" fixed-tabs slider-color="blue darken-3">

                    <v-tab href='#signin'>
                        <div class="white--text text-none"> Sign in </div>
                    </v-tab>
                    <v-tab href='#register'>
                        <div class="white--text text-none"> Register </div>
                    </v-tab>
                </v-tabs>

                <v-card-text>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="signin">
                            <v-card flat>
                                        <v-form ref="form" @submit.prevent="login">
                                <v-container>
                                    <v-layout row>

                                            <v-flex xs12>
                                                <v-card-text>
                                                    <v-alert v-show="errors" :value="true" color="error" class="mb-5"> {{ errors }} </v-alert>
                                                    <v-text-field label="Email Address" v-model="credentials.email"></v-text-field>
                                                    <v-text-field label="Password" v-model="credentials.password" :append-icon="passw ? 'visibility' : 'visibility_off'" :type="passw ? 'text' : 'password'" @click:append="passw = !passw"></v-text-field>

                                                </v-card-text>
                                            </v-flex>

                                            <v-flex xs12>
                                                <v-card-actions>
                                                    <v-btn class="danger text-none" @click="close"> Close </v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn class="primary text-none" type="submit"> Signin </v-btn>
                                                </v-card-actions>
                                            </v-flex>
                                    </v-layout>
                                </v-container>
                                        </v-form>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="register">
                            <v-card flat>
                                <v-alert v-show="errorMessages" :value="true" color="error" v-for="error in errorMessages.errors" :key="error" class="mb-5"> {{ error[0] }} </v-alert>
                                        <v-form ref="form" v-model="valid">
                                <v-container>
                                    <v-layout row>
                                            <v-flex xs12 md6>
                                                <v-card-text>
                                                    <v-text-field label="First Name" v-model="credentials.first_name" :rules="[rules.required]">
                                                        
                                                    </v-text-field>
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-card-text>
                                                    <v-text-field label="Family Name" v-model="credentials.family_name" :rules="[rules.required]">
                                                       
                                                    </v-text-field>
                                                </v-card-text>
                                            </v-flex>
                                            
                                            <v-flex xs12 md6>
                                                <v-card-text>
                                                    <v-text-field label="Email" v-model="credentials.email" :rules="[rules.validEmail]">
                                                        
                                                    </v-text-field>
                                                </v-card-text>
                                            </v-flex>
                                            
                                            <v-flex xs12 md6>
                                                <v-card-text>
                                                    <v-text-field label="Password" v-model="credentials.password" :append-icon="passw ? 'visibility' : 'visibility_off'" :type="passw ? 'text' : 'password'" @click:append="passw = !passw" :rules="[rules.required, rules.min]">
                                                        
                                                    </v-text-field>
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex xs12 md6>
                                                <v-card-text>
                                                    <v-text-field label="Confirm Password" v-model="credentials.confirmPassword" :append-icon="confirmPassw ? 'visibility' : 'visibility_off'" :type="confirmPassw ? 'text' : 'password'" @click:append="confirmPassw = !confirmPassw" :rules="[rules.required, rules.min, rules.confirmPassword]">
                                                        
                                                    </v-text-field>
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex xs12>
                                                <v-card-actions>
                                                    <v-btn class="danger text-none" @click="close"> Close </v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn class="primary text-none" :disabled="!valid" @click="regist"> Register </v-btn>
                                                </v-card-actions>
                                            </v-flex>
                                    </v-layout>
                                </v-container>
                                        </v-form>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import  { fb } from '../firebase';
export default {
    name: 'Started',
    data() {
        return {
            passw: false,
            confirmPassw: false,
            valid: false,
            tab: 'signin',
            credentials: {
                first_name: '',
                family_name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                validEmail:  v => /.+@.+/.test(v) || 'Email address must be valid',
                confirmPassword: v => v === this.credentials.password || 'Password not match'
            },
            errorMessages: '',
            errors: ''
        }
    },
    methods: {
        close() {
            this.credentials = {
                first_name: '',
                family_name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
            this.$store.commit('startedDialogCommit', false)
        },
        login() {
            fb.auth().signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
            .then((result) => {
                alert('Welcome Back!')
                this.$store.commit('currentUser', result.user)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                alert(errorCode)
                });
            this.close()
        },
        regist() {
            fb.auth().createUserWithEmailAndPassword(this.credentials.email, this.credentials.password)
            .then(function(result) {
                alert('Thank you for registering')
               
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
            });
            this.close()
        }
    }

}
</script>