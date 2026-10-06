"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { requestPasswordReset } from '../../lib/auth-client';

const ForgetPassword = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });


       const {data:resetPassData,error} = await requestPasswordReset({
            email: data.email,
            redirectTo: "http://localhost:3000/reset-password"
        });

        console.log(resetPassData)

    };

    return (
        <div>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit">

                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ForgetPassword;