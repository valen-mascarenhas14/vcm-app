import React, { useState } from 'react';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//const licenseTypes = ['Type A', 'Type B', 'Type C'];

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
  const [licenses, setLicenses] = useState([{ type: '', url: '' }]);
  const [packageUrlError, setPackageUrlError] = useState("");
  const [rtcUrlError, setRtcUrlError] = useState(""); 
  const [rtcTaskUrl, setRtcTaskUrl] = useState('');
  const [claUrlError, setClaUrlError] = useState("");
  const [boxUrlError, setBoxUrlError] = useState("");
  const [packageName, setPackageName] = useState('');
  const [packageUrl, setPackageUrl] = useState('');
  const [claUrl, setClaUrl] = useState('');
  const [boxUrl, setBoxkUrl] = useState('');
  const [dueDate, setDueDate] = useState('');

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

  
  
  const validateUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };
  
  const handlePackageUrlChange = (event) => {
    const url = event.target.value;
    setPackageUrl(url);
    if (!url) {
      setPackageUrlError("Package URL cannot be empty.");
    } else if (!validateUrl(url)) {
      setPackageUrlError("Please enter a valid URL.");
    } else {
      setPackageUrlError("");
    }
  };

  const handleRtcUrlChange = (event) => {
    const url = event.target.value;
    setPackageUrl(url);
    if (!url) {
      setRtcUrlError("RTC URL cannot be empty.");
    } else if (!validateUrl(url)) {
      setRtcUrlError("Please enter a valid URL.");
    } else {
      setRtcUrlError("");
    }
  };
  


  const handleClaUrlChange = (event) => {
    const url = event.target.value;
    setClaUrl(url);
    if (!url) {
      setClaUrlError("CLA URL cannot be empty.");
    } else if (!validateUrl(url)) {
      setClaUrlError("Please enter a valid URL.");
    } else {
      setClaUrlError("");
    }
  };

  const handleBoxUrlChange = (event) => {
    const url = event.target.value;
    setBoxUrlError(url);
    if (!url) {
      setBoxUrlError("Box URL cannot be empty.");
    } else if (!validateUrl(url)) {
      setBoxUrlError("Please enter a valid URL.");
    } else {
      setBoxUrlError("");
    }};


  const handleAddLicense = () => {
    setLicenses([...licenses, { type: '', url: '' }]);
  };

  const handleRemoveLicense = (index) => {
    const updatedLicenses = [...licenses];
    updatedLicenses.splice(index, 1);
    setLicenses(updatedLicenses);
  };


  const handleDownloadJson = () => {
    const licenseTypesArray = licenses.map((license) => license.type);
    const licenseUrlsObject = {};
    licenses.forEach((license) => {
      licenseUrlsObject[license.type] = license.url;
    });
    const data = {
      Package_Name: packageName,
      Package_URL: packageUrl,
      Task_URL: rtcTaskUrl,
      CLA_URL: claUrl,
      Box_URL: boxUrl,
      Due_Date: dueDate,
      license_types: licenseTypesArray,
      license_urls: licenseUrlsObject,
    };
    console.log(data);
    const filename = 'ossc.json';
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    setTimeout(4000);
    window.location.reload()
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-8'>
        <form id='1'>
        <div className='form-group'>
          <label htmlFor="p_name">Package Name:</label>
        <input className="form-control" type="text" id="p_name"  value={packageName} onChange={(event) => setPackageName(event.target.value)} />
          </div>
          <div className='form-group'>
          <label htmlFor="p_url">Package URL:</label>
        <input className="form-control"  type="url" id="p_url"  value={packageUrl} onBlur={handlePackageUrlChange} onChange={(event) => setPackageUrl(event.target.value)} />
        {packageUrlError && (
            <div className="text-danger">{packageUrlError}</div>
          )}
          </div>
          <div className='form-group'>
          <label htmlFor="c_url">CLA URL:</label>
        <input className="form-control" type="url" id="c_url"  value={claUrl} onBlur={handleClaUrlChange} onChange={(event) => setClaUrl(event.target.value)} />
        {packageUrlError && (
            <div className="text-danger">{claUrlError}</div>
          )}
          </div>
        <div className='form-group'>
        <label htmlFor="r_url">RTC_TASK_URL:</label>
        <input className="form-control" type="url" id="r_url" value={rtcTaskUrl} onChange={(event) => setRtcTaskUrl(event.target.value)} onBlur={handleRtcUrlChange}  />
        {packageUrlError && (
            <div className="text-danger">{rtcUrlError}</div>
          )}
        </div>
       <div className='form-group'>
       <label htmlFor="b_url">Box URL:</label>
        <input className="form-control" type="url" id="b_url" onBlur={handleBoxUrlChange}  value={boxUrl} onChange={(event) => setBoxkUrl(event.target.value)} />
        {packageUrlError && (
            <div className="text-danger">{boxUrlError}</div>
          )}
       </div>
      <div className='form-group'>
      <label htmlFor="d_date">Due Date:</label>
        <input className="form-control" type="date" id="d_date"  value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </div>
        </form>
        <br></br>
        </div>
      </div>

    <div className='row justify-content-center'>
      <div className='form-inline col-sm-8'>
      {licenses.map((license, index) => (
        <div key={index}>
          <label style={{ borderRight: '10px solid white' }}   htmlFor={`licenseType-${index}`}>License Type:</label>
          <select className="form-group mb-2" id={`licenseType-${index}`} value={license.type} onChange={(event) => handleLicenseTypeChange(event, index)}>
            <option value=""></option>
            {licenseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label style={{ borderLeft: '10px solid white' }}  htmlFor={`licenseUrl-${index}`}>License URL:</label>
          <input className="form-group mx-sm-3 mb-2" pattern="https?://.+?\..+" required type="url" id={`licenseUrl-${index}`} value={license.url} onChange={(event) => handleLicenseUrlChange(event, index)} />
          {
                index ? 
                  <button className="btn btn-danger" type="button"  onClick={() => handleRemoveLicense(index)} >Remove</button> 
                : null
              }
             
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={handleAddLicense}>Add License</button>
      </div>

    </div>

      <button className="btn btn-success" onClick={handleDownloadJson}>Download JSON file</button>
    </div>
  );
};

export default Form;
