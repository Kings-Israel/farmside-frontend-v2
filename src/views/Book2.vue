<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toDate } from 'reka-ui/date'
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today
} from "@internationalized/date";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { http } from '@/lib/axios';
import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()

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

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const duration = [
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

const formSchema = toTypedSchema(z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50).email(),
    phone_number: z.string().min(10).max(15),
    location: z.string().min(2).max(100),
    event_date: z.string().nullable(),
    event_type: z.string().min(2).max(50),
    event_duration: z.string().min(2).max(50),
    event: z.string().min(2).max(50).optional(),
    number_of_people: z.number().min(1).optional(),
    outfit_change: z.boolean().optional(),
    number_of_outfit_changes: z.number().min(1).optional(),
    description: z.string().min(2).max(500).optional(),
}))

const {handleSubmit, setFieldValue, values} = useForm({
    validationSchema: formSchema,
})

const value = computed({
  get: () => values.event_date ? parseDate(values.event_date) : undefined,
  set: val => val,
})

const onSubmit = handleSubmit((values) => {
    http.post('bookings', {
        ...values,
        event_date: values.event_date ? values.event_date.toString() : null,
        event_details: {
            event: values.event,
            number_of_people: values.number_of_people,
            outfit_change: values.outfit_change,
            number_of_outfit_changes: values.number_of_outfit_changes,
            description: values.description,
        }
    })
    .then((res) => {
        notify({
            text: res.data.message || "Booking successful!",
            duration: 10000,
            speed: 1000,
            type: "success",
        });
        form.value = {
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
        }
    })
    .catch((err) => {
        console.error(err)
        alert("Booking failed! Please try again later.")
    })
})
</script>
<template>
    <div>
        <div class="text-center mx-1">
            <p class="text-slate-600 font-bold text-4xl">Book a Shoot</p>
        </div>
        <div class="px-40">
            <form @submit="onSubmit" class="grid grid-cols-2 gap-4">
                <div class="space-y-4">
                    <FormField name="name" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Name" v-model="form.name" v-bind="componentField" />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="email" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Email" v-model="form.email" v-bind="componentField" />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="phone_number" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Phone Number" v-model="form.phone_number" v-bind="componentField" />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="event_date" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Date of Event</FormLabel>
                            <Popover>
                                <PopoverTrigger as-child>
                                    <FormControl>
                                    <Button
                                        variant="outline"
                                        :class="cn(
                                            'w-full ps-3 text-start font-normal',
                                            !value && 'text-muted-foreground',
                                        )"
                                    >
                                        <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                                        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    <input hidden v-model="form.event_date" v-bind="componentField" />
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar
                                        calendar-label="Date of event"
                                        initial-focus
                                        :min-value="today(getLocalTimeZone())"
                                        @update:model-value="(v) => {
                                            if (v) {
                                                setFieldValue('event_date', v.toString())
                                            }
                                            else {
                                                setFieldValue('event_date', undefined)
                                            }
                                        }"
                                        v-model="value"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Select the date of the event
                            </FormDescription>
                        </FormItem>
                    </FormField>
                    <FormField name="location" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Event Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the location of the event" v-model="form.location" v-bind="componentField" />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="event_type" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <Select v-bind="componentField" v-model="form.event_type">
                                <SelectTrigger class="w-full rounded">
                                    <SelectValue placeholder="Select the duration of the event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="Photo Shoot">
                                            Photo Shoot
                                        </SelectItem>
                                        <SelectItem value="Video Shoot">
                                            Video Shoot
                                        </SelectItem>
                                        <SelectItem value="Photo and Video Shoot">
                                            Photo and Video Shoot
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <div class="space-y-4">
                    <div>
                        <FormField name="event_duration" v-slot="{ componentField }">
                            <FormLabel>Event Duration</FormLabel>
                            <FormItem>
                                <Select v-bind="componentField" v-model="form.event_duration">
                                    <SelectTrigger class="w-full rounded">
                                        <SelectValue placeholder="Select the duration of the event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Duration</SelectLabel>
                                            <SelectItem v-for="value in duration" :key="value.value" :value="value.value">
                                                {{ value.text }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </FormField>
                    </div>

                    <div
                        v-show="form.event_type == 'Photo Shoot'"
                    >
                        <FormField name="event" v-slot="{ componentField }">
                            <FormItem>
                                <FormLabel>Type of Shoot</FormLabel>
                                <Select v-bind="componentField" v-model="form.event_details.event">
                                    <SelectTrigger class="w-full rounded">
                                        <SelectValue placeholder="Select the type of shoot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type of Shoot</SelectLabel>
                                            <SelectItem v-for="value in photoshoot_events" :key="value.value" :value="value.value">
                                                {{ value.text }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </FormField>
                    </div>

                    <div
                        v-show="form.event_type == 'Video Shoot'"
                    >
                        <FormField name="event" v-slot="{ componentField }">
                            <FormItem>
                                <FormLabel>Type of Shoot</FormLabel>
                                <Select v-bind="componentField" v-model="form.event_details.event">
                                    <SelectTrigger class="w-full rounded">
                                        <SelectValue placeholder="Select the type of shoot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type of Shoot</SelectLabel>
                                            <SelectItem v-for="value in videoshoot_events" :key="value.value" :value="value.value">
                                                {{ value.text }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </FormField>
                    </div>

                    <div>
                        <FormField name="number_of_people" v-slot="{ componentField }">
                            <FormItem>
                                <FormLabel>No. of People</FormLabel>
                                    <FormControl>
                                        <Input v-model="form.event_details.number_of_people" type="number" min="1" placeholder="Enter the number of people expected" v-bind="componentField" />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div
                        v-show="
                            form.event_type == 'Photo Shoot' &&
                            (form.event_details.event == 'Studio Shoot' ||
                            form.event_details.event == 'Outdoor Shoot')
                        "
                    >
                        <FormField name="outfit_change" v-slot="{ componentField }">
                            <FormLabel>Outfit Change</FormLabel>
                            <FormItem>
                                <Select v-bind="componentField" v-model="form.event_details.outfit_change">
                                    <SelectTrigger class="w-full rounded">
                                        <SelectValue placeholder="Is there a change of outfit?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Yes">
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="No">
                                                No
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        </FormField>
                    </div>

                    <div
                        v-show="
                            form.event_type == 'Photo Shoot' &&
                            (form.event_details.event == 'Studio Shoot' ||
                            form.event_details.event == 'Outdoor Shoot') &&
                            form.event_details.outfit_change == 'Yes'
                        "
                    >
                        <FormField name="number_of_outfit_changes" v-slot="{ componentField }">
                            <FormItem>
                                <FormLabel>No. of outfit changes</FormLabel>
                                    <FormControl>
                                        <Input v-model="form.event_details.number_of_outfit_changes" type="number" min="1" placeholder="Enter the number of outfit changes" v-bind="componentField" />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div
                        v-show="
                            form.event_type == 'Video Shoot' ||
                            form.event_type == 'Photo and Video Shoot'
                        "
                    >
                        <FormField name="description" v-slot="{ componentField }">
                            <FormItem>
                                <FormLabel>Video Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter the video description" v-model="form.event_details.description" v-bind="componentField" />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                </div>
                <div
                    class="flex justify-center col-span-2"
                 >
                    <Button type="submit" class="w-1/2 rounded bg-green-500 hover:bg-green-600 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>