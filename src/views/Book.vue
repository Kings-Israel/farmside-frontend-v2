<template>
  <div id="book">
    <div id="section-header">
      <h1 id="book">Book a shoot</h1>
    </div>

    <!-- <b-modal hide-footer ref="my-modal" id="modal-center" centered>
      <p><font-awesome-icon :icon="icon" size="2x" :color="color" /></p>
      <h5 class="my-4">{{ feedbackMessage }}</h5>
    </b-modal> -->
    <div class="container min-h-[70.9vh]">
      <form id="book-form" @submit.prevent="book">
        <div class="row">
          <div class="col-sm-6 col-md-6">
            <!-- Client name -->
            <Label class="mb-1" for="Name">Name</Label>
            <Input
              id="name-input"
              type="text"
              required
              placeholder="Enter your Name"
              v-model="form.name"
            ></Input>

            <!-- Client email address -->
            <Label class="mb-1" for="Email">Email</Label>
            <Input
              id="email-input"
              type="email"
              required
              placeholder="Enter your Email address"
              v-model="form.email"
            ></Input>

            <!-- Client Phone Number -->
            <Label class="mb-1" for="Phone Number">Phone Number</Label>
            <Input
              id="phone_number-input"
              type="text"
              required
              placeholder="Enter Your Phone Number"
              v-model="form.phone_number"
            ></Input>
            <div class="error">{{ errors.phone }}</div>

            <!-- Event Date -->
            <div class="flex flex-col">
              <Label for="Event Date" class="mb-1">Event Date</Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !form.event_date && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      form.event_date
                        ? df.format(form.event_date.toDate(getLocalTimeZone()))
                        : "Pick a date"
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar initial-focus />
                </PopoverContent>
              </Popover>
            </div>

            <!-- Client Location -->
            <div class="flex flex-col w-full">
              <Label class="mb-1" for="Location">Location</Label>
              <Select required v-model="form.location" class="w-full">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup v-for="{ value, text } in locations" :key="text">
                    <SelectItem :value="value">
                      {{ text }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Select event type -->
            <Label class="mb-1" for="Location">Event Type</Label>
            <RadioGroup
              class="flex flex-wrap lg:flex-nowrap w-full justify-between"
            >
              <div class="flex items-center lg:space-x-2">
                <RadioGroupItem
                  v-model="form.event_type"
                  value="Photo Shoot"
                  class="border-3 p-2.5"
                />
                <Label class="mx-2" for="Photo Shoot">Photo Shoot</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem
                  v-model="form.event_type"
                  value="Video Shoot"
                  class="border-3 p-2.5"
                />
                <Label class="mx-2" for="Video Shoot">Video Shoot</Label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem
                  v-model="form.event_type"
                  value="Photo and Video"
                  class="border-3 p-2.5"
                />
                <Label class="mx-2" for="Video Shoot">Photo and Video</Label>
              </div>
            </RadioGroup>
          </div>

          <div class="col-sm-6 col-md-6">
            <!-- Event/Shoot duration -->
            <Label class="mb-1" for="Location">Duration</Label>
            <Select
              id="location-select"
              required
              v-model="form.event_duration"
              class="w-full flex"
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="{ value, text } in duration" :key="text">
                  <SelectItem :value="value">
                    {{ text }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- Photoshoot Event selection -->
            <div v-if="form.event_type == 'Photo Shoot'">
              <Label class="mb-1" for="Photo Shoot">Photo Shoot</Label>
              <Select v-model="form.event_details.event" class="w-full flex">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Photo Shoot Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                    v-for="{ text } in photoshoot_events"
                    :key="text"
                  >
                    <SelectLabel>{{ text }}</SelectLabel>
                    <SelectItem :value="text">
                      {{ text }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Video shoot event selection -->
            <div v-if="form.event_type == 'Video Shoot'">
              <Label class="mb-1" for="Location">Video Shoot</Label>
              <Select v-model="form.event_details.event" class="w-full flex">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Shoot Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                    v-for="{ text } in videoshoot_events"
                    :key="text"
                  >
                    <SelectLabel>{{ text }}</SelectLabel>
                    <SelectItem :value="text">
                      {{ text }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <!-- Number of people input -->
            <Label class="mb-1" for="Number of People">Number of People</Label>
            <Input
              id="numberofpeople"
              type="number"
              no-wheel
              min="1"
              placeholder="Enter The Number of people expected"
              v-model="form.event_details.number_of_people"
            ></Input>

            <!-- Change of outfit selection -->
            <div
              v-if="
                form.event_type == 'Photo Shoot' &&
                (form.event_details.event == 'Studio Shoot' ||
                  form.event_details.event == 'Outdoor Shoot')
              "
            >
              <Label class="mb-1" for="Change of Outfit"
                >Change of outfit</Label
              >
              <RadioGroup>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem
                    v-model="form.event_details.outfit_change"
                    value="Yes"
                  />
                  <Label class="" for="Yes">Yes</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem
                    v-model="form.event_details.outfit_change"
                    value="No"
                  />
                  <Label class="" for="No">No</Label>
                </div>
              </RadioGroup>
            </div>

            <!-- Number of outfit changes -->
            <div
              v-if="
                form.event_type == 'Photo Shoot' &&
                (form.event_details.event == 'Studio Shoot' ||
                  form.event_details.event == 'Outdoor Shoot') &&
                form.event_details.outfit_change == 'Yes'
              "
            >
              <Label class="mb-1" for="Outfit Changes"
                >Number of Outfit Changes</Label
              >
              <Input
                id="outfit-changes-input"
                type="number"
                min="1"
                no-wheel
                placeholder="Please Enter Number of Changes"
                v-model="form.event_details.number_of_outfit_changes"
              ></Input>
            </div>

            <!-- Photoshoot descritpion textarea -->
            <Label class="mb-1" for="Description">Description</Label>
            <Textarea
              id="message"
              rows="4"
              max-rows="10"
              v-model="form.event_details.description"
              placeholder="Enter Photoshoot Description..."
            >
            </Textarea>

            <!-- Video shoot description area -->
            <div
              v-if="
                form.event_type == 'Video Shoot' ||
                form.event_type == 'Photo and Video'
              "
            >
              <Label class="mb-1" for="Video Shoot Description"
                >Enter a Video description</Label
              >
              <Textarea
                id="message"
                required
                rows="10"
                max-rows="15"
                v-model="form.event_details.description"
                placeholder="Enter Video Description..."
              >
              </Textarea>
            </div>
          </div>
        </div>
        <div class="submit-button my-4">
          <Button
            type="submit"
            :disabled="sending"
            class="w-50 hover:text-white"
            id="submit-button"
            :variant="sending ? 'ghost' : 'secondary'"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
    <bottom-page />
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { ref, computed } from "vue";
import BottomPage from "../components/BottomPage.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "reka-ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";

const validatePhone = (phone: string) => {
  if (
    !phone.match(
      /^(?:254|\+254|0)?(7(?:(?:[12][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$/gm
    )
  ) {
    return { valid: false, error: "Please, enter a valid phone number." };
  }

  return { valid: true, error: null };
};

// const now = new Date();
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

// const minDate = new Date(today);

interface BookingForm {
  name: string;
  email: string;
  phone_number: string;
  location: string;
  event_date: DateValue | null;
  event_type: string;
  event_duration: string;
  event_details: {
    event: string;
    number_of_people: string;
    outfit_change: string;
    number_of_outfit_changes: string;
    description: string;
  };
}

const sending = ref<boolean>(false);
// const message = ref<string>("");
// const show = ref<boolean>(false);
// const min = ref<Date>(minDate);
const valid = ref<boolean>(true);
const errors = ref<any>({});
const icon = ref(["fa", "check"]);
const color = ref<string>("");
// const feedbackHeader = ref<string>("");
const feedbackMessage = ref<string>("");
const form = ref<BookingForm>({
  name: "",
  email: "",
  phone_number: "",
  location: "",
  event_date: null,
  event_type: "",
  event_duration: "",
  event_details: {
    event: "",
    number_of_people: "",
    outfit_change: "",
    number_of_outfit_changes: "",
    description: "",
  },
});
const locations = ref([
  { value: null, text: "Please select your county" },
  { value: "Nairobi", text: "Nairobi" },
  { value: "Machakos", text: "Machakos" },
  { value: "Kiambu", text: "Kiambu" },
  { value: "Kajiado", text: "Kajiado" },
  { value: "Nakuru", text: "Nakuru" },
]);
const duration = [
  { value: null, text: "Please select the duration of the event/shoot" },
  { value: "Less than 1 hour", text: "Less than 1 hour" },
  { value: "1-2 hours", text: "1-2 hours" },
  { value: "2-3 hours", text: "2-3 hours" },
  { value: "3-4 hours", text: "3-4 hours" },
  { value: "4-5 hours", text: "4-5 hours" },
  { value: "5-6 hours", text: "5-6 hours" },
  { value: "6-12 hours", text: "6-12 hours" },
  { value: "Over 12 hours", text: "Over 12 hours" },
];
const photoshoot_events = [
  { value: null, text: "Please select event" },
  { value: "Studio Shoot", text: "Studio Shoot" },
  { value: "Outdoor Shoot", text: "Outdoor Shoot" },
  { value: "Birthday", text: "Birthday" },
  { value: "Graduation", text: "Graduation" },
  { value: "Funeral", text: "Funeral" },
  { vlaue: "Baby Shower", text: "Baby Shower" },
  { value: "Dowry payment", text: "Dowry Payment" },
  { value: "Other", text: "Other" },
];
const videoshoot_events = [
  { value: null, text: "Please select event" },
  { value: "Birthday", text: "Birthday" },
  { value: "Graduation", text: "Graduation" },
  { value: "Funeral", text: "Funeral" },
  { value: "Tours and Travel", text: "Tours and Travel" },
  { value: "Music Video", text: "Music Video" },
  { value: "Vlog", text: "Vlog" },
  { vlaue: "Advertisement", text: "Advertisement" },
  { value: "Drone Shots", text: "Drone Shots" },
  { value: "Other", text: "Other" },
];

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const booking = ref<boolean>(false);

const showModal = () => {
  // this.$refs["my-modal"].show();
};
// const hideModal = () => {
//   // this.$refs["my-modal"].hide();
// };

function book() {
  sending.value = true;
  errors.value = {};
  const validPhone = validatePhone(form.value.phone_number);
  errors.value.phone = validPhone.error;
  valid.value = validPhone.valid;

  if (valid.value) {
    store.dispatch("sendBooking", form.value).then(() => {
      if (booking.value) {
        form.value.name = "";
        form.value.email = "";
        form.value.phone_number = "";
        form.value.event_date = null;
        form.value.location = "";
        form.value.event_duration = "";
        form.value.event_type = "";
        form.value.event_details.event = "";
        form.value.event_details.number_of_people = "";
        form.value.event_details.outfit_change = "";
        form.value.event_details.number_of_outfit_changes = "";
        form.value.event_details.description = "";
        feedbackMessage.value =
          "Booking submitted successfully. We'll get back to you soon.";
        icon.value = ["fa", "check"];
        color.value = "#008000";
        showModal();
        sending.value = false;
      } else {
        icon.value = ["fa", "times"];
        color.value = "#FF0000";
        feedbackMessage.value = "Error Submitting. Please try again";
        showModal();
        sending.value = false;
      }
    });
  }
}

computed(() => {
  store.getters.booking;
});
</script>

<style scoped>
#book-form {
  position: relative;
  margin-bottom: 40px;
}
.submit-button {
  display: flex;
  justify-content: center;
}
#submit-button {
  display: flex;
  justify-content: center;
}
.error {
  color: rgb(255, 0, 0);
  font-size: 15px;
}
</style>
