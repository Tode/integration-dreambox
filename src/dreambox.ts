import * as uc from "@unfoldedcircle/integration-api";
import { XMLParser } from "fast-xml-parser";

import * as config from "./config.js";

const RC_DREAMBOX_MAP: Record<string, number> = {
  POWER: 116,
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  "5": 6,
  "6": 7,
  "7": 8,
  "8": 9,
  "9": 10,
  "0": 11,
  PREVIOUS: 412,
  NEXT: 407,
  VOLUME_UP: 115,
  VOLUME_DOWN: 114,
  MUTE: 113,
  BOUQUET_UP: 402,
  BOUQUET_DOWN: 403,
  BACK: 174,
  INFO: 358,
  CURSOR_UP: 103,
  CURSOR_DOWN: 108,
  CURSOR_LEFT: 105,
  CURSOR_RIGHT: 106,
  MENU: 139,
  OK: 352,
  HELP: 138,
  AUDIO: 392,
  VIDEO: 393,
  RED: 398,
  GREEN: 399,
  YELLOW: 400,
  BLUE: 401,
  REWIND: 168,
  PLAY: 207,
  STOP: 128,
  FORWARD: 159,
  TV: 377,
  RADIO: 385,
  TEXT: 388,
  RECORD: 167,
  EXIT: 1,
  PLAYPAUSE: 164,
  TIMESHIFT: 119,
  SUBTITLE: 370
};

