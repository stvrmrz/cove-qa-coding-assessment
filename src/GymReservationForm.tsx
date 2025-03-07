import { useState } from 'react';

// Mock data for trainers
const TRAINERS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Trainer ${i + 1}`,
  specialization: ['Strength', 'Cardio', 'Yoga', 'CrossFit'][
    Math.floor(Math.random() * 4)
  ],
  imageUrl: `https://picsum.photos/50?index=${i}`,
}));

interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
}

const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

const GymReservationForm = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    date: '',
    time: '',
    duration: '60',
    trainerId: '',
    sessionType: '',
    equipment: '',
    healthNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Get today's date in YYYY-MM-DD format for the date input's min attribute
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'memberId':
        return value.length < 5
          ? 'Member ID must be at least 5 characters'
          : '';
      case 'date':
        return !value ? 'Date is required' : '';
      case 'time':
        return !value ? 'Time is required' : '';
      case 'duration':
        return !value || value < 30
          ? 'Duration must be at least 30 minutes'
          : '';
      case 'trainerId':
        return !value ? 'Please select a trainer' : '';
      case 'sessionType':
        return !value ? 'Session type is required' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    setFormData((prev) => ({
      ...prev,
      trainerId: trainer.id,
    }));
    setIsDropdownOpen(false);
    setErrors((prev) => ({
      ...prev,
      trainerId: '',
    }));
  };

  const resetForm = () => {
    setFormData({
      memberId: '',
      date: '',
      time: '',
      duration: '60',
      trainerId: '',
      sessionType: '',
      equipment: '',
      healthNotes: '',
    });
    setSelectedTrainer(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, show success modal
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccessModal(true);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6" id="title">
          Gym Reservation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same... */}
          {/* Member ID */}
          <div>
            <label
              htmlFor="memberId"
              className="block text-sm font-medium text-gray-700"
            >
              Member ID
            </label>
            <input
              type="text"
              id="memberId"
              name="memberId"
              value={formData.memberId}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.memberId ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 focus:outline-none focus:ring-1 ${
                errors.memberId ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.memberId && (
              <p className="mt-1 text-sm text-red-600">{errors.memberId}</p>
            )}
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getTodayString()}
                className={`mt-1 block w-full rounded-md border ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (minutes)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2`}
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
            )}
          </div>

          {/* Trainer Selection */}
          <div className="relative">
            <label
              htmlFor="trainer"
              className="block text-sm font-medium text-gray-700"
            >
              Select Trainer
            </label>
            <div
              className="mt-1 relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div
                className={`border ${
                  errors.trainerId ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-3 py-2 cursor-pointer`}
              >
                {selectedTrainer ? (
                  <div className="flex items-center">
                    <LazyImage
                      src={selectedTrainer.imageUrl}
                      alt={selectedTrainer.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{selectedTrainer.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-500">Select a trainer</span>
                )}
              </div>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {TRAINERS.map((trainer) => (
                    <div
                      key={trainer.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleTrainerSelect(trainer)}
                    >
                      <LazyImage
                        src={trainer.imageUrl}
                        alt={trainer.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className="font-medium">{trainer.name}</div>
                        <div className="text-sm text-gray-500">
                          {trainer.specialization}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.trainerId && (
              <p className="mt-1 text-sm text-red-600">{errors.trainerId}</p>
            )}
          </div>

          {/* Session Type */}
          <div>
            <label
              htmlFor="sessionType"
              className="block text-sm font-medium text-gray-700"
            >
              Session Type
            </label>
            <select
              id="sessionType"
              name="sessionType"
              value={formData.sessionType}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.sessionType ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2`}
            >
              <option value="">Select a session type</option>
              <option value="personal">Personal Training</option>
              <option value="group">Group Class</option>
              <option value="open">Open Gym</option>
            </select>
            {errors.sessionType && (
              <p className="mt-1 text-sm text-red-600">{errors.sessionType}</p>
            )}
          </div>

          {/* Equipment */}
          <div>
            <label
              htmlFor="equipment"
              className="block text-sm font-medium text-gray-700"
            >
              Equipment Needed
            </label>
            <textarea
              id="equipment"
              name="equipment"
              value={formData.equipment}
              onChange={handleInputChange}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="List any specific equipment you need (optional)"
            />
          </div>

          {/* Health Notes */}
          <div>
            <label
              htmlFor="healthNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Health Notes
            </label>
            <textarea
              id="healthNotes"
              name="healthNotes"
              value={formData.healthNotes}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Any health conditions or concerns (optional)"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reserve Session
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Reservation Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Your gym session has been successfully reserved. You will receive
              a confirmation email shortly.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GymReservationForm;
