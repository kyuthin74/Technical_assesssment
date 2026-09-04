export default function StudentForm({ register, errors }) {
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

      <Field
        label="Educational Institution"
        required
        name="institution"
        register={register}
        error={errors.institution?.message}
        placeholder="University / School"
      />

      <Field
        label="Student ID Number"
        required
        name="studentId"
        register={register}
        error={errors.studentId?.message}
        placeholder="Enter student ID"
      />

      <FileField
        label="Student ID Card"
        required
        name="studentCard"
        register={register}
        error={errors.studentCard?.message}
        accept="image/png,image/jpeg"
        help="JPG or PNG, maximum 2MB"
      />

      <Field
        label="Student ID Expiration Date"
        required
        type="date"
        name="studentExpiry"
        register={register}
        error={errors.studentExpiry?.message}
      />

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
        label="Date of Birth"
        required
        type="date"
        name="dob"
        register={register}
        error={errors.dob?.message}
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

function FileField({
  label,
  required,
  name,
  register,
  error,
  accept,
  help,
}) {
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type="file"
        accept={accept}
        className={`file-input ${error ? "border-red-400" : ""}`}
        {...register(name, {
          required: `${label} is required.`,
          validate: (files) => {
            const file = files?.[0];
            if (!file) return true;
            if (file.size > 2 * 1024 * 1024) {
              return "File size must not exceed 2MB.";
            }
            if (!["image/jpeg", "image/png"].includes(file.type)) {
              return "Only JPG and PNG files are allowed.";
            }
            return true;
          },
        })}
      />
      <p className="file-help">{help}</p>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}