const RC_DREAMBOX_MAP_EXTENDED: Record<string, number> = {
  XKBD_ESC: 1,
  XKBD_MINUS: 12,
  XKBD_EQUAL: 13,
  XKBD_BACKSPACE: 14,
  XKBD_TAB: 15,
  XKBD_Q: 16,
  XKBD_W: 17,
  XKBD_E: 18,
  XKBD_R: 19,
  XKBD_T: 20,
  XKBD_Y: 21,
  XKBD_U: 22,
  XKBD_I: 23,
  XKBD_O: 24,
  XKBD_P: 25,
  XKBD_LEFTBRACE: 26,
  XKBD_RIGHTBRACE: 27,
  XKBD_ENTER: 28,
  XKBD_LEFTCTRL: 29,
  XKBD_A: 30,
  XKBD_S: 31,
  XKBD_D: 32,
  XKBD_F: 33,
  XKBD_G: 34,
  XKBD_H: 35,
  XKBD_J: 36,
  XKBD_K: 37,
  XKBD_L: 38,
  XKBD_SEMICOLON: 39,
  XKBD_APOSTROPHE: 40,
  XKBD_GRAVE: 41,
  XKBD_LEFTSHIFT: 42,
  XKBD_BACKSLASH: 43,
  XKBD_Z: 44,
  XKBD_X: 45,
  XKBD_C: 46,
  XKBD_V: 47,
  XKBD_B: 48,
  XKBD_N: 49,
  XKBD_M: 50,
  XKBD_COMMA: 51,
  XKBD_DOT: 52,
  XKBD_SLASH: 53,
  XKBD_RIGHTSHIFT: 54,
  XKBD_KPASTERISK: 55,
  XKBD_LEFTALT: 56,
  XKBD_SPACE: 57,
  XKBD_CAPSLOCK: 58,
  XKBD_F1: 59,
  XKBD_F2: 60,
  XKBD_F3: 61,
  XKBD_F4: 62,
  XKBD_F5: 63,
  XKBD_F6: 64,
  XKBD_F7: 65,
  XKBD_F8: 66,
  XKBD_F9: 67,
  XKBD_F10: 68,
  XKBD_NUMLOCK: 69,
  XKBD_SCROLLLOCK: 70,
  XKBD_KP7: 71,
  XKBD_KP8: 72,
  XKBD_KP9: 73,
  XKBD_KPMINUS: 74,
  XKBD_KP4: 75,
  XKBD_KP5: 76,
  XKBD_KP6: 77,
  XKBD_KPPLUS: 78,
  XKBD_KP1: 79,
  XKBD_KP2: 80,
  XKBD_KP3: 81,
  XKBD_KP0: 82,
  XKBD_KPDOT: 83,
  XKBD_103RD: 84,
  XKBD_F13: 85,
  XKBD_102ND: 86,
  XKBD_F11: 87,
  XKBD_F12: 88,
  XKBD_F14: 89,
  XKBD_F15: 90,
  XKBD_F16: 91,
  XKBD_F17: 92,
  XKBD_F18: 93,
  XKBD_F19: 94,
  XKBD_F20: 95,
  XKBD_KPENTER: 96,
  XKBD_RIGHTCTRL: 97,
  XKBD_KPSLASH: 98,
  XKBD_SYSRQ: 99,
  XKBD_RIGHTALT: 100,
  XKBD_LINEFEED: 101,
  XKBD_HOME: 102,
  XKBD_UP: 103,
  XKBD_PAGEUP: 104,
  XKBD_LEFT: 105,
  XKBD_RIGHT: 106,
  XKBD_END: 107,
  XKBD_DOWN: 108,
  XKBD_PAGEDOWN: 109,
  XKBD_INSERT: 110,
  XKBD_DELETE: 111,
  XKBD_MACRO: 112,
  XKBD_MUTE: 113,
  XKBD_VOLUMEDOWN: 114,
  XKBD_VOLUMEUP: 115,
  XKBD_POWER: 116,
  XKBD_KPEQUAL: 117,
  XKBD_KPPLUSMINUS: 118,
  XKBD_PAUSE: 119,
  XKBD_F21: 120,
  XKBD_F22: 121,
  XKBD_F23: 122,
  XKBD_F24: 123,
  XKBD_KPCOMMA: 124,
  XKBD_LEFTMETA: 125,
  XKBD_RIGHTMETA: 126,
  XKBD_COMPOSE: 127,
  XKBD_STOP: 128,
  XKBD_AGAIN: 129,
  XKBD_PROPS: 130,
  XKBD_UNDO: 131,
  XKBD_FRONT: 132,
  XKBD_COPY: 133,
  XKBD_OPEN: 134,
  XKBD_PASTE: 135,
  XKBD_FIND: 136,
  XKBD_CUT: 137,
  XKBD_HELP: 138,
  XKBD_MENU: 139,
  XKBD_CALC: 140,
  XKBD_SETUP: 141,
  XKBD_SLEEP: 142,
  XKBD_WAKEUP: 143,
  XKBD_FILE: 144,
  XKBD_SENDFILE: 145,
  XKBD_DELETEFILE: 146,
  XKBD_XFER: 147,
  XKBD_PROG1: 148,
  XKBD_PROG2: 149,
  XKBD_WWW: 150,
  XKBD_MSDOS: 151,
  XKBD_COFFEE: 152,
  XKBD_DIRECTION: 153,
  XKBD_CYCLEWINDOWS: 154,
  XKBD_MAIL: 155,
  XKBD_BOOKMARKS: 156,
  XKBD_COMPUTER: 157,
  XKBD_BACK: 158,
  XKBD_FORWARD: 159,
  XKBD_CLOSECD: 160,
  XKBD_EJECTCD: 161,
  XKBD_EJECTCLOSECD: 162,
  XKBD_NEXTSONG: 163,
  XKBD_PLAYPAUSE: 164,
  XKBD_PREVIOUSSONG: 165,
  XKBD_STOPCD: 166,
  XKBD_RECORD: 167,
  XKBD_REWIND: 168,
  XKBD_PHONE: 169,
  XKBD_ISO: 170,
  XKBD_CONFIG: 171,
  XKBD_HOMEPAGE: 172,
  XKBD_REFRESH: 173,
  XKBD_EXIT: 174,
  XKBD_MOVE: 175,
  XKBD_EDIT: 176,
  XKBD_SCROLLUP: 177,
  XKBD_SCROLLDOWN: 178,
  XKBD_KPLEFTPAREN: 179,
  XKBD_KPRIGHTPAREN: 180,
  XKBD_INTL1: 181,
  XKBD_INTL2: 182,
  XKBD_INTL3: 183,
  XKBD_INTL4: 184,
  XKBD_INTL5: 185,
  XKBD_INTL6: 186,
  XKBD_INTL7: 187,
  XKBD_INTL8: 188,
  XKBD_INTL9: 189,
  XKBD_LANG1: 190,
  XKBD_LANG2: 191,
  XKBD_LANG3: 192,
  XKBD_LANG4: 193,
  XKBD_LANG5: 194,
  XKBD_LANG6: 195,
  XKBD_LANG7: 196,
  XKBD_LANG8: 197,
  XKBD_LANG9: 198,
  XKBD_PLAYCD: 200,
  XKBD_PAUSECD: 201,
  XKBD_PROG3: 202,
  XKBD_PROG4: 203,
  XKBD_SUSPEND: 205,
  XKBD_CLOSE: 206,
  XKBD_FASTFORWARD: 208,
  XKBD_BASSBOOST: 209,
  XKBD_PRINT: 210,
  XKBD_HP: 211,
  XKBD_CAMERA: 212,
  XKBD_SOUND: 213,
  XKBD_QUESTION: 214,
  XKBD_EMAIL: 215,
  XKBD_CHAT: 216,
  XKBD_SEARCH: 217,
  XKBD_CONNECT: 218,
  XKBD_FINANCE: 219,
  XKBD_SPORT: 220,
  XKBD_SHOP: 221,
  XKBD_ALTERASE: 222,
  XKBD_CANCEL: 223,
  XKBD_BRIGHTNESSDOWN: 224,
  XKBD_BRIGHTNESSUP: 225,
  XKBD_MEDIA: 226,
  XKBD_UNKNOWN: 240,
  XKBD_SELECT: 353,
  XKBD_GOTO: 354,
  XKBD_CLEAR: 355,
  XKBD_POWER2: 356,
  XKBD_OPTION: 357,
  XKBD_TIME: 359,
  XKBD_VENDOR: 360,
  XKBD_ARCHIVE: 361,
  XKBD_PROGRAM: 362,
  XKBD_CHANNEL: 363,
  XKBD_FAVORITES: 364,
  XKBD_EPG: 365,
  XKBD_PVR: 366,
  XKBD_MHP: 367,
  XKBD_LANGUAGE: 368,
  XKBD_TITLE: 369,
  XKBD_ANGLE: 371,
  XKBD_ZOOM: 372,
  XKBD_MODE: 373,
  XKBD_KEYBOARD: 374,
  XKBD_SCREEN: 375,
  XKBD_PC: 376,
  XKBD_TV2: 378,
  XKBD_VCR: 379,
  XKBD_VCR2: 380,
  XKBD_SAT: 381,
  XKBD_SAT2: 382,
  XKBD_CD: 383,
  XKBD_TAPE: 384,
  XKBD_TUNER: 386,
  XKBD_PLAYER: 387,
  XKBD_TEXT: 388,
  XKBD_DVD: 389,
  XKBD_AUX: 390,
  XKBD_MP3: 391,
  XKBD_DIRECTORY: 394,
  XKBD_LIST: 395,
  XKBD_MEMO: 396,
  XKBD_CALENDAR: 397,
  XKBD_FIRST: 404,
  XKBD_LAST: 405,
  XKBD_AB: 406,
  XKBD_RESTART: 408,
  XKBD_SLOW: 409,
  XKBD_SHUFFLE: 410,
  XKBD_BREAK: 411,
  XKBD_DIGITS: 413,
  XKBD_TEEN: 414,
  XKBD_TWEN: 415,
  XKBD_DEL_EOL: 448,
  XKBD_DEL_EOS: 449,
  XKBD_INS_LINE: 450,
  XKBD_DEL_LINE: 451,
  XKBD_ASCII: 510,
  XKBD_MAX: 511,
  XBTN_0: 256,
  XBTN_1: 257
};

