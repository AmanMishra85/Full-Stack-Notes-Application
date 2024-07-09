import React from "react";

function About() {
  return (
    <div id="about" className="mb-8 md:mb-28 lg:mt-10">
      <div className="my-4 mx-6 lg:mx-32">
        <section className="flex justify-center items-center my-4 text-xl sm:text-2xl lg:text-3xl font-semibold">
          <p className="mt-8 mb-4 lg:mb-20">How it Works?</p>
        </section>

        <div className="flex flex-col md:flex-row gap-6 items-center mb-4 lg:mb-12 lg:mx-6">
          <section className="shadow-lg flex-1">
            <div className="flex flex-col justify-center items-center border-2 p-4 rounded-lg border-blue-400 gap-2">
              <p className="bg-blue-600 w-[35px] h-[35px] text-xl rounded-full flex justify-center items-center text-white">
                1
              </p>
              <section className="font-semibold text-lg">
                <p>Sign-in Yourself</p>
              </section>
              <section className="text-center text-md">
                <p>
                  Users typically sign in with a username/email and a password.
                  Authentication ensures that only registered users can access
                  their notes.
                </p>
              </section>
            </div>
          </section>
          <section className="shadow-lg flex-1">
            <div className="flex flex-col justify-center items-center border-2 p-4 rounded-lg border-yellow-300 gap-2">
              <p className="bg-yellow-300 w-[35px] h-[35px] text-xl rounded-full flex justify-center items-center">
                2
              </p>
              <section className="font-semibold text-lg">
                <p>Create Notes</p>
              </section>
              <section className="text-center text-md">
                <p>
                  Click on the "Create Notes" button to start writing your
                  notes. After you're done, remember to save your notes.
                </p>
              </section>
            </div>
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center my-4 lg:mx-6">
          <section className="shadow-lg flex-1">
            <div className="flex flex-col justify-center items-center border-2 p-4 rounded-lg border-teal-400 gap-2">
              <p className="bg-teal-400 w-[35px] h-[35px] text-xl rounded-full flex justify-center items-center text-white">
                3
              </p>
              <section className="font-semibold text-lg">
                <p>Update Your Notes</p>
              </section>
              <section className="text-center text-md">
                <p>
                  Click the "Edit" button to make changes to your notes. After
                  editing, save your changes. You'll receive a notification
                  confirming your notes have been updated.
                </p>
              </section>
            </div>
          </section>
          <section className="shadow-lg flex-1">
            <div className="flex flex-col justify-center items-center border-2 p-4 rounded-lg border-pink-400 gap-2">
              <p className="bg-pink-500 w-[35px] h-[35px] text-xl rounded-full flex justify-center items-center text-white">
                4
              </p>
              <section className="font-semibold text-lg">
                <p>Delete Notes</p>
              </section>
              <section className="text-center text-md">
                <p>
                  Click the "Delete" button to remove your notes. Confirm the
                  deletion, and you'll receive a notification confirming that
                  your notes have been deleted.
                </p>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
