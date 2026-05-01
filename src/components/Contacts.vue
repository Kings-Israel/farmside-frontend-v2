<template>
  <section id="contact" class="contact">
    <Dialog>
      <DialogContent>
        <DialogDescription>
          <p><font-awesome-icon :icon="icon" size="2x" :color="color" /></p>
          <h5 class="my-4">{{ feedbackMessage }}</h5>
        </DialogDescription>
      </DialogContent>
    </Dialog>

    <div class="section-shell contact__grid">
      <div class="contact__intro">
        <p class="section-kicker">Start a project</p>
        <h2>Tell us what you are planning.</h2>
        <p>
          Share a date, location and the kind of coverage you need. Farmside can
          help shape the right photo or video package for your shoot.
        </p>
        <div class="contact__methods">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" size="2x" />
          </a>
          <a href="https://www.youtube.com/" aria-label="YouTube">
            <font-awesome-icon :icon="['fab', 'youtube']" size="2x" />
          </a>
        </div>
      </div>

      <form class="contact__form" @submit.prevent="submitMessage">
        <div class="form-row">
          <div>
            <Label for="name-input">Name</Label>
            <Input
              id="name-input"
              type="text"
              required
              placeholder="Your name"
              v-model="form.name"
            />
          </div>
          <div>
            <Label for="email-input">Email</Label>
            <Input
              id="email-input"
              type="email"
              required
              placeholder="you@example.com"
              v-model="form.email"
            />
          </div>
        </div>
        <div>
          <Label for="phone_number-input">Phone Number</Label>
          <Input
            id="phone_number-input"
            type="text"
            required
            placeholder="0712 345 678"
            v-model="form.phone_number"
          />
          <p class="error">{{ errors.phone }}</p>
        </div>
        <div>
          <Label for="message">Message</Label>
          <Textarea
            id="message"
            rows="8"
            required
            v-model="form.message"
            placeholder="Tell us about the shoot, date, location and deliverables."
          />
        </div>
        <Button :disabled="sending" type="submit" class="contact__submit">
          Send Message
        </Button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

const form = ref({
  name: "",
  email: "",
  phone_number: "",
  message: "",
});
const icon = ref(["fa", "check"]);
const color = ref<string>("");
const feedbackMessage = ref<string>("");
const valid = ref<boolean>(true);
const sending = ref<boolean>(false);
const errors = ref<any>({});

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

  if (valid.value) {
    feedbackMessage.value = "Thank you. We will get back to you soon.";
    icon.value = ["fa", "check"];
    color.value = "#2fb85e";
  }

  sending.value = false;
};
</script>

<style scoped>
.contact {
  background: #101412;
  color: #ffffff;
  padding: 96px 0;
}

.section-shell {
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
}

.contact__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
}

.section-kicker {
  color: #9fe6b3;
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  margin-bottom: 14px;
  text-transform: uppercase;
}

h2 {
  font-size: clamp(2rem, 4vw, 3.7rem);
  font-weight: 900;
  line-height: 1;
  margin: 0 0 22px;
}

.contact__intro > p:not(.section-kicker) {
  color: rgba(255, 255, 255, 0.74);
  font-size: 1.2rem;
  line-height: 1.8;
}

.contact__methods {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}

.contact__methods a {
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  color: #ffffff;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  text-decoration: none;
  width: 48px;
}

.contact__form {
  background: #ffffff;
  border-radius: 8px;
  color: #101412;
  display: grid;
  gap: 18px;
  padding: 28px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  color: #344039;
  display: block;
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 8px;
}

.error {
  color: #c62828;
  font-size: 0.96rem;
  min-height: 20px;
  margin: 4px 0 0;
}

.contact__submit {
  background: #2fb85e;
  border-radius: 6px;
  color: #061008;
  font-weight: 900;
  min-height: 48px;
}

@media (max-width: 860px) {
  .contact__grid,
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
