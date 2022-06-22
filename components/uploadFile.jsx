import React, { useEffect, useState } from "react";
import styles from "styled-components";

function UploadFile() {
  const [file, setFile] = useState({});
  const [fileNames, setFileNames] = useState([]);
  const [status, setStatus] = useState({  });
  const [statusList, setStatusList] = useState({  });


  function handleUploadFile(e) {
    e.preventDefault();
    setStatus({});
    if(!file.name){
    setStatus({selectFile:"Please select the file"});
        return;
    }
    setStatus({loading:"Loading..."});
    
    let data = new FormData();
    data.append("file", file);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        setStatus({ success: "File successfully uploaded" });
        return response.json();
        // fetch("http://localhost:8000")
        //   .then((response) => {
        //     return response.json();
        //   })
        //   .then((data) => {
        //     if (data.names?.length > 0) {
        //       setFileNames(data.names);
        //     }
        //   })
        //   .catch((err) => {
        //   });
      })
      .then((data)=>{
      setFileNames((val)=>{
        let temp=[...val];
        temp.push(data[0].filename);
        return temp;
      })})
      .catch((err) => {
        setStatus({ error: err });
      });

    // fetch('http://localhost:8000/download/?filename=error.PNG').then(response => {

    //     setStatus({msg: "File successfully uploaded"});
    //     return response;
    // }).then((data)=>console.log(data))
    // .catch(err => {
    //     console.log(err);
    //     setStatus({error: err});
    // });
  }

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => {
        setStatusList({ success: "File successfully uploaded" });
        return response.json();
      })
      .then((data) => {
        if (data.names?.length > 0) {
          setFileNames(data.names);
        }
      })
      .catch((err) => {
        setStatusList({ error: err });
      });
  }, []);
  return (
    <MainDiv>
      <form onSubmit={handleUploadFile}>
        <h1>Upload a file</h1>
        <div className="uploadCont">
          <img src="/upload.svg" alt="" />
          <input
            onChange={(val) => setFile(val.target.files[0])}
            type="file"
            id="myFile"
            name="filename"
          />
        </div>
        {status.selectFile && <p className="status red">{status.selectFile}</p>}
        {status.error && <p className="status red">{status.error}</p>}
        {status.success && <p className="status green">{status.success}</p>}
        {status.loading && <p className="status green">{status.loading}</p>}
        
        <input className="submit" type="submit" />
      </form>
      <div className="names">
        <h2>Uploaded files</h2>
        {statusList.error && <p className="status red">{status.error}</p>}

        {fileNames.map((val, index) => (

          <a
            key={index}
            href={`http://localhost:8000/download/?filename=${val}`}
          >
            <img src="/file.svg" alt="" />
            <span> {val} </span>
          </a>
        ))}
      </div>
    </MainDiv>
  );
}

export default UploadFile;

const MainDiv = styles.div`
form{
    width: 90%;
margin:auto;
max-width:900px;
.submit{
    display: block;
    background: #4d9cd9;
    color: white;
    padding: 8px 30px;
    border: none;
    border-radius: 5px;
    margin: auto;

}
.status{
    text-align: center;
    font-size: 14px;
}
.green{
    color: green;
}
.red{
    color: red;
}
h1{
    font-size:30px;
    margin-bottom: 15px;
}
}
.uploadCont{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 2px dashed #4d9cd9;
    border-radius: 12px;
    margin: 30px auto;
    img{
        height:55px;
        width:auto;
        margin-bottom: 10px;
    }
    input{
        font-size:17px;
        margin: 0px auto;
        width: 240px;

    }
}
.names{
    margin-top: 50px;
    padding: 12px;
    border: 12px;
    box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
    a{
        display: flex;
        margin-bottom: 20px;
        align-items: end;
        font-size: 15px;
        img{
            margin-right: 5px;
        }
    }
    h2{
        font-size:26px;
        margin-bottom:30px;
    }
}
`;