class DreamboxInfoResult {
  name: string;
  macAddress: string;
  entityId: string;

  constructor(name: string, macAddress: string) {
    this.name = name;
    this.macAddress = macAddress;
    this.entityId = `remote-${macAddress.replaceAll(":", "")}`;
  }
}

class DreamboxCommandResult<EntityStateType> {
  entityId: string;
  entityStateType: string;
  statusCode: uc.StatusCodes;
  entityState: EntityStateType;
  error: any;

  constructor(
    entityId: string,
    entityStateType: string,
    statusCode: uc.StatusCodes,
    entityState: EntityStateType,
    error: any = undefined
  ) {
    this.entityId = entityId;
    this.entityStateType = entityStateType;
    this.statusCode = statusCode;
    this.entityState = entityState;
    this.error = error;
  }
}

function getFetchOptions(username: string, password: string) {
  const options: {
    method: string;
    headers: { [key: string]: string };
  } = {
    method: "GET",
    headers: {
      Accept: "application/xml"
    }
  };

  if (username && password) {
    const token = Buffer.from(`${username}:${password}`).toString("base64");
    options.headers["Authorization"] = `Basic ${token}`;
  }

  return options;
}

async function getDreamboxInfo(deviceAddress: string, username: string, password: string): Promise<DreamboxInfoResult> {
  const url = `http://${deviceAddress}/web/deviceinfo`;
  const options = getFetchOptions(username, password);
  return new Promise(function (resolve, reject) {
    fetch(url, options)
      .then(async (response) => {
        if (response.status == 200) {
          const responseText = await response.text();
          const xmlParser = new XMLParser();
          const xmlData = xmlParser.parse(responseText);
          const deviceName = xmlData["e2deviceinfo"]["e2devicename"];
          const macAddress = xmlData["e2deviceinfo"]["e2network"]["e2interface"]["e2mac"];

          resolve(new DreamboxInfoResult(deviceName, macAddress));
        } else {
          reject(`Response code ${response.status}`);
        }
      })
      .catch((error) => {
        reject(`Response error ${error}`);
      });
  });
}

