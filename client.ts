
// room dimensions in blender orientation
let camera: any;
let controller1: any;
let controller2: any;
// @ts-ignore
const cursor = new THREE.Vector3();
let handle: any;
let renderer: any;
let scale = 0.04;
let scene: any;
let tableDistance = 0.4;
let tableHeight = 0.5;
let controls: any;
let roomData = {
  'sizeX': 16,
  'sizeY': 16,
};
interface Rack {
  'name': string,
  'centerX': number,
  'centerY': number,
  'centerZ': number,
  'sizeX': number,
  'sizeY': number,
  'sizeZ': number,
}
let rackData: Record<string, Rack> = {
  'c4e24b9cdb52cf482b56541adc961932': {
    'name': 'DEMO-1-0-1-0-AE19-0',
    'centerX': 12.6505,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'd3228f1cdb52cf482b56541adc961949': {
    'name': 'DEMO-1-0-1-0-AE17-0',
    'centerX': 11.4445,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'a55d1e94db9a07c8ab79f7d41d961921': {
    'name': 'DEMO-1-0-1-1-AE10-0',
    'centerX': 7.2235,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '0e18f892dbb793808e09f3931d96196e': {
    'name': 'DEMO-1-0-1-0-AL08-0',
    'centerX': 4,
    'centerY': -1.5,
    'centerZ': 1,
    'sizeX': 0.98,
    'sizeY': 1,
    'sizeZ': 2.94,
  },
  'be64ca46dbddab40a688d2975e9619cc': {
    'name': 'DEMO-1-0-1-1-AO10-0',
    'centerX': 13.8395,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'f108a3d0db52838010b6f1561d961961': {
    'name': 'DEMO-1-0-1-0-AH14-0',
    'centerX': 9.6355,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '72a5de14db1a07c8ab79f7d41d961981': {
    'name': 'DEMO-1-0-1-0-AR01-0',
    'centerX': 8.4125,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '8ad34f10db92cf482b56541adc961958': {
    'name': 'DEMO-1-0-1-0-AH01-0',
    'centerX': 1.7965,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '7402871cdb52cf482b56541adc9619d1': {
    'name': 'DEMO-1-0-1-0-AE13-0',
    'centerX': 9.0325,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '189a2f98db52838010b6f1561d961919': {
    'name': 'DEMO-1-0-1-1-AH18-0',
    'centerX': 12.0475,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'c4e1831cdb52cf482b56541adc961914': {
    'name': 'DEMO-1-0-1-0-AE10-0',
    'centerX': 7.2235,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '1cb44354db92cf482b56541adc9619be': {
    'name': 'DEMO-1-0-1-0-AH11-0',
    'centerX': 7.8265,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '50361ad4db1a07c8ab79f7d41d961946': {
    'name': 'DEMO-1-0-1-0-AW03-0',
    'centerX': 9.6185,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '39e7853bdbcd674c5d5ef9b61d9619f1': {
    'name': 'DEMO-1-0-1-1-AW11-0',
    'centerX': 14.4425,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'c247dad8db1a07c8ab79f7d41d9619fd': {
    'name': 'DEMO-1-0-1-1-AW06-0',
    'centerX': 11.4275,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'eb660202db11eb40a688d2975e9619f7': {
    'name': 'DEMO-1-0-1-1-AR07-0',
    'centerX': 12.0305,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'a20b1e58db5a07c8ab79f7d41d9619f7': {
    'name': 'DEMO-1-0-1-0-AH22-0',
    'centerX': 14.4595,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '6ad2d8acdb1a838010b6f1561d9619c5': {
    'name': 'DEMO-1-0-1-0-AH13-0',
    'centerX': 9.0325,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '19479ad8db1a07c8ab79f7d41d9619e5': {
    'name': 'DEMO-1-0-1-1-AW02-0',
    'centerX': 9.0155,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '81b81250db52438010b6f1561d9619f7': {
    'name': 'DEMO-1-0-1-0-AY01-0',
    'centerX': 8.4125,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '11ac84a8dbd6838010b6f1561d961950': {
    'name': 'DEMO-1-0-1-1-AE21-0',
    'centerX': 13.8565,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'ba93c310db92cf482b56541adc96196f': {
    'name': 'DEMO-1-0-1-0-AE23-0',
    'centerX': 15.0625,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'f2084d7bdbcd674c5d5ef9b61d9619fb': {
    'name': 'DEMO-1-0-1-1-AW12-0',
    'centerX': 15.0455,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '8ad7c13bdbcd674c5d5ef9b61d961923': {
    'name': 'DEMO-1-0-1-1-AW10-0',
    'centerX': 13.8395,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '1c59ef54db52838010b6f1561d9619a3': {
    'name': 'DEMO-1-0-1-1-AE08-0',
    'centerX': 6.0175,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '288452d8dbde038010b6f1561d961948': {
    'name': 'DEMO-1-0-1-0-AR07-0',
    'centerX': 12.0305,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'ca169a90db12438010b6f1561d9619a4': {
    'name': 'DEMO-1-0-1-1-AY03-0',
    'centerX': 9.6185,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '368205c1dbb8a3443380d2975e961981': {
    'name': 'DEMO-1-0-1-0-AW05-0',
    'centerX': 10.8245,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '81d54f58db92cf482b56541adc961929': {
    'name': 'DEMO-1-0-1-0-AH19-0',
    'centerX': 12.6505,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'eae86354db52838010b6f1561d9619c7': {
    'name': 'DEMO-1-0-1-0-AH12-0',
    'centerX': 8.4295,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '56e08398db52cf482b56541adc961901': {
    'name': 'DEMO-1-0-1-0-AE02-0',
    'centerX': 2.3995,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '46b91294dbdec3c0a9885205dc96194a': {
    'name': 'DEMO-1-0-1-1-AE22-0',
    'centerX': 5,
    'centerY': -1.5,
    'centerZ': 1,
    'sizeX': 0.98,
    'sizeY': 1,
    'sizeZ': 2.94,
  },
  '87b14fd8db52cf482b56541adc9619bd': {
    'name': 'DEMO-1-0-1-0-AE07-0',
    'centerX': 5.4145,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '69371ad8db1a07c8ab79f7d41d9619bd': {
    'name': 'DEMO-1-0-1-0-AY11-0',
    'centerX': 14.4425,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '9bf4cf94db92cf482b56541adc961917': {
    'name': 'DEMO-1-0-1-0-AH16-0',
    'centerX': 10.8415,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '2d5d1e94db9a07c8ab79f7d41d96199f': {
    'name': 'DEMO-1-0-1-1-AE13-0',
    'centerX': 9.0325,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '4706d690db12438010b6f1561d961944': {
    'name': 'DEMO-1-0-1-1-AH21-0',
    'centerX': 13.8565,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'fb544a46dbddab40a688d2975e961972': {
    'name': 'DEMO-1-0-1-1-AO09-0',
    'centerX': 13.2365,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '10d5da54db1a07c8ab79f7d41d961947': {
    'name': 'DEMO-1-0-1-0-AR09-0',
    'centerX': 13.2365,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'c7f3c246dbddab40a688d2975e961979': {
    'name': 'DEMO-1-0-1-1-AO01-0',
    'centerX': 8.4125,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '45051e5cdbde038010b6f1561d9619a0': {
    'name': 'DEMO-1-0-1-0-AR11-0',
    'centerX': 14.4425,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '19c75ce0dbd247c0a9885205dc9619c0': {
    'name': 'DEMO-1-0-1-1-AN04-0',
    'centerX': 6,
    'centerY': -1.5,
    'centerZ': 1,
    'sizeX': 0.98,
    'sizeY': 1,
    'sizeZ': 2.94,
  },
  'd77bef1cdb52838010b6f1561d96192c': {
    'name': 'DEMO-1-0-1-1-AW07-0',
    'centerX': 12.0305,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'b3c1cfd8db52cf482b56541adc9619d3': {
    'name': 'DEMO-1-0-1-0-AE08-0',
    'centerX': 6.0175,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'aab7cdf7dbcd674c5d5ef9b61d961951': {
    'name': 'DEMO-1-0-1-1-AW08-0',
    'centerX': 12.6335,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '58220f1cdb52cf482b56541adc961953': {
    'name': 'DEMO-1-0-1-0-AE16-0',
    'centerX': 10.8415,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'a5851610db12438010b6f1561d9619b5': {
    'name': 'DEMO-1-0-1-0-AY07-0',
    'centerX': 12.0305,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '02260a8edbddab40a688d2975e9619af': {
    'name': 'DEMO-1-0-1-1-AR01-0',
    'centerX': 8.4125,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'f640ea98dbda8f482b56541adc96196f': {
    'name': 'DEMO-1-0-1-1-AE09-0',
    'centerX': 6.6205,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '4aa6ce02db11eb40a688d2975e96195a': {
    'name': 'DEMO-1-0-1-1-AR11-0',
    'centerX': 14.4425,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '2c371ad8db1a07c8ab79f7d41d961926': {
    'name': 'DEMO-1-0-1-0-AY10-0',
    'centerX': 13.8395,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'eb558b18db92cf482b56541adc96191d': {
    'name': 'DEMO-1-0-1-0-AH17-0',
    'centerX': 11.4445,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'c8248b50db92cf482b56541adc9619fd': {
    'name': 'DEMO-1-0-1-0-AH05-0',
    'centerX': 4.2085,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'e98aab98db52838010b6f1561d9619c8': {
    'name': 'DEMO-1-0-1-1-AH12-0',
    'centerX': 8.4295,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '9b368e8edbddab40a688d2975e961974': {
    'name': 'DEMO-1-0-1-1-AR02-0',
    'centerX': 9.0155,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '974ede1cdb9a07c8ab79f7d41d961935': {
    'name': 'DEMO-1-0-1-0-AE21-0',
    'centerX': 13.8565,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'e6651ed0db1a07c8ab79f7d41d961979': {
    'name': 'DEMO-1-0-1-0-AO11-0',
    'centerX': 14.4425,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '0d4a9698dbdec3c0a9885205dc9619ea': {
    'name': 'DEMO-1-0-1-1-AY06-0',
    'centerX': 11.4275,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '076a2798db52838010b6f1561d9619c0': {
    'name': 'DEMO-1-0-1-1-AH08-0',
    'centerX': 6.0175,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '45659ad0db1a07c8ab79f7d41d961947': {
    'name': 'DEMO-1-0-1-0-AO07-0',
    'centerX': 12.0305,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'd94ad698dbdec3c0a9885205dc961943': {
    'name': 'DEMO-1-0-1-1-AY08-0',
    'centerX': 12.6335,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '0c641a98dbde038010b6f1561d961905': {
    'name': 'DEMO-1-0-1-0-AR06-0',
    'centerX': 11.4275,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '2ab4521cdbde038010b6f1561d961949': {
    'name': 'DEMO-1-0-1-0-AO08-0',
    'centerX': 12.6335,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '35d08f58db52cf482b56541adc96198c': {
    'name': 'DEMO-1-0-1-0-AE01-0',
    'centerX': 1.7965,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '84124b1cdb52cf482b56541adc961986': {
    'name': 'DEMO-1-0-1-0-AE14-0',
    'centerX': 9.6355,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '57940b14db92cf482b56541adc9619a1': {
    'name': 'DEMO-1-0-1-0-AH10-0',
    'centerX': 7.2235,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'f2af40dcdb6783002b56541adc9619c3': {
    'name': 'DEMO-1-0-1-1-AO04-0',
    'centerX': 10.2215,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '6315169cdbde038010b6f1561d9619b1': {
    'name': 'DEMO-1-0-1-0-AW11-0',
    'centerX': 14.4425,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'f1544f90db92cf482b56541adc96190f': {
    'name': 'DEMO-1-0-1-0-AH07-0',
    'centerX': 5.4145,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'd6059e5cdbde038010b6f1561d96190b': {
    'name': 'DEMO-1-0-1-0-AR12-0',
    'centerX': 15.0455,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'a334c390db92cf482b56541adc9619f3': {
    'name': 'DEMO-1-0-1-0-AH06-0',
    'centerX': 4.8115,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '31e73e54dbd6438010b6f1561d96193e': {
    'name': 'DEMO-1-0-1-0-AE05-0',
    'centerX': 4.2085,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '3b06c798db92cf482b56541adc961903': {
    'name': 'DEMO-1-0-1-0-AH21-0',
    'centerX': 13.8565,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'df16da90db12438010b6f1561d96196a': {
    'name': 'DEMO-1-0-1-1-AY02-0',
    'centerX': 7,
    'centerY': -1.5,
    'centerZ': 1,
    'sizeX': 0.98,
    'sizeY': 1,
    'sizeZ': 2.94,
  },
  'e6169a90db12438010b6f1561d9619ee': {
    'name': 'DEMO-1-0-1-1-AY05-0',
    'centerX': 10.8245,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'cfe92b18db52838010b6f1561d9619a9': {
    'name': 'DEMO-1-0-1-1-AE05-0',
    'centerX': 4.2085,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '9ae55ca4db5a838010b6f1561d961930': {
    'name': 'DEMO-1-0-1-1-AH01-0',
    'centerX': 1.7965,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '23065a90db12438010b6f1561d96190d': {
    'name': 'DEMO-1-0-1-1-AH22-0',
    'centerX': 14.4595,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'd9561218db1a07c8ab79f7d41d9619bd': {
    'name': 'DEMO-1-0-1-0-AW08-0',
    'centerX': 12.6335,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'af37a350db52838010b6f1561d961966': {
    'name': 'DEMO-1-0-1-0-AH09-0',
    'centerX': 6.6205,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '7a018798db52cf482b56541adc961960': {
    'name': 'DEMO-1-0-1-0-AE03-0',
    'centerX': 3.0025,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'a9820f5cdb52cf482b56541adc961930': {
    'name': 'DEMO-1-0-1-0-AE18-0',
    'centerX': 12.0475,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '4b15169cdbde038010b6f1561d961953': {
    'name': 'DEMO-1-0-1-0-AW10-0',
    'centerX': 13.8395,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'f827d2d8db1a07c8ab79f7d41d9619ee': {
    'name': 'DEMO-1-0-1-0-AY02-0',
    'centerX': 9.0155,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'b7369ad4db1a07c8ab79f7d41d9619de': {
    'name': 'DEMO-1-0-1-0-AW04-0',
    'centerX': 10.2215,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '05a49ad8dbde038010b6f1561d9619ff': {
    'name': 'DEMO-1-0-1-0-AO01-0',
    'centerX': 8.4125,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'e98492d8dbde038010b6f1561d961949': {
    'name': 'DEMO-1-0-1-0-AR08-0',
    'centerX': 12.6335,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'd7d9e318db52838010b6f1561d96199b': {
    'name': 'DEMO-1-0-1-1-AE03-0',
    'centerX': 3.0025,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '7f079e98db1a07c8ab79f7d41d961985': {
    'name': 'DEMO-1-0-1-1-AW01-0',
    'centerX': 8.4125,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '9750a2d8dbda8f482b56541adc96190f': {
    'name': 'DEMO-1-0-1-0-AH23-0',
    'centerX': 15.0625,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '2f5ae398db52838010b6f1561d96196a': {
    'name': 'DEMO-1-0-1-1-AH05-0',
    'centerX': 4.2085,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'a49456d8dbde038010b6f1561d9619e7': {
    'name': 'DEMO-1-0-1-0-AW02-0',
    'centerX': 9.0155,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'ca069690db12438010b6f1561d961905': {
    'name': 'DEMO-1-0-1-0-AY09-0',
    'centerX': 13.2365,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'fbc6de58db1a07c8ab79f7d41d961945': {
    'name': 'DEMO-1-0-1-0-AY03-0',
    'centerX': 9.6185,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '3bc44f54db92cf482b56541adc961956': {
    'name': 'DEMO-1-0-1-0-AH15-0',
    'centerX': 10.2385,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'b57baf1cdb52838010b6f1561d961903': {
    'name': 'DEMO-1-0-1-1-AW03-0',
    'centerX': 9.6185,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '2017de98db1a07c8ab79f7d41d9619d4': {
    'name': 'DEMO-1-0-1-1-AY04-0',
    'centerX': 10.2215,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'e18187d8db52cf482b56541adc961932': {
    'name': 'DEMO-1-0-1-0-AE06-0',
    'centerX': 4.8115,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '09b6c242db11eb40a688d2975e96198e': {
    'name': 'DEMO-1-0-1-1-AR12-0',
    'centerX': 15.0455,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '51e59a50db12438010b6f1561d96191a': {
    'name': 'DEMO-1-0-1-0-AY04-0',
    'centerX': 10.2215,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'f6f34350db92cf482b56541adc9619a0': {
    'name': 'DEMO-1-0-1-0-AH02-0',
    'centerX': 2.3995,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '72a69658db1a07c8ab79f7d41d9619bb': {
    'name': 'DEMO-1-0-1-0-AW06-0',
    'centerX': 11.4275,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '7a969258db1a07c8ab79f7d41d9619ee': {
    'name': 'DEMO-1-0-1-0-AW09-0',
    'centerX': 13.2365,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '47f9d0a8dbd247c0a9885205dc961903': {
    'name': 'DEMO-1-0-1-1-AE02-0',
    'centerX': 2.3995,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'b5b51654db1a07c8ab79f7d41d961901': {
    'name': 'DEMO-1-0-1-0-AR02-0',
    'centerX': 9.0155,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '4154ce46dbddab40a688d2975e961923': {
    'name': 'DEMO-1-0-1-1-AO08-0',
    'centerX': 12.6335,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '54a49ad8dbde038010b6f1561d961969': {
    'name': 'DEMO-1-0-1-0-AW12-0',
    'centerX': 15.0455,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'dc84c286dbddab40a688d2975e9619a3': {
    'name': 'DEMO-1-0-1-1-AO12-0',
    'centerX': 15.0455,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '61169a90db12438010b6f1561d961942': {
    'name': 'DEMO-1-0-1-1-AH23-0',
    'centerX': 15.0625,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '89bfde18dbda8f482b56541adc961925': {
    'name': 'DEMO-1-0-1-1-AW05-0',
    'centerX': 10.8245,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '1f55d28ddbebd7c4e887fda7bf961925': {
    'name': 'DEMO-1-0-1-1-AR05-0',
    'centerX': 10.8245,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'b965dad0db1a07c8ab79f7d41d9619cc': {
    'name': 'DEMO-1-0-1-0-AO09-0',
    'centerX': 13.2365,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '13ca0b2edb151f80a9885205dc961954': {
    'name': 'DEMO-1-0-1-1-AO02-0',
    'centerX': 9.0155,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '800bbce8dbde838010b6f1561d9619a7': {
    'name': 'DEMO-1-0-1-0-AR04-0',
    'centerX': 10.2215,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'f9d9e318db52838010b6f1561d961907': {
    'name': 'DEMO-1-0-1-1-AE01-0',
    'centerX': 1.7965,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '9fa5c758db92cf482b56541adc9619b3': {
    'name': 'DEMO-1-0-1-0-AH18-0',
    'centerX': 12.0475,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'd46ae398db52838010b6f1561d961991': {
    'name': 'DEMO-1-0-1-1-AH06-0',
    'centerX': 4.8115,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '48179e98db1a07c8ab79f7d41d9619b9': {
    'name': 'DEMO-1-0-1-1-AW04-0',
    'centerX': 10.2215,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '85759ed0db1a07c8ab79f7d41d9619f3': {
    'name': 'DEMO-1-0-1-0-AO03-0',
    'centerX': 9.6185,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '23960602db11eb40a688d2975e96190b': {
    'name': 'DEMO-1-0-1-1-AR10-0',
    'centerX': 13.8395,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'de444e06dbddab40a688d2975e961975': {
    'name': 'DEMO-1-0-1-1-AO07-0',
    'centerX': 12.0305,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '2386ce02db11eb40a688d2975e961954': {
    'name': 'DEMO-1-0-1-1-AR09-0',
    'centerX': 13.2365,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '764cb864db5203882b56541adc96196b': {
    'name': 'DEMO-1-0-1-1-AE20-0',
    'centerX': 13.2535,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'fa64da98dbde038010b6f1561d961905': {
    'name': 'DEMO-1-0-1-0-AR10-0',
    'centerX': 13.8395,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '87bbec28dbdecf482b56541adc9619f2': {
    'name': 'DEMO-1-0-1-1-AO03-0',
    'centerX': 9.6185,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '5e8aab98db52838010b6f1561d9619fb': {
    'name': 'DEMO-1-0-1-1-AH14-0',
    'centerX': 9.6355,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '328aeb98db52838010b6f1561d961986': {
    'name': 'DEMO-1-0-1-1-AH17-0',
    'centerX': 11.4445,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'cfa45ed8dbde038010b6f1561d961967': {
    'name': 'DEMO-1-0-1-0-AO06-0',
    'centerX': 11.4275,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '247a6798db52838010b6f1561d96199e': {
    'name': 'DEMO-1-0-1-1-AH09-0',
    'centerX': 6.6205,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'aa16da90db12438010b6f1561d961915': {
    'name': 'DEMO-1-0-1-1-AY09-0',
    'centerX': 13.2365,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '77f51290db12438010b6f1561d9619f5': {
    'name': 'DEMO-1-0-1-0-AY08-0',
    'centerX': 12.6335,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '1b4a2398db52838010b6f1561d961936': {
    'name': 'DEMO-1-0-1-1-AE12-0',
    'centerX': 8.4295,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '4cf1071cdb52cf482b56541adc961903': {
    'name': 'DEMO-1-0-1-0-AE11-0',
    'centerX': 7.8265,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '45955a14db1a07c8ab79f7d41d961945': {
    'name': 'DEMO-1-0-1-0-AO10-0',
    'centerX': 13.8395,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '3b56cecedbddab40a688d2975e961937': {
    'name': 'DEMO-1-0-1-1-AR06-0',
    'centerX': 11.4275,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '623a6f58db52838010b6f1561d961902': {
    'name': 'DEMO-1-0-1-1-AE06-0',
    'centerX': 4.8115,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'ed74c286dbddab40a688d2975e9619dc': {
    'name': 'DEMO-1-0-1-1-AO11-0',
    'centerX': 14.4425,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '12069690db12438010b6f1561d961914': {
    'name': 'DEMO-1-0-1-1-AH20-0',
    'centerX': 13.2535,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '67d3dc28db9247c0a9885205dc96193a': {
    'name': 'DEMO-1-0-1-0-AE04-0',
    'centerX': 3.6055,
    'centerY': 14.437,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '929dcba5db786f443380d2975e9619fc': {
    'name': 'DEMO-1-0-1-1-AE16-0',
    'centerX': 10.8415,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '5796d258db1a07c8ab79f7d41d96192a': {
    'name': 'DEMO-1-0-1-0-AW01-0',
    'centerX': 8.4125,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'cba318e4dbda47c8ab79f7d41d9619d8': {
    'name': 'DEMO-1-0-1-1-AH15-0',
    'centerX': 10.2385,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '1634c246dbddab40a688d2975e96197d': {
    'name': 'DEMO-1-0-1-1-AO06-0',
    'centerX': 11.4275,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '4316da90db12438010b6f1561d96193a': {
    'name': 'DEMO-1-0-1-1-AY01-0',
    'centerX': 8.4125,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '1224ce46dbddab40a688d2975e96191b': {
    'name': 'DEMO-1-0-1-1-AO05-0',
    'centerX': 10.8245,
    'centerY': 8.493,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'b15d5e94db9a07c8ab79f7d41d96191e': {
    'name': 'DEMO-1-0-1-1-AH19-0',
    'centerX': 12.6505,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '4f760ecedbddab40a688d2975e9619e6': {
    'name': 'DEMO-1-0-1-1-AR08-0',
    'centerX': 12.6335,
    'centerY': 6.183,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '91c7413bdbcd674c5d5ef9b61d961936': {
    'name': 'DEMO-1-0-1-1-AW09-0',
    'centerX': 13.2365,
    'centerY': 4.1875,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'e57447d0db92cf482b56541adc9619c7': {
    'name': 'DEMO-1-0-1-0-AH08-0',
    'centerX': 6.0175,
    'centerY': 12.223,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'f415129cdbde038010b6f1561d9619fc': {
    'name': 'DEMO-1-0-1-0-AR05-0',
    'centerX': 10.8245,
    'centerY': 6.183,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'f7041258dbde038010b6f1561d961949': {
    'name': 'DEMO-1-0-1-0-AO12-0',
    'centerX': 15.0455,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '6495ef1cdb12838010b6f1561d961917': {
    'name': 'DEMO-1-0-1-1-AE04-0',
    'centerX': 3.6055,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '10b90b10dbda438010b6f1561d9619f8': {
    'name': 'DEMO-1-0-1-1-AH07-0',
    'centerX': 5.4145,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '83551ad0db1a07c8ab79f7d41d961980': {
    'name': 'DEMO-1-0-1-0-AO02-0',
    'centerX': 9.0155,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '4eac84a8dbd6838010b6f1561d961976': {
    'name': 'DEMO-1-0-1-1-AE23-0',
    'centerX': 15.0625,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'fb551ad0db1a07c8ab79f7d41d9619ec': {
    'name': 'DEMO-1-0-1-0-AO04-0',
    'centerX': 10.2215,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  '9b9b5e1cdb5a07c8ab79f7d41d9619cc': {
    'name': 'DEMO-1-0-1-0-AO05-0',
    'centerX': 10.8245,
    'centerY': 8.493,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 1.206,
    'sizeZ': 2.94,
  },
  'e95a6398db52838010b6f1561d9619b7': {
    'name': 'DEMO-1-0-1-1-AH02-0',
    'centerX': 2.3995,
    'centerY': 12.223,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'bb3aaf58db52838010b6f1561d9619e5': {
    'name': 'DEMO-1-0-1-1-AE07-0',
    'centerX': 5.4145,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  '65869e18db1a07c8ab79f7d41d961924': {
    'name': 'DEMO-1-0-1-0-AW07-0',
    'centerX': 12.0305,
    'centerY': 4.1875,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '74065290db12438010b6f1561d9619ee': {
    'name': 'DEMO-1-0-1-0-AY05-0',
    'centerX': 10.8245,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  'baf51290db12438010b6f1561d96191a': {
    'name': 'DEMO-1-0-1-0-AY06-0',
    'centerX': 11.4275,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '3b85ef1cdb12838010b6f1561d961909': {
    'name': 'DEMO-1-0-1-1-AE11-0',
    'centerX': 7.8265,
    'centerY': 14.437,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 1.008,
    'sizeZ': 2.94,
  },
  'd959da14db52438010b6f1561d961940': {
    'name': 'DEMO-1-0-1-1-AY07-0',
    'centerX': 12.0305,
    'centerY': 2.2355,
    'centerZ': 4.7,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
  '8027d2d8db1a07c8ab79f7d41d9619a1': {
    'name': 'DEMO-1-0-1-0-AY12-0',
    'centerX': 15.0455,
    'centerY': 2.2355,
    'centerZ': 1.5,
    'sizeX': 0.59094,
    'sizeY': 0.989,
    'sizeZ': 2.94,
  },
};
function spectrumGreenRed(numerator: number, denominator: number) {
  let decimal;
  let decimalBlue;
  let decimalGreen;
  let decimalRed;
  let saturation;
  decimalBlue = 1;
  decimalGreen = 0;
  decimalRed = 0;
  saturation = 1;
  decimal = numerator / denominator;
  if (denominator == 0){
    decimal = 1;
  }
  if (decimal < 0) {
    decimal = 0;
  }
  if (decimal > 1) {
    decimal = 1;
  }
  // green to yellow
  if (decimal < 0.5) {
    decimalBlue = (1 - saturation);
    decimalGreen = 1;
    decimalRed = (1 - saturation) + (decimal / 0.5 * saturation);
  }
  // yellow to red
  if (decimal >= 0.5) {
    decimalBlue = (1 - saturation);
    decimalGreen = (1 - saturation) + (saturation - ((decimal - 0.5) / 0.5) * saturation);
    decimalRed = 1;
  }
  // max or over, hard red
  if (decimal >= 1.0) {
    decimalBlue = 0;
    decimalGreen = 0;
    decimalRed = 1;
  }
  return [
    decimalBlue,
    decimalGreen,
    decimalRed,
  ];
}
function addRacks() {
  let boxGeometry;
  let boxMaterial;
  let boxMesh;
  let colorBlue = 0;
  let colorGreen = 0;
  let colorRed = 0;
  let centerX;
  let centerY;
  let centerZ;
  let sizeX;
  let sizeY;
  let sizeZ;
  Object.keys(rackData).forEach((rackSysId: string) => {
    // using blender coordinates as inputs
    centerX = (rackData[rackSysId].centerX - (roomData.sizeX * 0.5)) * scale;
    centerY = (rackData[rackSysId].centerY - (roomData.sizeY * 0.5)) * scale;
    // adjust the 'table' height
    centerZ = (rackData[rackSysId].centerZ * scale) + tableHeight;
    sizeX = rackData[rackSysId].sizeX * scale;
    sizeY = rackData[rackSysId].sizeY * scale;
    sizeZ = rackData[rackSysId].sizeZ * scale;
    // @ts-ignore
    boxGeometry = new THREE.BoxGeometry(sizeY, sizeZ, sizeX);
    // @ts-ignore
    boxMaterial = new THREE.MeshStandardMaterial();
    [
      colorBlue,
      colorGreen,
      colorRed,
    ] = spectrumGreenRed(Math.random(), 1);
    boxMaterial.color.setRGB(colorRed, colorGreen, colorBlue);
    // @ts-ignore
    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = centerY;
    boxMesh.position.y = centerZ;
    boxMesh.position.z = centerX;
    // @ts-ignore
    boxMesh.name = 'testing';
    handle.add(boxMesh);
  });
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  // @ts-ignore
  scene = new THREE.Scene();
  // @ts-ignore
  scene.background = new THREE.Color(0x000000);
  // handle that rotates/moves the whole scene
  var handleX = 0 - tableDistance - (roomData.sizeX * 0.5 * scale);
  // @ts-ignore
  handle = new THREE.Group();
  handle.position.z = handleX;
  scene.add(handle);
  // camera matched to vr camera
  const cameraRatio = window.innerWidth / window.innerHeight;
  // @ts-ignore
  camera = new THREE.PerspectiveCamera(50, cameraRatio, 0.01, 50);
  camera.position.set(0, 1.0, 0);
  // @ts-ignore
  controls = new OrbitControls(camera, container);
  controls.target.set(0, tableHeight, handleX);
  controls.update();
  // racks
  addRacks();
  // light
  // @ts-ignore
  scene.add(new THREE.HemisphereLight(0x888877, 0x777788));
  // @ts-ignore
  const light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(0, 4, 0);
  scene.add(light);
  // painters
  // @ts-ignore
  const painter1 = new TubePainter();
  scene.add(painter1.mesh);
  // @ts-ignore
  const painter2 = new TubePainter();
  scene.add(painter2.mesh);
  // renderer
  // @ts-ignore
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // @ts-ignore
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);
  // @ts-ignore
  document.body.appendChild(VRButton.createButton(renderer));
  function onSelectStart() {
    // @ts-ignore
    this.userData.isSelecting = true;
  }
  function onSelectEnd() {
    // @ts-ignore
    this.userData.isSelecting = false;
  }
  function onSqueezeStart() {
    // @ts-ignore
    this.userData.isSqueezing = true;
    // @ts-ignore
    this.userData.positionAtSqueezeStart = this.position.y;
    // @ts-ignore
    this.userData.scaleAtSqueezeStart = this.scale.x;
  }
  function onSqueezeEnd() {
    // @ts-ignore
    this.userData.isSqueezing = false;
  }
  controller1 = renderer.xr.getController(0);
  controller1.addEventListener('selectstart', onSelectStart);
  controller1.addEventListener('selectend', onSelectEnd);
  controller1.addEventListener('squeezestart', onSqueezeStart);
  controller1.addEventListener('squeezeend', onSqueezeEnd);
  controller1.userData.painter = painter1;
  scene.add(controller1);
  controller2 = renderer.xr.getController(1);
  controller2.addEventListener('selectstart', onSelectStart);
  controller2.addEventListener('selectend', onSelectEnd);
  controller2.addEventListener('squeezestart', onSqueezeStart);
  controller2.addEventListener('squeezeend', onSqueezeEnd);
  controller2.userData.painter = painter2;
  scene.add(controller2);
  // @ts-ignore
  const geometry = new THREE.CylinderGeometry(0.01, 0.02, 0.08, 5);
  // @ts-ignore
  geometry.rotateX(- Math.PI / 2);
  // @ts-ignore
  const material = new THREE.MeshStandardMaterial({ flatShading: true });
  // @ts-ignore
  const mesh = new THREE.Mesh(geometry, material);
  // @ts-ignore
  const pivot = new THREE.Mesh(new THREE.IcosahedronGeometry(0.01, 3));
  pivot.name = 'pivot';
  pivot.position.z = - 0.05;
  mesh.add(pivot);
  controller1.add(mesh.clone());
  controller2.add(mesh.clone());
  window.addEventListener('resize', onWindowResize);
}
function handleController(controller: any) {
  const userData = controller.userData;
  const painter = userData.painter;
  const pivot = controller.getObjectByName('pivot');
  if (userData.isSqueezing === true) {
    // const delta = (controller.position.y - userData.positionAtSqueezeStart) * 5;
    // const scale = Math.max(0.1, userData.scaleAtSqueezeStart + delta);
    const paintScale = 1;
    pivot.scale.setScalar(paintScale);
    painter.setSize(paintScale);
  }
  cursor.setFromMatrixPosition(pivot.matrixWorld);
  if (userData.isSelecting === true) {
    painter.lineTo(cursor);
    painter.update();
  } else {
    painter.moveTo(cursor);
  }
}
function render() {
  handleController(controller1);
  handleController(controller2);
  handle.rotation.y += 0.002;
  renderer.render(scene, camera);
}
function animate() {
  renderer.setAnimationLoop(render);
}
init();
animate();
