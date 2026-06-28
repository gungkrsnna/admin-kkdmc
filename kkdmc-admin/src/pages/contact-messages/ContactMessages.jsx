import {
  useEffect,
  useState,
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

function ContactMessages() {

  const [messages, setMessages] =
    useState([]);

  const loadMessages =
    async () => {

      const response =
        await fetch(
          "https://kkdmc.gladiatoraruna.com/api/contact"
        );

      const data =
        await response.json();

      setMessages(data);

    };

  useEffect(() => {

    loadMessages();

  }, []);

  return (
    <AdminLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          Contact Messages
        </h1>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Message
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {messages.map(
                (message) => (

                  <tr
                    key={message.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {message.full_name}
                    </td>

                    <td className="p-4">
                      {message.email}
                    </td>

                    <td className="p-4 max-w-md">
                      {message.message}
                    </td>

                    <td className="p-4">
                      {new Date(
                        message.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default ContactMessages;