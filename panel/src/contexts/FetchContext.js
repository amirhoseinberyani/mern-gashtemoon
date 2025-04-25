/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";
import { AlertContext } from "../components/alert/AlertContext";
import { LoginContext } from "./LoginContext";
import { lang } from "../localization";
import { API } from "../constants/api";
import { CircularProgress, Grid, Modal } from "@material-ui/core";

const FetchContext = createContext({
  fetchPost: (url, body) => { },
  fetchPut: (url, body) => { },
  fetchGet: (url) => { },
  fetchDelete: (url) => { },
  fetchUpload: (url, name, file, body) => { },
});
export { FetchContext };

function FetchContextProvider({ children }) {
  let { showSuccesAlert, showErrorAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  let { token } = useContext(LoginContext);

  const fetchPost = (url, body, customLang) => {
    setLoading(true);
    return new Promise((res, rej) => {
      var status;
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token,
          localization: customLang ? customLang : lang,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responsJson) => {
          if (status === 401 || status === 500) {
            showErrorAlert(responsJson.message);
          } else if (status === 200 || status === 201) {
            showSuccesAlert(responsJson.message);
          }
          if (status === 401) {
            localStorage.clear();
            window.location.reload();
          }
          res({ status: status, data: responsJson });
          setLoading(false);
        })
        .catch((e) => {
          showErrorAlert("Internet Error");
          res({ status: 500, data: [] });
          setLoading(false);
        });
    });
  };

  const fetchPut = (url, body) => {
    setLoading(true);
    return new Promise((res, rej) => {
      var status;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: token,
          localization: lang,
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responsJson) => {
          if (status === 401 || status === 500) {
            showErrorAlert(responsJson.message);
          } else if (status === 200 || status === 201) {
            showSuccesAlert(responsJson.message);
          }
          if (status === 401) {
            // window.location.reload();
          }
          res({ status: status, data: responsJson });
          setLoading(false);
        })
        .catch((e) => {
          showErrorAlert("Internet Error");
          res({ status: 500, data: [] });
          setLoading(false);
        });
    });
  };

  const fetchGet = (url) => {
    setLoading(true);
    return new Promise((res, rej) => {
      var status;
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: token,
          localization: lang,
        },
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responsJson) => {
          if (status === 401 || status === 500) {
            showErrorAlert(responsJson.message);
          } else if (status === 200 || status === 201) {
            showSuccesAlert(responsJson.message);
          }
          if (status === 401) {
            // localStorage.clear()
            // window.location.reload()
          }
          res({ status: status, data: responsJson });
          setLoading(false);
        })
        .catch((e) => {
          showErrorAlert("Internet Error");
          res({ status: 500, data: [] });
          setLoading(false);
        });
    });
  };

  const fetchUpload = (url, name, file, body) => {
    setLoading(true);
    return new Promise((res, rej) => {
      var status;
      var formData = new FormData();
      body &&
        body.forEach((element) => {
          formData.append(element.title, element.value);
        });
      formData.append(name, file);
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          localization: lang,
        },
        body: formData,
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responsJson) => {
          if (status === 401 || status === 500) {
            showErrorAlert(responsJson.message);
          } else if (status === 200 || status === 201) {
            showSuccesAlert(responsJson.message);
          }
          res({ status: status, data: responsJson });
          setLoading(false);
        })
        .catch((e) => {
          showErrorAlert("Internet Error");
          res({ status: 500, data: [] });
          setLoading(false);
        });
    });
  };

  const fetchUpvload = async (file) => {
    var formData = new FormData();
    formData.append("file", file);

    // Step 1: start the fetch and obtain a reader
    let response = await fetch(API.App.Upload, {
      method: "POST",
      headers: {
        Authorization: token,
        localization: lang,
      },
      body: formData,
    });

    const reader = response.body.getReader();

    // Step 2: get total length
    const contentLength = +response.headers.get("Content-Length");

    // Step 3: read the data
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
    }

    // Step 4: concatenate chunks into single Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }

    // Step 5: decode into a string
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // We're done!
    let commits = JSON.parse(result);
    alert(commits[0].author.login);
  };

  const fetchDelete = (url) => {
    setLoading(true);
    return new Promise((res, rej) => {
      var status;
      fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: token,
          localization: lang,
        },
      })
        .then((response) => {
          status = response.status;
          return response.json();
        })
        .then((responsJson) => {
          if (status === 401 || status === 500) {
            showErrorAlert(responsJson.message);
          } else if (status === 200 || status === 201) {
            showSuccesAlert(responsJson.message);
          }
          if (status === 401) {
            // localStorage.clear()
            // window.location.reload()
          }
          res({ status: status, data: responsJson });
          setLoading(false);
        })
        .catch((e) => {
          showErrorAlert("Internet Error");
          res({ status: 500, data: [] });
          setLoading(false);
        });
    });
  };

  return (
    <FetchContext.Provider
      value={{ fetchPost, fetchUpload, fetchPut, fetchGet, fetchDelete }}
    >
      {children}
      <Modal open={loading}>
        <Grid
          container
          style={{ height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" />
        </Grid>
      </Modal>
    </FetchContext.Provider>
  );
}
export default FetchContextProvider;
