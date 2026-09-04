export default function StoreForm({ register, errors }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field
        label="Business Operator's Name"
        required
        name="operatorName"
        register={register}
        error={errors.operatorName?.message}
        placeholder="Enter operator name"
      />

      <Field
        label="Business Name"
        required
        name="businessName"
        register={register}
        error={errors.businessName?.message}
        placeholder="Enter business name"
      />

      <Field
        label="Legal Entity Registration Number"
        required
        name="registrationNumber"
        register={register}
        error={errors.registrationNumber?.message}
        placeholder="Enter registration number"
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
        label="Telephone Number"
        required
        type="tel"
        name="phone"
        register={register}
        error={errors.phone?.message}
        placeholder="Enter telephone number"
      />

      <FileField
        label="Legal Entity Documents"
        required
        name="legalDocuments"
        register={register}
        error={errors.legalDocuments?.message}
        accept=".pdf,image/png,image/jpeg"
        help="PDF, JPG or PNG, maximum 2MB"
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
            return true;
          },
        })}
      />
      <p className="file-help">{help}</p>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}