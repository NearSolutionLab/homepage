import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { SpinnerService } from "./spinner.service";
import {
  catchError,
  debounce,
  debounceTime,
  map,
  timeout,
} from "rxjs/operators";
import { Attachment, Mail, Reference } from "../model/model";

const REST_SERVICE_URL = window.location.origin;
// const REST_SERVICE_URL = "http://localhost:8090";

const HTTP_DEFAULT_TIMEOUT = 10000;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    public http: HttpClient,
    public translate: TranslateService,
    public spinnerService: SpinnerService
  ) {}

  public handleError(errorStatus: any, errorMessage: any) {
    if (errorStatus) {
      if (errorStatus !== 401) {
        // this.toastService.add('error', this.translate.instant('common.error.http-communication', {code: errorStatus}));
      }
      return;
    }
    // this.toastService.add('error', this.translate.instant('common.error.server-response', {message: errorMessage}));
  }
  public callApi(
    url,
    method,
    params,
    data,
    httpTimeout = HTTP_DEFAULT_TIMEOUT
  ): Observable<any> {
    let paramsString = "";
    if (params && params instanceof Object) {
      for (const property in params) {
        if (params.hasOwnProperty(property)) {
          paramsString =
            paramsString +
            (paramsString === "" ? "?" : "&") +
            property +
            "=" +
            params[property];
        }
      }
    }
    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=utf-8"
    );
    if (method === "get") {
      this.spinnerService.add();
      return this.http.get(url + paramsString, { headers }).pipe(
        debounceTime(100),
        timeout(httpTimeout),
        map((res: Response) => {
          let resJson = null;
          try {
            resJson = res.json();
          } catch (e) {
            this.spinnerService.remove();
            return (resJson = res);
          }
          this.spinnerService.remove();
          return resJson;
        }),
        catchError((error) => {
          this.handleError(error.status, null);
          this.spinnerService.remove();
          return Observable.throw(error.message || error);
        })
      );
    } else if (method === "post") {
      this.spinnerService.add();
      return this.http
        .post(url + paramsString, JSON.stringify(data), { headers })
        .pipe(
          timeout(httpTimeout),
          map((res: Response) => {
            let resJson = null;
            try {
              resJson = res.json();
            } catch (e) {
              this.spinnerService.remove();
              return (resJson = res);
            }
            this.spinnerService.remove();
            return resJson;
          }),
          catchError((error) => {
            this.handleError(error.status, null);
            this.spinnerService.remove();
            return Observable.throw(error.message || error);
          })
        );
    }
  }

  get restServiceUrl(): string {
    return REST_SERVICE_URL;
  }

  get imageServerUrl(): string {
    return `${REST_SERVICE_URL}/imageserver`;
  }

  get downLowdUrl(): string {
    return `${REST_SERVICE_URL}/downloadFile`;
  }

  deleteTempFile(file) {
    return new Promise((resolve, reject) => {
      this.callApi(REST_SERVICE_URL + "/deleteFile", "post", null, {
        fileId: file.fileId,
        fileName: file.fileName,
      }).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this.callApi(REST_SERVICE_URL + "/uploadTempFile", "post", null, {
        file,
      }).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getReferences(currentPage: number, itemPerPage: number) {
    return new Promise((resolve, reject) => {
      this.callApi(
        `${REST_SERVICE_URL}/getReferences/${currentPage}/${itemPerPage}`,
        "get",
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getReferenceList(
    currentPage: number,
    itemPerPage: number,
    tags: string,
    keyword: string
  ) {
    if (tags === undefined || tags === "") {
      tags = null;
    }
    if (keyword == undefined || keyword == "") {
      keyword = null;
    }

    return new Promise((resolve, reject) => {
      this.callApi(
        `${REST_SERVICE_URL}/getReferences/${currentPage}/${itemPerPage}/${tags}/${keyword}`,
        "get",
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getReference(id: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        `${REST_SERVICE_URL}/getReference/${id}`,
        "get",
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  deleteReference(referece: Reference) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + "/deleteReference",
        "post",
        null,
        referece
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  setReference(referece: Reference) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + "/setReference",
        "post",
        null,
        referece
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAttachment(id: string) {
    return new Promise((resolve, reject) => {
      this.callApi(
        `${REST_SERVICE_URL}/getAttachment/${id}`,
        "get",
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAttachments(currentPage: number, itemPerPage: number) {
    return new Promise((resolve, reject) => {
      this.callApi(
        `${REST_SERVICE_URL}/getAttachments/${currentPage}/${itemPerPage}`,
        "get",
        null,
        null
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteAttachment(attachment: Attachment) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + "/deleteAttachment",
        "post",
        null,
        attachment
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  setAttachment(attachment: Attachment) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + "/setAttachment",
        "post",
        null,
        attachment
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getTags() {
    return new Promise((resolve, reject) => {
      this.callApi(`${REST_SERVICE_URL}/getTags`, "get", null, null).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  sendQuote(mail: Mail) {
    return new Promise((resolve, reject) => {
      this.callApi(
        REST_SERVICE_URL + "/sendQuote",
        "post",
        null,
        mail
      ).subscribe(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
