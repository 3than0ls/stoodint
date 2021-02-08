import XHMLHttpRequest from 'xhr2'
global.XMLHttpRequest = XHMLHttpRequest
import { decode, encode } from 'base-64'
global.btoa = encode
global.atob = decode
