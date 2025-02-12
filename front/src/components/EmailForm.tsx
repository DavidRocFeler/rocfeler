import { useState } from "react";
import emailjs from "emailjs-com";

const EmailForm = () => {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para el spinner

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromName || !fromEmail || !message) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true); // Activar spinner

    const templateParams = {
      from_name: fromName, // Nombre del remitente
      from_email: fromEmail, // Correo del remitente
      message: message, // Mensaje
      to_name: "David", // Puedes dejarlo fijo
    };

    emailjs
      .send(
        "service_14shih4", // SERVICE ID
        "template_pgpao1n", // TEMPLATE ID
        templateParams,
        "8phFAjNKAgrAM4U6A" // USER ID (Public Key)
      )
      .then(
        (response) => {
          console.log("✅ Email sent successfully!", response);
          alert("Email sent successfully!");
          setFromName("");
          setFromEmail("");
          setMessage("");
        },
        (error) => {
          console.error("❌ Failed to send email:", error);
          alert("Failed to send email. Try again.");
        }
      )
      .finally(() => setLoading(false)); // Desactivar spinner
  };

  return (
    <div className="bg-white rounded-[0.5rem] mt-4 shadow-lg pb-2">
      <h2 className="w-full text-[0.9rem] mb-0 bg-[#F2F6Fc] py-2 pl-3 font-light rounded-t-[0.5rem]">New Message</h2>

      <form 
      className="px-2"
      onSubmit={handleSendEmail}>
        <input
          type="text"
          placeholder="Your name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          className="w-full px-1 py-2 text-[0.8rem] border-b-2 outline-none"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="w-full px-1 py-2 text-[0.8rem] border-b-2 outline-none rounded mb-0"
          required
        />
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-1 py-2 text-[0.8rem] border-b-1 outline-none rounded mb-3 h-10"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full mx-auto bg-blue-600 text-white py-1 text-[0.9rem] rounded-[20px] hover:bg-blue-700 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <span className="flex items-center gap-2">
                <svg className="w-[14px] h-auto" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.14745 0.13212C0.814181 -0.44639 -0.499928 0.98648 0.189692 2.26611L2.84473 7.1969C3.0133 7.5149 3.32747 7.7256 3.68377 7.7716L10.4267 8.6145C10.557 8.6298 10.6566 8.7409 10.6566 8.8711C10.6566 9.0014 10.557 9.1125 10.4267 9.1278L3.68377 9.9707C3.32747 10.0167 3.0133 10.2312 2.84473 10.5454L0.189692 15.4838C-0.499928 16.7635 0.814181 18.1964 2.14745 17.6178L19.0776 10.281C20.3075 9.7485 20.3075 8.0015 19.0776 7.4689L2.14745 0.13212Z"
                    fill="white"
                />
                </svg>
                Send
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;

