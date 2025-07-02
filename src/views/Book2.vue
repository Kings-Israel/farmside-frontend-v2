<script setup lang="ts">
import { ref } from 'vue'
// import { useForm } from 'vee-validate'
// import { toTypedSchema } from '@vee-validate/zod'
// import * as z from 'zod'
import { toDate } from 'reka-ui/date'
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today
} from "@internationalized/date";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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

// const formSchema = toTypedSchema(z.object({
//   username: z.string().min(2).max(50),
// }))

// const form = useForm({
//   validationSchema: formSchema,
// })

const onSubmit = () => {
}
</script>
<template>
    <div>
        <div class="text-center mx-1">
            <p class="text-slate-600 font-bold text-4xl">Book a Shoot</p>
        </div>
        <div class="px-40">
            <form @submit="onSubmit" class="grid grid-cols-2 gap-4">
                <div>
                    <FormField name="username" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Name" v-bind="componentField" />
                                </FormControl>
                                <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="email" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Email" v-bind="componentField" />
                                </FormControl>
                                <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="phone_number" v-slot="{ componentField }">
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your Phone Number" v-bind="componentField" />
                                </FormControl>
                                <FormDescription />
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="form.event_date">
                        <FormItem class="flex flex-col">
                            <FormLabel>Date of Event</FormLabel>
                            <Popover>
                                <PopoverTrigger as-child>
                                    <FormControl>
                                    <Button
                                        variant="outline" :class="cn(
                                        'w-[240px] ps-3 text-start font-normal',
                                        !form.event_date && 'text-muted-foreground',
                                        )"
                                    >
                                        <span>{{ form.event_date ? df.format(toDate(form.event_date)) : "Pick a date" }}</span>
                                        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    <input hidden>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar
                                        calendar-label="Date of birth"
                                        initial-focus
                                        :min-value="today(getLocalTimeZone())"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Select the date of the event
                            </FormDescription>
                        </FormItem>
                    </FormField>
                </div>
            </form>
        </div>
    </div>
</template>