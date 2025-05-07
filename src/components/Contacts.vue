<template>
    <div id="contact">
        <div id="section-header">
            <h1>Contact Us</h1>
        </div>
        <div id="background">
            <img src="../assets/images/contact.png" alt="">
        </div>
        <Dialog>
            <DialogContent>
                <DialogDescription>
                    <p><font-awesome-icon :icon="icon" size="2x" :color="color" /></p>
                    <h5 class="my-4">{{ feedbackMessage }}</h5>
                </DialogDescription>
            </DialogContent>
        </Dialog>
        <div class="container">
            <form @submit.prevent="submitMessage">
                <div class="row">
                    <div class="col-md-6 col-sm-6 d-flex flex-column align-content-center flex-wrap">
                        <div class="d-flex flex-col my-3 w-3/4">
                            <Label for="Name" class="mb-1">Name</Label>
                            <Input
                            id="name-input"
                            type="text"
                            required
                            placeholder="Enter your Name"
                            v-model="form.name"
                            class="w-full"
                            ></Input>
                        </div>
                        <div class="d-flex flex-col my-3">
                            <Label for="Name" class="mb-1">Email</Label>
                            <Input
                            id="email-input"
                            type="email"
                            required
                            placeholder="Enter your Email address"
                            v-model="form.email"
                            ></Input>
                        </div>
                        <div class="d-flex flex-col my-3">
                            <Label for="Name" class="mb-1">Phone Number</Label>
                            <Input
                            id="phone_number-input"
                            type="text"
                            required
                            placeholder="Enter Your Phone Number"
                            v-model="form.phone_number"
                            ></Input>
                            <div class="error">{{ errors.phone }}</div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <Textarea
                        id="message"
                        rows="15"
                        max-rows="15"
                        required
                        v-model="form.message"
                        placeholder="Enter Your Message..."
                        class="my-4"
                        ></Textarea>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <Button :disabled="sending" type="submit" class="rounded bg-black" value="send-message" name="submit">Send Message</Button>
                </div>
            </form>
        </div>
        <span>Find us On:</span>
        <div id="social-media-links">
            <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" size="3x" /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" size="3x" /></a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Button } from '@/components/ui/button'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from 'reka-ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
const validatePhone = phone => {
  if (!phone.match(/^(?:254|\+254|0)?(7(?:(?:[12][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$/gm)) {
    return { valid: false, error: 'Enter a valid phone number.' };
  }

  return { valid: true, error: null };
}

export default {
    name: "Contact",
    components: {
        Button,
        Input,
        Textarea,
        Label,
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                phone_number: "",
                message: ""
            },
            icon: ['fa', 'check'],
            color: '',
            feedbackHeader: "",
            feedbackMessage: "",
            valid: true,
            sending: false,
            errors: {}
        }
    },
    methods: {
        submitMessage() {
            alert('New Message')
            console.log('message')
            this.errors = {}
            this.sending = true
            const validPhone = validatePhone(this.form.phone_number);
            this.errors.phone = validPhone.error;
            this.valid = validPhone.valid

            if (this.valid) {
                this.$store.dispatch('sendMessage', this.form).then(() => {
                    if(this.message){
                        this.form.name = ""
                        this.form.email = ""
                        this.form.phone_number = ""
                        this.form.message = ""
                        this.icon = ['fa', 'check']
                        this.color = '#008000'
                        this.feedbackMessage = "Thank you for your feedback."
                        this.showModal()
                        this.sending = false
                    } else {
                        this.icon = ['fa', 'times']
                        this.color = '#FF0000'
                        this.feedbackMessage = "Message not Sent. Please try again."
                        this.showModal()
                        this.sending = false
                    }
                })
            }
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
    },
    computed: {
        ...mapGetters([
            'message'
        ])
    }
}
</script>

<style scoped>
span {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-size: 18px;
}
#contact {
    position: relative;
}
#background {
    opacity: 0.4;
    margin-top: 10px;
    position: absolute;
}

#submit {
    width: 200px;
    margin-left: 450px;
}
.error {
    margin-top: 2px;
    border-radius: 2px;
    color: #FF0000;
    height: 5px;
}
#modal-center p{
    margin: 16px 10px 20px 50px;
    float: left;
}

#social-media-links {
    display: flex;
    justify-content: center;
}

#social-media-links > a {
    padding: 10px;
    text-decoration: none;
    color: #000;
    transition: .3s ease-in;
}

#social-media-links > a:hover {
    color: #fff;
    background-color: #000;
    border-radius: 3px;
}

@media (max-width: 1080px) {
    #submit {
        margin-left: 250px;
        width: 50%;
    }
}

@media (max-width: 980px) {
    #background img {
        width: 300px;
    }
    #submit {
        margin-left: 200px;
    }
    #social-media-links {
        padding-bottom: 20px;
    }
}

@media (max-width: 580px) {
    #submit {
        margin-left: 120px;
    }
}

@media (max-width: 480px) {
    #submit {
        margin-left: 0;
        width: 100%;
    }
}
</style>