"use client";
import React, { useState, useEffect } from "react";
var countries = require("country-data").countries;
import { Input } from "@/components/ui/input";
import { Toaster } from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import axios from "axios";
import { z } from "zod";
//@ts-ignore
import styles from "./form.modules.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { toast } from "react-hot-toast";

export default function FormPage({ params }: { params: { formId: string } }) {
  const REGEXP_ONLY_CHARS = new RegExp("^[a-zA-Z]* [a-zA-Z]*$");

  const [searchTerm, setSearchTerm] = useState("");
  const [modified, setModified] = useState(false);
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const FormSchema = z.object({
    name: z
      .string({
        required_error: "Please Enter a Name.",
      })
      .regex(REGEXP_ONLY_CHARS, "Enter a Vaild Name"),
    selectedCountry: z.string({ required_error: "Please select a country" }),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "Phone number must be numeric")
      .length(10, "Phone number must be exactly 10 digits"),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData") || "");
    console.log(savedFormData);
    if (savedFormData) {
      setName(savedFormData.name);
      setSelectedCountry(savedFormData.selectedCountry);
      setPhoneNumber(savedFormData.phoneNumber);
      setModified(true);
      toast.success("Restored Progress");
    }
  }, []);

  useEffect(() => {
    if ((name || selectedCountry || phoneNumber) && modified) {
      const formData = {
        name,
        selectedCountry,
        phoneNumber,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
      toast.success("Data saved to local storage");
    }
  }, [name, selectedCountry, phoneNumber, modified]);

  const filteredCountries = countries.all.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const submitForm = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("http://localhost:8000", {
        body: {
          formId: params.formId,
          name: name,
          phoneNumber: phoneNumber,
          countryCode: data.selectedCountry,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", response.data);
      // Handle success or redirect
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Toaster />
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Name"
                    {...field}
                    onChange={(e) => {
                      if (REGEXP_ONLY_CHARS.test(e.target.value)) {
                        field.onChange(e.target.value);
                        setName(e.target.value);
                        if (!modified) setModified(true);
                      }
                    }}
                    value={field.value || name}
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(value);
                    if (!modified) setModified(true);
                  }}
                  value={field.value || selectedCountry}
                >
                  <SelectTrigger
                    className={`w-[180px] ${styles.SelectTrigger}`}
                  >
                    <SelectValue placeholder="Country Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      className="w-full"
                    />
                    <SelectGroup>
                      <SelectLabel>Countries</SelectLabel>
                      {filteredCountries
                        .filter(
                          (country: {
                            countryCallingCodes: any[];
                            emoji: any;
                            alpha2: any;
                          }) =>
                            country.countryCallingCodes[0] &&
                            country.emoji &&
                            country.alpha2,
                        )
                        .map(
                          (
                            country: {
                              alpha2: any;
                              name: any;
                              countryCallingCodes: any[];
                              emoji: any;
                            },
                            i: number,
                          ) => (
                            <SelectItem
                              key={i}
                              value={country.countryCallingCodes[0].toString()}
                            >
                              {`${country.countryCallingCodes[0]} ${country.emoji} ${country.name}`}
                            </SelectItem>
                          ),
                        )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <InputOTP
                    {...field}
                    maxLength={10}
                    onChange={(phoneNumber) => {
                      setPhoneNumber(phoneNumber);
                      if (!modified) setModified(true);
                    }}
                    value={field.value || phoneNumber}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSlot index={9} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={() => {
              //@ts-ignore
              submitForm();
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
