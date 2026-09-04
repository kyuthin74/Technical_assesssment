export default function GeneralUserForm({ register, errors }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field
        label="Name"
        required
        name="name"
        register={register}
        error={errors.name?.message}
        placeholder="Enter first name"
      />

      <Field
        label="Surname"
        required
        name="surname"
        register={register}
        error={errors.surname?.message}
        placeholder="Enter surname"
      />

      <div className="md:col-span-2">
        <Field
          label="National ID Card Number"
          required
          name="nationalId"
          register={register}
          error={errors.nationalId?.message}
          placeholder="Enter national ID card number"
        />
      </div>

      <Field
        label="Email"
        required
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
        placeholder="example@email.com"
      />

      <Field
        label="Telephone Number"
        required
        type="tel"
        name="phone"
        register={register}
        error={errors.phone?.message}
        placeholder="Enter telephone number"
      />

      <Field
        label="Date of Birth"
        required
        type="date"
        name="dob"
        register={register}
        error={errors.dob?.message}
      />
    </div>
  );
}

function Field({
  label,
  required,
  name,
  register,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`form-input ${error ? "border-red-400" : ""}`}
        {...register(name, { required: `${label} is required.` })}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}