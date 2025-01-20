import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div
      className="p-0 flex flex-col justify-between min-h-screen my-0"
      style={{ backgroundColor: "#efefe9" }}
    >
      <Header />
      <main
        className="p-6 flex flex-col justify-start lg:flex-row lg:justify-center w-full items-center"
        style={{ color: "#523d35" }}
      >
        <div
          className="max-w-lg p-6 mx-6 rounded-lg"
          style={{ backgroundColor: "#efefe9" }}
        >
          <h1 className="text-4xl font-bold">
            Your Ideal Job
            <br />
            Just One Click Away
          </h1>
          <br />
          <p className="text-lg">
            Find the perfect job for you by leveraging our extensive database of
            job listings and job boards.
          </p>
        </div>

        {/* Drag-and-Drop Upload Box */}
        <div className="max-w-2xl bg-white p-6 mx-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold" style={{ color: "#523d35" }}>
            Attach Your Resume
          </h1>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`mt-4 p-6 border-2 border-dashed rounded-lg cursor-pointer ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-center text-blue-500">
                Drop your file here...
              </p>
            ) : (
              <p className="text-center text-gray-500">
                Drag and drop your resume here, or click to select a file
              </p>
            )}
            <p className="text-center text-sm text-gray-400 mt-2">
              (PDF, DOC, DOCX - Max: 1 file)
            </p>
          </div>
        </div>
      </main>
      <div>
        <div
          id="About"
          className="p-10 flex flex-col lg:flex-row items-center text-center justify-center rounded-lg shadow-sm"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h1 className="text-6xl lg:text-7xl font-bold w-1/3">About Us</h1>
          <p className="w-2/3 p-6 text-lg">
            Job Navigator is a revolutionary platform that connects job seekers
            and employers. With our cutting-edge technology, we help you find
            the perfect job and build a strong professional network.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
