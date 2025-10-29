import { useState } from "react";
import { submitContactForm } from "../services/contactService";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactForm(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", number: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "harshsinghcr04@gmail.com";
    
    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Use mailto for mobile devices
      window.location.href = `mailto:${email}`;
    } else {
      // Use Gmail web for desktop
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    }
  };

  return (
    <div className="bg-transparent py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Get In Touch</h1>
        <p className="text-lg text-gray-700 mb-10">
          Have a question or want to collaborate? Let’s connect.
        </p>

        {/* Social Icons (Above Form) */}
        <div className="flex justify-center gap-6 mb-10">
          <a
            href="#"
            onClick={handleEmailClick}
            className="p-5 bg-white rounded-full shadow-md hover:shadow-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Email"
          >
            <MdEmail className="w-8 h-8" />
          </a>

          <a
            href="https://wa.me/916268149305"
            className="p-5 bg-white rounded-full shadow-md hover:shadow-xl hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-8 h-8" />
          </a>

          <a
            href="https://www.instagram.com/_art_noxx/"
            className="p-5 bg-white rounded-full shadow-md hover:shadow-xl hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="+91 XXXXX XXXXX"
                pattern="[+]?[0-9\s]+"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Your message..."
              />
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                ❌ Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
