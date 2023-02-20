import React, { useState } from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const licenseTypes = [
  "Apache-2.0",
  "Artistic-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "CC0-1.0",
  "CC-BY-4.0",
  "CC-BY-NC-4.0",
  "CC-BY-NC-ND-4.0",
  "CC-BY-NC-SA-4.0",
  "CC-BY-ND-4.0",
  "CC-BY-SA-4.0",
  "CDLA-Permissive-1.0",
  "CDLA-Sharing-1.0",
  "EPL-1.0",
  "EPL-2.0",
  "GPL-2.0",
  "GPL-3.0",
  "LGPL-2.1",
  "LGPL-3.0",
  "MIT",
  "MPL-2.0",
  "PHP-3.0",
  "Python-2.0",
  "W3C",
];

const Form = () => {
  const [licenses, setLicenses] = useState([{ type: "", url: "" }]);
  const [packageName, setPackageName] = useState("");
  const [packageUrl, setPackageUrl] = useState("");
  const [claUrl, setClaUrl] = useState("");
  const [boxUrl, setBoxUrl] = useState("");

  const handleLicenseTypeChange = (event, index) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index].type = event.target.value;
    setLicenses(updatedLicenses);
  };

  const handleLicenseUrlChange = (event, index) => {
    const updatedLicenses = [...licenses];
    updatedLicenses[index].url = event.target.value;
    setLicenses(updatedLicenses);
  };

  const handleAddLicense = () => {
    setLicenses([...licenses, { type: "", url: "" }]);
  };

  const handleRemoveLicense = (index) => {
    const updatedLicenses = [...licenses];
    updatedLicenses.splice(index, 1);
    setLicenses(updatedLicenses);
  };

  const handleDownloadJson = () => {
    const licenseTypesArray = licenses.map((license) => license.type);
    const licenseUrlArray = licenses.map((license) => license.url);
    const data = {
      Package_Name: packageName,
      Package_URL: packageUrl,
      CLA_URL: claUrl,
      Box_URL: boxUrl,
      license_types: licenseTypesArray,
      license_urls: licenseUrlArray,
    };
    console.log(data);
    const filename = "ossc.json";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    // setTimeout(4000);
    // window.location.reload();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <form onSubmit={handleDownloadJson}>
            <div className="form-group">
              <label htmlFor="p_name">Package Name:</label>
              <input
                className="form-control"
                required
                pattern="^(?![0-9]).{3,}$"
                type="text"
                id="p_name"
                value={packageName}
                onChange={(event) => setPackageName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="p_url">Package URL:</label>
              <input
                className="form-control"
                pattern="https?://.+?\..+"
                required
                type="url"
                id="p_url"
                value={packageUrl}
                onChange={(event) => setPackageUrl(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="c_url">CLA URL:</label>
              <input
                className="form-control"
                pattern="https?://.+?\..+"
                required
                type="url"
                id="c_url"
                value={claUrl}
                onChange={(event) => setClaUrl(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="b_url">Box URL:</label>
              <input
                className="form-control"
                pattern="https?://.+?\..+"
                required
                type="url"
                id="b_url"
                value={boxUrl}
                onChange={(event) => setBoxUrl(event.target.value)}
              />
              <br></br>
            </div>

            <div className="row justify-content-center">
              <div className="form-inline col-sm-12">
                {licenses.map((license, index) => (
                  <div key={index}>
                    <label
                      style={{ borderRight: "10px solid white" }}
                      htmlFor={`licenseType-${index}`}
                    >
                      License Type:
                    </label>
                    <select
                      className="form-group mb-2"
                      required
                      id={`licenseType-${index}`}
                      value={license.type}
                      onChange={(event) =>
                        handleLicenseTypeChange(event, index)
                      }
                    >
                      <option value=""></option>
                      {licenseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <label
                      style={{ borderLeft: "10px solid white" }}
                      htmlFor={`licenseUrl-${index}`}
                    >
                      License URL:
                    </label>
                    <input
                      className="form-group mx-sm-3 mb-2"
                      pattern="https?://.+?\..+"
                      required
                      id={`licenseUrl-${index}`}
                      value={license.url}
                      onChange={(event) => handleLicenseUrlChange(event, index)}
                    />
                    {index ? (
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleRemoveLicense(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ))}
                <br></br>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddLicense}
                >
                  Add License
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-success">
              Download JSON file
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
