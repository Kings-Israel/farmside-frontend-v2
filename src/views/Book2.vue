<script setup lang="ts">
import { computed, ref } from "vue";
import { CalendarDays, Camera, MapPin, Sparkles, Video } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { http } from "@/lib/axios";
import { useNotification } from "@kyvg/vue3-notification";
import BottomPage from "../components/BottomPage.vue";

interface BookingForm {
  event_brief: string;
  event_name: string;
  email: string;
  phone_number: string;
  location: string;
  event_date: string;
  event_type: string;
  event_duration: string;
  event: string;
  number_of_people: string;
  outfit_change: string;
  number_of_outfit_changes: string;
  description: string;
}

const { notify } = useNotification();
const sending = ref(false);
const analyzing = ref(false);
const agentFeedback = ref("");
const errors = ref<Record<string, string>>({});

const form = ref<BookingForm>({
  event_brief: "",
  event_name: "",
  email: "",
  phone_number: "",
  location: "",
  event_date: "",
  event_type: "",
  event_duration: "",
  event: "",
  number_of_people: "",
  outfit_change: "",
  number_of_outfit_changes: "",
  description: "",
});

const duration = [
  "Less than 1 hour",
  "1-2 hours",
  "2-3 hours",
  "3-4 hours",
  "4-5 hours",
  "5-6 hours",
  "6-12 hours",
  "Over 12 hours",
];

const photoshootEvents = [
  "Portrait", "Fashion", "Product", "Event", "Other"
];

const videoshootEvents = [
  "Commercial", "Music Video", "Documentary", "Event", "Other"
];

const shootOptions = computed(() => {
  if (form.value.event_type === "Video Shoot") return videoshootEvents;
  if (form.value.event_type === "Photo and Video Shoot") {
    return [...new Set([...photoshootEvents, ...videoshootEvents])];
  }
  return photoshootEvents;
});

const showOutfitFields = computed(
  () =>
    form.value.event_type === "Photo Shoot" &&
    ["Studio Shoot", "Outdoor Shoot"].includes(form.value.event)
);

const minDate = computed(() => new Date().toISOString().slice(0, 10));

