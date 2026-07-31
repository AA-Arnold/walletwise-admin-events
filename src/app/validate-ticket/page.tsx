import type { Metadata } from "next";

import ValidateTicketForm from "@/components/organisms/ValidateTicketForm/ValidateTicketForm";

export const metadata: Metadata = {
  title: "Invalidate Ticket",
  description: "Invalidate a Peruzzi Live in Abuja event ticket.",
};

const ValidateTicketPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#615853_0%,#6B615A_21.74%,#857772_37.98%,#7E706B_75%,#1E1C18_100%)] p-4">
      <section className="w-full max-w-132.75 rounded-[20px] bg-white/20 p-2 backdrop-blur-2xl">
        <div className="rounded-[20px] border border-white/30 bg-black/35 p-8 shadow-2xl backdrop-blur-2xl max-sm:px-4">
          <div className="space-y-7">
            <header className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-[#FFF5E4] sm:text-3xl">
                Peruzzi Live In Abuja
              </h1>
              <p className="text-sm text-white/60 sm:text-base">
                Enter a ticket ID below to invalidate the ticket.
              </p>
            </header>

            <ValidateTicketForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ValidateTicketPage;