async function getDreamboxPromise<StateType>(
  url: string,
  username: string,
  password: string,
  entityId: string,
  entityStateType: string,
  xmlRoot: string,
  xmlChild: string,
  positiveXmlValue: any,
  positiveStatusCode: uc.StatusCodes,
  negativeStatusCode: uc.StatusCodes,
  positiveEntityState: StateType | undefined,
  negativeEntityState: StateType | undefined
): Promise<DreamboxCommandResult<StateType | undefined>> {
  const options = getFetchOptions(username, password);
  return new Promise(function (resolve, reject) {
    fetch(url, options)
      .then(async (response) => {
        if (response.status == 200) {
          const responseText = await response.text();
          const xmlParser = new XMLParser();
          const xmlData = xmlParser.parse(responseText);
          const result = xmlData[xmlRoot][xmlChild];

          if (positiveXmlValue == undefined || result == positiveXmlValue) {
            resolve(new DreamboxCommandResult(entityId, entityStateType, positiveStatusCode, positiveEntityState));
          } else {
            resolve(new DreamboxCommandResult(entityId, entityStateType, negativeStatusCode, negativeEntityState));
          }
        } else {
          resolve(
            new DreamboxCommandResult(
              entityId,
              entityStateType,
              uc.StatusCodes.ServerError,
              undefined,
              `Response code ${response.status}`
            )
          );
        }
      })
      .catch((error) => {
        resolve(new DreamboxCommandResult(entityId, entityStateType, uc.StatusCodes.ServerError, undefined, error));
      });
  });
}

const sendRemoteCommand = async function (
  device: config.DreamboxDevice,
  commandId: number,
  sendLong: boolean
): Promise<DreamboxCommandResult<uc.RemoteStates | undefined>> {
  let longCommand = sendLong ? '&type=long' : ''
  const url = `http://${device.address}/web/remotecontrol?command=${commandId}${longCommand}`;
  return getDreamboxPromise<uc.RemoteStates>(
    url,
    device.username,
    device.password,
    device.id,
    uc.RemoteAttributes.State,
    "e2remotecontrol",
    "e2result",
    "True",
    uc.StatusCodes.Ok,
    uc.StatusCodes.ServerError,
    undefined,
    undefined
  );
};