const validatePhone = (phone: string) => {
  return /^(?:254|\+254|0)?(7(?:(?:[12][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$/gm.test(
    phone
  );
};

const resetForm = () => {
  form.value = {
    event_brief: "",
    event_name: "",
    email: "",
    phone_number: "",
    location: "",
    event_date: "",
    event_type: "",
    event_duration: "",
    event: "",
    number_of_people: "",
    outfit_change: "",
    number_of_outfit_changes: "",
    description: "",
  };
};

const applyIfPresent = (key: keyof BookingForm, value: unknown) => {
  if (typeof value === "string" && value.trim()) {
    form.value[key] = value.trim();
  }
};

const applyAgentSuggestion = (suggestion: any) => {
  const details = suggestion.event_details || {};

  applyIfPresent("event_name", suggestion.event_name || suggestion.name);
  // applyIfPresent("email", suggestion.email);
  // applyIfPresent("phone_number", suggestion.phone_number || suggestion.phone);
  applyIfPresent("location", suggestion.location);
  applyIfPresent("event_date", suggestion.event_date);
  applyIfPresent("event_type", suggestion.event_type);
  applyIfPresent("event_duration", suggestion.event_duration || suggestion.duration);
  applyIfPresent("event", suggestion.event || details.event);
  applyIfPresent(
    "number_of_people",
    String(suggestion.number_of_people || details.number_of_people || "")
  );
  applyIfPresent("outfit_change", suggestion.outfit_change || details.outfit_change);
  applyIfPresent(
    "number_of_outfit_changes",
    String(
      suggestion.number_of_outfit_changes ||
        details.number_of_outfit_changes ||
        ""
    )
  );
  applyIfPresent("description", suggestion.description || details.description);

  agentFeedback.value =
    suggestion.summary ||
    suggestion.feedback ||
    "I filled the booking form with the details I could identify. Please verify everything before submitting.";
};

const analyzeEventBrief = () => {
  errors.value = {};
  agentFeedback.value = "";

  if (form.value.event_brief.trim().length < 40) {
    errors.value.event_brief =
      "Please add a little more detail so the booking assistant can understand the event.";
    return;
  }

  analyzing.value = true;

  http
    .post("bookings/analyze", {
      description: form.value.event_brief,
      allowed_event_types: [
        "Photo Shoot",
        "Video Shoot",
        "Photo and Video Shoot",
      ],
      allowed_photo_events: photoshootEvents,
      allowed_video_events: videoshootEvents,
      allowed_durations: duration,
    })
    .then((res) => {
      applyAgentSuggestion(res.data.data || res.data);
      notify({
        text: "Booking details filled. Please review before submitting.",
        duration: 8000,
        speed: 1000,
        type: "success",
      });
    })
    .catch((err) => {
      console.error(err);
      notify({
        text:
          err.response?.data?.message ||
          "The booking assistant could not analyze this yet. You can still fill the form manually.",
        duration: 10000,
        speed: 1000,
        type: "error",
      });
    })
    .finally(() => {
      analyzing.value = false;
    });
};

const book = () => {
  errors.value = {};

  if (!validatePhone(form.value.phone_number)) {
    errors.value.phone_number = "Please enter a valid Kenyan phone number.";
    return;
  }

  sending.value = true;

  http
    .post("bookings", {
      event_name: form.value.event_name,
      email: form.value.email,
      phone_number: form.value.phone_number,
      location: form.value.location,
      event_date: form.value.event_date || null,
      event_type: form.value.event_type,
      event_duration: form.value.event_duration,
      event_details: {
        event_brief: form.value.event_brief,
        event: form.value.event,
        number_of_people: form.value.number_of_people,
        outfit_change: form.value.outfit_change,
        number_of_outfit_changes: form.value.number_of_outfit_changes,
        description: form.value.description,
      },
    })
    .then((res) => {
      notify({
        text: res.data.message || "Booking submitted successfully.",
        duration: 10000,
        speed: 1000,
        type: "success",
      });
      resetForm();
    })
    .catch((err) => {
      console.error(err);
      notify({
        text: err.response?.data?.message || "Booking failed. Please try again later.",
        duration: 10000,
        speed: 1000,
        type: "error",
      });
    })
    .finally(() => {
      sending.value = false;
    });
};
</script>

<template>
  <div class="booking-page">
    <section class="booking-hero">
      <div class="booking-hero__content">
        <p class="section-kicker">Book Farmside Media</p>
        <h1>Reserve a team for your next shoot.</h1>
        <p>
          Tell us the essentials and we will follow up with availability,
          coverage options and next steps.
        </p>
      </div>
      <div class="booking-hero__facts">
        <div>
          <Camera />
          <span>Photo shoots</span>
        </div>
        <div>
          <Video />
          <span>Video coverage</span>
        </div>
        <div>
          <MapPin />
          <span>On location</span>
        </div>
      </div>
    </section>

    <section class="booking-shell">
      <form class="booking-form" @submit.prevent="book">
        <div class="form-panel assistant-panel">
          <div class="panel-heading">
            <Sparkles />
            <div>
              <h2>Describe Your Event</h2>
              <p>
                Be as detailed as possible. Include the event type, date, place,
                number of people, timing, coverage style, deliverables and any
                special moments you want captured.
              </p>
            </div>
          </div>

          <div>
            <Label for="event-brief">Event Description</Label>
            <Textarea
              id="event-brief"
              v-model="form.event_brief"
              rows="8"
              placeholder="Example: I am planning a graduation party in Nairobi on 20 July from 2pm to 7pm for about 80 guests. I need photo and video coverage, family portraits, candid moments, speeches, cake cutting, a 1-minute recap video and edited photos..."
            />
            <p class="field-help">
              The booking assistant will analyze this and fill the form below.
              You can edit anything before submitting.
            </p>
            <p class="error">{{ errors.event_brief }}</p>
          </div>

          <div class="assistant-actions">
            <Button
              type="button"
              :disabled="analyzing"
              class="assistant-button"
              @click="analyzeEventBrief"
            >
              {{ analyzing ? "Analyzing..." : "Analyze and Fill Form" }}
            </Button>
            <p v-if="agentFeedback" class="agent-feedback">
              {{ agentFeedback }}
            </p>
          </div>
        </div>

        <div class="form-panel">
          <div class="panel-heading">
            <CalendarDays />
            <div>
              <h2>Project Details</h2>
              <p>Start with the date, place and coverage type.</p>
            </div>
          </div>

          <div class="field-grid">
            <div>
              <Label for="event-name">Name</Label>
              <Input id="event-name" v-model="form.event_name" required placeholder="Your name" />
            </div>
            <div>
              <Label for="email">Email</Label>
              <Input id="email" v-model="form.email" required type="email" placeholder="you@example.com" />
            </div>
            <div>
              <Label for="phone">Phone Number</Label>
              <Input id="phone" v-model="form.phone_number" required placeholder="0712 345 678" />
              <p class="error">{{ errors.phone_number }}</p>
            </div>
            <div>
              <Label for="location">Location</Label>
              <Input id="location" v-model="form.location" required placeholder="Nairobi, Kiambu, Machakos..." />
            </div>
            <div>
              <Label for="event-date">Shoot Date</Label>
              <Input id="event-date" v-model="form.event_date" required type="date" :min="minDate" />
            </div>
            <div>
              <Label>Event Duration</Label>
              <Select v-model="form.event_duration" required>
                <SelectTrigger class="w-full rounded-md">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="item in duration" :key="item" :value="item">
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div class="form-panel">
          <div class="panel-heading">
            <Video />
            <div>
              <h2>Coverage</h2>
              <p>Help us understand the kind of production you need.</p>
            </div>
          </div>

          <div class="field-grid">
            <div>
              <Label>Coverage Type</Label>
              <Select v-model="form.event_type" required @update:model-value="form.event = ''">
                <SelectTrigger class="w-full rounded-md">
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Photo Shoot">Photo Shoot</SelectItem>
                    <SelectItem value="Video Shoot">Video Shoot</SelectItem>
                    <SelectItem value="Photo and Video Shoot">Photo and Video Shoot</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Shoot Type</Label>
              <Select v-model="form.event" required>
                <SelectTrigger class="w-full rounded-md">
                  <SelectValue placeholder="Select shoot type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="item in shootOptions" :key="item" :value="item">
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label for="people">Number of People</Label>
              <Input id="people" v-model="form.number_of_people" type="number" min="1" placeholder="Expected guests" />
            </div>
            <div v-if="showOutfitFields">
              <Label>Outfit Change</Label>
              <Select v-model="form.outfit_change">
                <SelectTrigger class="w-full rounded-md">
                  <SelectValue placeholder="Is there a change of outfit?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div v-if="showOutfitFields && form.outfit_change === 'Yes'">
              <Label for="outfit-count">Number of Outfit Changes</Label>
              <Input id="outfit-count" v-model="form.number_of_outfit_changes" type="number" min="1" />
            </div>
            <div class="field-span">
              <Label for="description">Description</Label>
              <Textarea
                id="description"
                v-model="form.description"
                rows="7"
                placeholder="Share the story, schedule, references, deliverables or any important details."
              />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <Button type="submit" :disabled="sending" class="submit-button">
            {{ sending ? "Submitting..." : "Submit Booking" }}
          </Button>
        </div>
      </form>
    </section>
    <bottom-page />
  </div>
</template>

<style scoped>
.booking-page {
  background: #f6f7f1;
  min-height: 100vh;
}

.booking-hero {
  background:
    linear-gradient(90deg, rgba(7, 13, 10, 0.9), rgba(7, 13, 10, 0.54)),
    url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1800&q=85") center/cover;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  padding: 96px clamp(20px, 4vw, 72px) 72px;
}

.booking-hero__content {
  max-width: 940px;
}

.section-kicker {
  color: #9fe6b3;
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  margin-bottom: 14px;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2.4rem, 6vw, 5.4rem);
  font-weight: 900;
  line-height: 0.96;
  margin: 0 0 24px;
}

.booking-hero p {
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.22rem;
  line-height: 1.7;
}

.booking-hero__facts {
  align-self: end;
  display: grid;
  gap: 10px;
  min-width: 230px;
}

.booking-hero__facts div {
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  display: flex;
  gap: 12px;
  padding: 14px;
}

.booking-shell {
  width: min(1360px, calc(100% - 40px));
  margin: -34px auto 72px;
  position: relative;
}

.booking-form {
  display: grid;
  gap: 18px;
}

.form-panel {
  background: #ffffff;
  border: 1px solid rgba(16, 20, 18, 0.08);
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(16, 20, 18, 0.1);
  padding: 28px;
}

.assistant-panel {
  border-color: rgba(47, 184, 94, 0.28);
  background:
    linear-gradient(135deg, rgba(47, 184, 94, 0.1), rgba(255, 255, 255, 0) 46%),
    #ffffff;
}

.panel-heading {
  align-items: center;
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
}

.panel-heading svg {
  color: #2fb85e;
  height: 32px;
  width: 32px;
}

h2 {
  color: #101412;
  font-size: 1.24rem;
  font-weight: 900;
  margin: 0 0 4px;
}

.panel-heading p {
  color: #647168;
  font-size: 1.05rem;
  margin: 0;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  color: #344039;
  display: block;
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 8px;
}

.field-span {
  grid-column: 1 / -1;
}

.field-help {
  color: #647168;
  font-size: 0.98rem;
  line-height: 1.55;
  margin: 8px 0 0;
}

.error {
  color: #c62828;
  font-size: 0.96rem;
  min-height: 18px;
  margin: 4px 0 0;
}

.assistant-actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 18px;
}

.assistant-button {
  background: #101412;
  border-radius: 6px;
  color: #ffffff;
  font-weight: 900;
  min-height: 48px;
  padding: 0 22px;
}

.agent-feedback {
  color: #238045;
  flex: 1 1 320px;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.45;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: center;
}

.submit-button {
  background: #2fb85e;
  border-radius: 6px;
  color: #061008;
  font-weight: 900;
  min-height: 50px;
  width: min(360px, 100%);
}

@media (max-width: 860px) {
  .booking-hero,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .booking-hero__facts {
    min-width: 0;
  }
}
</style>
