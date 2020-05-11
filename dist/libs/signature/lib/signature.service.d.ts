import { HttpClient } from "@angular/common/http";
import { ConfigService, FileCredentials } from "@groupdocs.examples.angular/common-components";
import { AddedSignature, DraggableSignature, FileListWithParams, SignatureProps } from "./signature-models";
import { Observable } from 'rxjs';
export declare class SignatureService {
    private _http;
    private _config;
    private _observer;
    private readonly _refreshSignatures;
    constructor(_http: HttpClient, _config: ConfigService);
    readonly getRefreshSignatures: Observable<any>;
    loadFiles(path: string): Observable<Object>;
    loadFile(credentials: FileCredentials): Observable<Object>;
    upload(file: File, url: string, rewrite: boolean, signType: string): Observable<Object>;
    loadPage(credentials: FileCredentials, page: number): Observable<Object>;
    getDownloadUrl(credentials: FileCredentials): string;
    loadPrint(credentials: FileCredentials): Observable<Object>;
    loadPrintPdf(credentials: FileCredentials): Observable<Blob>;
    getSignatures(path: string, type: string): Observable<Object>;
    removeSignatures(guid: string, type: string): Observable<Object>;
    uploadSignature(data: FileListWithParams, rewrite: boolean): Observable<Object>;
    getCode(text: string, temp: boolean, type: string): Observable<Object>;
    loadSignatureImage(sign: DraggableSignature): Observable<AddedSignature>;
    saveTextSignature(data: AddedSignature): Observable<SignatureProps>;
    saveImage(img: string): Observable<Object>;
    saveStamp(img: string, props: any[]): Observable<Object>;
    sign(credentials: FileCredentials, signatures: any[]): Observable<Object>;
    downloadSigned(credentials: FileCredentials, signatures: any[]): Observable<Blob>;
    refreshSignatures(): void;
}
