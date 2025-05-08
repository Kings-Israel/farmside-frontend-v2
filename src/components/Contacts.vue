<template>
  <div id="contact">
    <div id="section-header">
      <h1>Contact Us</h1>
    </div>
    <div id="background">
      <img src="../assets/images/contact.png" alt="" />
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
          <div
            class="col-md-6 col-sm-6 d-flex flex-column align-content-center flex-wrap"
          >
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
          <Button
            :disabled="sending"
            type="submit"
            class="rounded bg-black"
            value="send-message"
            name="submit"
            >Send Message</Button
          >
        </div>
      </form>
    </div>
    <span>Find us On:</span>
    <div id="social-media-links">
      <a href="#"
        ><font-awesome-icon :icon="['fab', 'instagram']" size="3x"
      /></a>
      <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" size="3x" /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { mapGetters } from 'vuex';
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "reka-ui";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const form = ref({
  name: "",
  email: "",
  phone_number: "",
  message: "",
});
const icon = ref(["fa", "check"]);
const color = ref<string>("");
// const feedbackHeader = ref<string>("");
const feedbackMessage = ref<string>("");
const valid = ref<boolean>(true);
const sending = ref<boolean>(false);
const errors = ref({});

const validatePhone = (phone: string) => {
  if (
    !phone.match(
      /^(?:254|\+254|0)?(7(?:(?:[12][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$/gm
    )
  ) {
    return { valid: false, error: "Enter a valid phone number." };
  }

  return { valid: true, error: null };
};

const submitMessage = () => {
  errors.value = {};
  sending.value = true;
  const validPhone = validatePhone(form.value.phone_number);
  errors.value.phone = validPhone.error;
  valid.value = validPhone.valid;

  if (valid) {
    // $store.dispatch('sendMessage', form).then(() => {
    //     if(message){
    //         form.value.name = ""
    //         form.value.email = ""
    //         form.value.phone_number = ""
    //         form.value.message = ""
    //         icon.value = ['fa', 'check']
    //         color.value = '#008000'
    //         feedbackMessage.value = "Thank you for your feedback."
    //         showModal()
    //         sending.value = false
    //     } else {
    //         icon.value = ['fa', 'times']
    //         color.value = '#FF0000'
    //         feedbackMessage.value = "Message not Sent. Please try again."
    //         showModal()
    //         sending.value = false
    //     }
    // })
  }
};
const showModal = () => {
  // this.$refs['my-modal'].show()
};
const hideModal = () => {
  // this.$refs['my-modal'].hide()
};
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
  color: #ff0000;
  height: 5px;
}
#modal-center p {
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
  transition: 0.3s ease-in;
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
