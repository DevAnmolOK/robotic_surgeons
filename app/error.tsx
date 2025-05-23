"use client";
 
export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surfaceLight">
      <div className="max-w-[30rem] min-h-[20rem] w-full flex flex-col justify-center items-center border border-gray-200 shadow-xl rounded-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-midnightBlue mb-4">
          Something went wrong
        </h1>
        <p className="text-steelGray mb-8 text-base md:text-lg">
          Oops! Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-block text-navyBlue text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}