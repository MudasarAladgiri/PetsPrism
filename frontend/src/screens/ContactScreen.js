import React from "react";

const ContactScreen = () => {
  return (
    <div class="bg-gray-100 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-lg mx-auto shadow-md bg-white rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
          <form action="#" method="POST">
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="name">
                Name
              </label>
              <input
                class="border border-gray-400 p-2 w-full rounded-md"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-semibold mb-2" for="email">
                Email
              </label>
              <input
                class="border border-gray-400 p-2 w-full rounded-md"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 font-semibold mb-2"
                for="message"
              >
                Message
              </label>
              <textarea
                class="border border-gray-400 p-2 w-full rounded-md"
                id="message"
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <div class="flex justify-center">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