const sendPowerState = async function (
  device: config.DreamboxDevice,
  remoteCommand: uc.RemoteCommands
): Promise<DreamboxCommandResult<uc.RemoteStates | undefined>> {
  const powerStateQueryParamValue = remoteCommand == uc.RemoteCommands.On ? 4 : 5;
  const url = `http://${device.address}/web/powerstate?newstate=${powerStateQueryParamValue}`;
  // For some reason Dreambox is not always returning the correct standby value when setting power.
  // Ignoring the expected value here.
  return getDreamboxPromise<uc.RemoteStates | undefined>(
    url,
    device.id,
    device.username,
    device.password,
    uc.RemoteAttributes.State,
    "e2powerstate",
    "e2instandby",
    undefined,
    uc.StatusCodes.Ok,
    uc.StatusCodes.ServerError,
    remoteCommand == uc.RemoteCommands.On ? uc.RemoteStates.On : uc.RemoteStates.Off,
    uc.RemoteStates.Unknown
  );
};

const getPowerState = async function (
  device: config.DreamboxDevice
): Promise<DreamboxCommandResult<uc.RemoteStates | undefined>> {
  const url = `http://${device.address}/web/powerstate`;
  return getDreamboxPromise<uc.RemoteStates | undefined>(
    url,
    device.username,
    device.password,
    device.id,
    uc.RemoteAttributes.State,
    "e2powerstate",
    "e2instandby",
    true,
    uc.StatusCodes.Ok,
    uc.StatusCodes.Ok,
    uc.RemoteStates.Off,
    uc.RemoteStates.On
  );
};

const sendDownmixState = async function (
  device: config.DreamboxDevice,
  remoteCommand: uc.RemoteCommands.On | uc.RemoteCommands.Off | uc.RemoteCommands.Toggle
): Promise<DreamboxCommandResult<uc.SwitchStates | undefined>> {
  let downmixStateQueryParamValue = undefined;

  switch (remoteCommand) {
    case uc.RemoteCommands.On:
      downmixStateQueryParamValue = "True";
      break;
    case uc.RemoteCommands.Off:
      downmixStateQueryParamValue = "False";
      break;
    case uc.RemoteCommands.Toggle:
      let currentDownmixResult = await getDownmixState(device);

      if (currentDownmixResult.entityState == undefined) {
        return currentDownmixResult;
      }

      downmixStateQueryParamValue = currentDownmixResult.entityState == uc.SwitchStates.On ? "False" : "True";
      break;
  }

  const url = `http://${device.address}/web/downmix?enable=${downmixStateQueryParamValue}`;

  return getDreamboxPromise<uc.SwitchStates | undefined>(
    url,
    device.username,
    device.password,
    device.id,
    uc.SwitchAttributes.State,
    "e2simplexmlresult",
    "e2state",
    "True",
    uc.StatusCodes.Ok,
    uc.StatusCodes.Ok,
    uc.SwitchStates.On,
    uc.SwitchStates.Off
  );
};

const getDownmixState = async function (
  device: config.DreamboxDevice
): Promise<DreamboxCommandResult<uc.SwitchStates | undefined>> {
  const url = `http://${device.address}/web/downmix`;
  return getDreamboxPromise<uc.SwitchStates | undefined>(
    url,
    device.username,
    device.password,
    device.id,
    uc.SwitchAttributes.State,
    "e2simplexmlresult",
    "e2state",
    "True",
    uc.StatusCodes.Ok,
    uc.StatusCodes.Ok,
    uc.SwitchStates.On,
    uc.SwitchStates.Off
  );
};

export {
  RC_DREAMBOX_MAP,
  RC_DREAMBOX_MAP_EXTENDED,
  DreamboxInfoResult,
  DreamboxCommandResult,
  getDreamboxInfo,
  sendRemoteCommand,
  sendPowerState,
  getPowerState,
  sendDownmixState,
  getDownmixState
};
