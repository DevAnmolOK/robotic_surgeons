"use client";

import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

type AppointmentFormProps = {
    doctor_id: number;
    specialty: string;
}


export const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor_id, specialty }) => {
    const initialForm = {
        fullName: "",
        phone: "",
        email: "",
        selectedDate: null as Date | null,
        selectedTime: "",
        message: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [maxDate] = useState<Date>(new Date());
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [response, setResponse] = useState<string | null>(null);

    const timeSlots = Array.from({ length: 10 }, (_, i) => {
        const hour = 9 + i;
        const label = `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
        return label;
    });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required";
        } else if (
        !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            form.phone
        )
        ) {
        newErrors.phone = "Please enter a valid phone number";
        }
        if (!form.email.trim()) {
        newErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
        newErrors.email = "Invalid email format";
        }
        if (!form.selectedDate) newErrors.selectedDate = "Please select a date";
        if (!form.selectedTime) newErrors.selectedTime = "Please select a time";
        if (!form.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const fetchBookedSlots = async (selectedDate: Date) => {
        try {
            const formattedDate = selectedDate.toLocaleDateString('en-CA');
            console.log(formattedDate);

            console.log(formattedDate);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: formattedDate }),
            });

            const data = await response.json();
            setBookedSlots(data);
        } catch (err) {
            console.error("Failed to fetch booked slots:", err);
            setBookedSlots([]);
        }
    };

    function convertTo24Hour(time12h: string): string {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }

    function calculateEndTime(startTime: string, durationMins = 30): string {
        const [hour, minute] = startTime.split(":").map(Number);
        const end = new Date();
        end.setHours(hour, minute + durationMins, 0, 0);
        return `${String(end.getHours()).padStart(2, "0")}:${String(
            end.getMinutes()
        ).padStart(2, "0")}`;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const appointmentPayload = {
                doctor_id: doctor_id,
                name: form.fullName,
                phone_number: form.phone,
                specialty: specialty,
                user_email: form.email,
                message: form.message,
                appointment_date: form.selectedDate
                    ? form.selectedDate.toLocaleDateString("en-US")
                    : "",
                start_time: convertTo24Hour(form.selectedTime),
                end_time: calculateEndTime(convertTo24Hour(form.selectedTime)),
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boot-appointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appointmentPayload),
            });

            const result = await response.json();

            if (response.ok) {
                setResponse('Appointment booked successfully!');
                setForm(initialForm);
                setErrors({});
            } else {
                setResponse(result.message || "Booking failed.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            setResponse("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
            >
                <div className="mb-4">
                    <label className="text-pbase leading-relaxed mb-2">Full Name</label>
                    <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div className="mb-4">
                    <label className="text-pbase leading-relaxed mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                  <label className="text-pbase font-normal">
                    Personal Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                    <label className="text-pbase leading-relaxed mb-2">Choose Date</label>
                    <Flatpickr
                        options={{
                            dateFormat: "Y-m-d",
                            minDate: "today",
                            maxDate: `${maxDate}`,
                        }}
                        className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
                        placeholder="Select a date"
                        value={form.selectedDate || ""}
                        onChange={(dates: Date[]) => {
                            const selectedDate = dates[0];
                            setForm({ ...form, selectedDate, selectedTime: "" });
                            if (selectedDate) fetchBookedSlots(selectedDate);
                        }}
                    />
                    {errors.selectedDate && <p className="text-red-500 text-sm mt-1">{errors.selectedDate}</p>}
                </div>

                {form.selectedDate && (
                    <div className="mb-4">
                        <label className="block mb-1">Select Time</label>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot) => {
                                const isBooked = bookedSlots.includes(slot);
                                return (
                                    <button
                                        type="button"
                                        key={slot}
                                        disabled={isBooked}
                                        onClick={() =>
                                            setForm({ ...form, selectedTime: slot })
                                        }
                                        className={`border border-[#DBDBDB] px-3 py-2 rounded-full text-sm ${isBooked
                                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                                : form.selectedTime === slot
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100"
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.selectedTime && (
                            <p className="text-red-500 text-sm mt-1">{errors.selectedTime}</p>
                        )}
                    </div>
                )}

                <div className="mb-4">
                    <label className="text-pbase leading-relaxed mb-2">Message</label>
                    <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="w-full border border-[#DBDBDB] rounded-lg px-5 py-3"
                        placeholder="Enter your message here..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-theme hover:bg-htheme hover:cursor-pointer"
                        } text-white py-3 lg:py-3 rounded-full font-normal font-sans tracking-tight transition text-pxl`}
                    disabled={loading}
                >
                    {loading ? "Please wait..." : "Submit"}
                </button>
            </form>
            {response &&
                <div role="alert" className="mt-3 relative flex w-full p-3 text-sm text-white bg-slate-800 rounded-md">
                    {response}
                    <button onClick={() => setResponse(null)} className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            }
        </>

    );
};
