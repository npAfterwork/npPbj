import {HttpErrorResponse} from '@angular/common/http';

export type BrowserError = { error?: string } | Error | null | undefined | HttpErrorResponse;
export type ErrorCallback = (err?: BrowserError) => void;
export type DataCallback<T> = (err?: BrowserError, data?: T) => void;
export type TNPHexColor = string;
