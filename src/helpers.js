export const sequencerMap = [
  "snare",
  "snare2",
  "snare3",
  "snare4",
  "hit",
  "hit2",
  "hit3",
  "hit4",
  "perc",
  "perc2",
  "perc3",
  "perc4",
  "kick",
  "kick2",
  "kick3",
  "kick4",
];

export const timeStampArray = [
  "0:0:0",
  "0:0:1",
  "0:0:2",
  "0:0:3",
  "0:1:0",
  "0:1:1",
  "0:1:2",
  "0:1:3",
  "0:2:0",
  "0:2:1",
  "0:2:2",
  "0:2:3",
  "0:3:0",
  "0:3:1",
  "0:3:2",
  "0:3:3",
  "1:0:0",
  "1:0:1",
  "1:0:2",
  "1:0:3",
  "1:1:0",
  "1:1:1",
  "1:1:2",
  "1:1:3",
  "1:2:0",
  "1:2:1",
  "1:2:2",
  "1:2:3",
  "1:3:0",
  "1:3:1",
  "1:3:2",
  "1:3:3",
  "2:0:0",
  "2:0:1",
  "2:0:2",
  "2:0:3",
  "2:1:0",
  "2:1:1",
  "2:1:2",
  "2:1:3",
  "2:2:0",
  "2:2:1",
  "2:2:2",
  "2:2:3",
  "2:3:0",
  "2:3:1",
  "2:3:2",
  "2:3:3",
  "3:0:0",
  "3:0:1",
  "3:0:2",
  "3:0:3",
  "3:1:0",
  "3:1:1",
  "3:1:2",
  "3:1:3",
  "3:2:0",
  "3:2:1",
  "3:2:2",
  "3:2:3",
  "3:3:0",
  "3:3:1",
  "3:3:2",
  "3:3:3",
];

export const calcLoopTimeStamps = (_tsArray, _loopLength, _loopPosition) => {
  const localArray = [];
  if (_loopLength === "1/4m" && _loopPosition === 0) {
    _tsArray.forEach((_ts, index) => {
      if (index < 16) {
        localArray.push(_ts);
      } else return;
    });
  }
  if (_loopLength === "1/4m" && _loopPosition === 1) {
    _tsArray.forEach((_ts, index) => {
      if (index >= 16 && index < 32) {
        localArray.push(_ts);
      } else return;
    });
  }
  if (_loopLength === "1/4m" && _loopPosition === 2) {
    _tsArray.forEach((_ts, index) => {
      if (index >= 32 && index < 48) {
        localArray.push(_ts);
      } else return;
    });
  }
  if (_loopLength === "1/4m" && _loopPosition === 3) {
    _tsArray.forEach((_ts, index) => {
      if (index >= 48 && index < 64) {
        localArray.push(_ts);
      } else return;
    });
  }
  if (_loopLength === "1/2m" && _loopPosition === 0) {
    _tsArray.forEach((_ts, index) => {
      if (index < 32) {
        localArray.push(_ts);
      } else return;
    });
  }
  if (_loopLength === "1/2m" && _loopPosition === 1) {
    _tsArray.forEach((_ts, index) => {
      if (index >= 32 && index < 64) {
        localArray.push(_ts);
      } else return;
    });
  }
  return localArray;
};
