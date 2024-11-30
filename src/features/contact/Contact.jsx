import { useForm } from "react-hook-form";
import ContactSocials from "./ContactSocials";
import { Helmet, HelmetProvider } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify components
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

function Contact() {
  const formData = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      textmessage: "",
    },
  });

  const sendEmail = async () => {
    try {
      const result = await emailjs.sendForm(
        `${import.meta.env.VITE_SERVICE_ID}`,
        `${import.meta.env.VITE_TEMPLATE_ID}`,
        formData.current,
        `${import.meta.env.VITE_EMAILJS_KEY}`
      );
      console.log(result.text);
      toast.success("Email sent successfully!", {
        className: 'border-2 border-gray-600',
        style: {
          background: '#1f2937',
          color: '#f3f4f6'
        },
        iconTheme: {
          primary: '#38bdf8',
          secondary: '#1f2937'
        },
    });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.", {
        className: 'border-2 border-gray-600',
        style: {
          background: '#1f2937',
          color: '#f3f4f6'
        },
        iconTheme: {
          primary: '#38bdf8',
          secondary: '#1f2937'
        },
    });
    } finally {
      reset();
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Aji Santoso | Contact</title>
      </Helmet>
      <div className="flex w-full flex-col gap-x-8 gap-y-8 bg-mainBg px-8 pt-5 xl:flex-row xl:divide-x-2 xl:divide-accentColor">
        <div className="xl:w-1/2">
          <ContactSocials />
        </div>
        <div className="flex flex-col xl:w-1/2 xl:pl-10">
          <p className="text-3xl text-textColor">Or Fill Out This Form</p>
          <form
            ref={formData}
            className="space-y-4 pt-5 text-textColor"
            onSubmit={handleSubmit(sendEmail)}
          >
            {/** Name Input */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-base font-semibold md:text-lg"
              >
                NAME
              </label>
              <input
                className="input"
                name="name"
                type="text"
                id="name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
              />
              <p className="error text-sm text-red-600">
                {errors.name?.message}
              </p>
            </div>

            {/** Email Input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-base font-semibold md:text-lg"
              >
                EMAIL
              </label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="error text-sm text-red-600">
                {errors.email?.message}
              </p>
            </div>

            {/** Subject Input */}
            <div className="flex flex-col">
              <label
                htmlFor="subject"
                className="text-base font-semibold md:text-lg"
              >
                SUBJECT
              </label>
              <input
                className="input"
                type="text"
                name="subject"
                id="subject"
                {...register("subject", {
                  required: { value: true, message: "Subject is required" },
                })}
              />
              <p className="error text-sm text-red-600">
                {errors.subject?.message}
              </p>
            </div>

            {/** Message Textarea */}
            <div className="flex flex-col">
              <label
                htmlFor="textmessage"
                className="text-base font-semibold md:text-lg"
              >
                MESSAGE
              </label>
              <textarea
                className="w-full bg-articleBg p-2 text-xl focus:border-accentColor focus:outline-none focus:ring-1 focus:ring-accentColor"
                id="textmessage"
                name="textmessage"
                cols="30"
                rows="6"
                {...register("textmessage", {
                  required: { value: true, message: "Message is required" },
                  validate: {
                    isLessThanfiveChar: (fieldValue) =>
                      fieldValue.length > 4 ||
                      "Should be of minimum 5 characters",
                  },
                })}
              ></textarea>
              <p className="error text-sm text-red-600">
                {errors.textmessage?.message}
              </p>
            </div>

            <button
              type="submit"
              className="bg-accentColor px-6 py-1 text-lg font-medium text-black"
            >
              Submit
            </button>
          </form>
          {/* Add Toast Container */}
          <ToastContainer position="top-right" />
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Contact;