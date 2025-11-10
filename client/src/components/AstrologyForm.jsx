"use client";
import { useState } from "react";

function AstrologyForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Validation
    const validateStep = (step) => {
        let valid = true;
        const stepElement = document.getElementById(`step${step}`);
        const inputs = stepElement?.querySelectorAll("[required]") || [];

        inputs.forEach((input) => {
            if (!input.value) {
                input.classList.add("border-red-500");
                valid = false;
            } else {
                input.classList.remove("border-red-500");
            }
        });

        if (step === 2) {
            const categories = document.querySelectorAll("input[name='category']:checked");
            const languages = document.querySelectorAll("input[name='language']:checked");
            const specialization = document.querySelectorAll("input[name='specialization']:checked");

            if (categories.length === 0 || languages.length === 0 || specialization.length === 0) {
                alert("Please select at least one Category, Language and Specialization.");
                valid = false;
            }
        }
        return valid;
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            alert("Form Submitted Successfully!");
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <section id="register-form" className="py-20 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Registration Form</h2>
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">

                    {/* Progress */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                        <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center sm:space-x-12 space-x-6 mb-8">
                        {["Personal", "Skills", "Bank", "Documents"].map((label, i) => {
                            const step = i + 1;
                            return (
                                <div
                                    key={step}
                                    className={`text-center ${currentStep === step ? "opacity-100 text-yellow-500" : "opacity-50"}`}
                                >
                                    <div className="bg-yellow-400 text-white rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                                        {step}
                                    </div>
                                    <p className="mt-2 font-semibold">{label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* STEP 1 */}
                    {currentStep === 1 && (
                        <div id="step1" className="grid sm:grid-cols-2 gap-4">
                            <input required type="text" placeholder="Phone" className="border p-2 rounded" />
                            <input required type="text" placeholder="Name" className="border p-2 rounded" />
                            <input required type="text" placeholder="Display Name" className="border p-2 rounded" />
                            <select required className="border p-2 rounded">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <input required type="date" className="border p-2 rounded" />
                            <input required type="email" placeholder="Email" className="border p-2 rounded" />
                            <input required type="password" placeholder="Password" className="border p-2 rounded" />
                            <input required type="text" placeholder="Area" className="border p-2 rounded" />
                            <input required type="text" placeholder="Address" className="border p-2 rounded" />
                            <input required type="text" placeholder="Pincode" className="border p-2 rounded" />
                            <input required type="text" placeholder="Landmark" className="border p-2 rounded" />
                            <input required type="text" placeholder="Experience (in years)" className="border p-2 rounded" />
                        </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                        <div id="step2" className="grid sm:grid-cols-3 gap-4">
                            <div className="border p-4 rounded">
                                <p className="mb-2 font-semibold">Select Category</p>
                                <label><input type="checkbox" name="category" /> Vedic Astrology</label><br />
                                <label><input type="checkbox" name="category" /> Numerologist</label><br />
                                <label><input type="checkbox" name="category" /> Tarot Reader</label>
                            </div>
                            <div className="border p-4 rounded">
                                <p className="mb-2 font-semibold">Languages</p>
                                <label><input type="checkbox" name="language" /> English</label><br />
                                <label><input type="checkbox" name="language" /> Hindi</label><br />
                                <label><input type="checkbox" name="language" /> Bangla</label>
                            </div>
                            <div className="border p-4 rounded">
                                <p className="mb-2 font-semibold">Specialization</p>
                                <label><input type="checkbox" name="specialization" /> Astrologer</label>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                        <div id="step3" className="grid sm:grid-cols-2 gap-4">
                            <input required type="text" placeholder="Pan Card Number" className="border p-2 rounded" />
                            <input required type="text" placeholder="Account Number" className="border p-2 rounded" />
                            <input required type="text" placeholder="Account Holder Name" className="border p-2 rounded" />
                            <select required className="border p-2 rounded">
                                <option value="">Select Account Type</option>
                                <option>Saving</option>
                                <option>Current</option>
                            </select>
                            <input required type="text" placeholder="Bank Name" className="border p-2 rounded" />
                            <input required type="text" placeholder="Branch Name" className="border p-2 rounded" />
                            <input required type="text" placeholder="IFSC Code" className="border p-2 rounded" />
                            <input required type="text" placeholder="State" className="border p-2 rounded" />
                            <input required type="text" placeholder="City" className="border p-2 rounded" />
                        </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                        <div id="step4" className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Upload Aadhaar Front *</label>
                                <input required type="file" className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block mb-1">Upload Aadhaar Back *</label>
                                <input required type="file" className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block mb-1">Upload Photo *</label>
                                <input required type="file" className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block mb-1">Upload PAN Card *</label>
                                <input required type="file" className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block mb-1">Upload Passbook/Cancelled Cheque *</label>
                                <input required type="file" className="border p-2 w-full rounded" />
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between mt-8">
                        {currentStep > 1 ? (
                            <button onClick={prevStep} className="bg-gray-600 text-white px-6 py-2 rounded">
                                Previous
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <button onClick={nextStep} className="bg-yellow-400 text-white px-6 py-2 rounded">
                            {currentStep === totalSteps ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AstrologyForm
