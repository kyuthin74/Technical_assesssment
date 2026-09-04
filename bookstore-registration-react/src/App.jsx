import { useState } from "react";
import { useForm } from "react-hook-form";
import MemberTypeCard from "./components/MemberTypeCard";
import GeneralUserForm from "./components/GeneralUserForm";
import StudentForm from "./components/StudentForm";
import StoreForm from "./components/StoreForm";

const memberTypes = {
  general: {
    title: "General User Information",
    description: "Please provide your personal information.",
  },
  student: {
    title: "Student Information",
    description:
      "Please provide your student information and student ID card.",
  },
  store: {
    title: "Store / Business Information",
    description:
      "Please provide your business information and legal documents.",
  },
};

function App() {
  const [step, setStep] = useState(1);
  const [memberType, setMemberType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const chooseMemberType = (type) => {
    setMemberType(type);
    reset();
  };

  const goToInformation = () => {
    if (!memberType) {
      window.alert("Please select a member type.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data) => {
    // Demo only. Replace this with your API request later.
    console.log("Registration data:", {
      memberType,
      ...data,
    });

    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetRegistration = () => {
    setMemberType("");
    reset();
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">BookStore</h1>
            <p className="text-sm text-gray-500">Online Book Store</p>
          </div>

          <div className="hidden text-sm text-gray-500 sm:block">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => window.alert("Login page would open here.")}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-500">
            Please register as a member to start shopping.
          </p>
        </div>

        <StepIndicator step={step} />

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {step === 1 && (
            <MemberTypeStep
              memberType={memberType}
              onSelect={chooseMemberType}
              onNext={goToInformation}
            />
          )}

          {step === 2 && (
            <InformationStep
              memberType={memberType}
              register={register}
              errors={errors}
              onBack={goBack}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}

          {step === 3 && (
            <SuccessStep onLogin={() => window.alert("Login page would open here.")} />
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-400">
        © 2026 BookStore. All rights reserved.
      </footer>

      {step === 3 && (
        <div className="sr-only">
          <button onClick={resetRegistration}>Register another account</button>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step }) {
  const item = (number, label) => {
    const status =
      step > number ? "completed" : step === number ? "active" : "";

    return (
      <div className="flex items-center">
        <div className={`step-circle ${status}`}>
          {step > number ? "✓" : number}
        </div>
        <span className={`step-label ${status}`}>{label}</span>
      </div>
    );
  };

  return (
    <div className="mb-8 flex items-center justify-center">
      {item(1, "Member Type")}
      <div className="step-line" />
      {item(2, "Information")}
      <div className="step-line" />
      {item(3, "Complete")}
    </div>
  );
}

function MemberTypeStep({ memberType, onSelect, onNext }) {
  return (
    <section className="p-6 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h3 className="text-xl font-bold text-gray-900">
          Choose Member Type
        </h3>
        <p className="mb-7 mt-1 text-gray-500">
          Select the type of member you want to register.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <MemberTypeCard
            type="general"
            title="General User"
            description="For regular customers who want to purchase books."
            selected={memberType === "general"}
            onClick={() => onSelect("general")}
            icon={{
              bg: "bg-blue-100",
              text: "text-blue-600",
              svg: <UserIcon />,
            }}
          />

          <MemberTypeCard
            type="student"
            title="Student"
            description="For students with a valid student ID card."
            selected={memberType === "student"}
            onClick={() => onSelect("student")}
            icon={{
              bg: "bg-green-100",
              text: "text-green-600",
              svg: <StudentIcon />,
            }}
          />

          <MemberTypeCard
            type="store"
            title="Store / Business"
            description="For registered stores and businesses."
            selected={memberType === "store"}
            onClick={() => onSelect("store")}
            icon={{
              bg: "bg-purple-100",
              text: "text-purple-600",
              svg: <StoreIcon />,
            }}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button type="button" onClick={onNext} className="primary-button">
            Next <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function InformationStep({
  memberType,
  register,
  errors,
  onBack,
  onSubmit,
}) {
  const content = memberTypes[memberType];

  return (
    <section className="p-6 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900">{content.title}</h3>
          <p className="mt-1 text-gray-500">{content.description}</p>
        </div>

        <form onSubmit={onSubmit}>
          {memberType === "general" && (
            <GeneralUserForm register={register} errors={errors} />
          )}

          {memberType === "student" && (
            <StudentForm register={register} errors={errors} />
          )}

          {memberType === "store" && (
            <StoreForm register={register} errors={errors} />
          )}

          <div className="mt-10 flex items-center justify-between border-t pt-6">
            <button type="button" onClick={onBack} className="secondary-button">
              ← Back
            </button>

            <button type="submit" className="primary-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function SuccessStep({ onLogin }) {
  return (
    <section className="p-10 sm:p-12">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-gray-900">
          Registration Successful!
        </h3>

        <p className="mt-3 text-gray-500">
          Your registration information has been submitted successfully.
        </p>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-800">
            Your information will be verified by the system. After successful
            verification, you can log in and start purchasing books.
          </p>
        </div>

        <button type="button" onClick={onLogin} className="primary-button mt-8">
          Go to Login
        </button>
      </div>
    </section>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 20.25a8.25 8.25 0 0115 0"
      />
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10l9-5 9 5-9 5-9-5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12.5v4.5c3 2 7 2 10 0v-4.5"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l1-5h14l1 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-6h6v6" />
    </svg>
  );
}

export default App;