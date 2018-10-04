const drivelist = require("drivelist");
const exec = require("child_process").exec;

exports.USBAdapter = ( () => {
  return new class {

    constructor() {
      this.os = process.platform;
    }
    
    getDrives(){      
      return new Promise((resolve,reject)=>{
        drivelist.list( (error, drives) => {     
          if (error) { reject(error) }
          else {resolve( drives.filter( drive => drive.isUSB) )}
        })
      })      
    }

    async mountDrives(){
      let drives = await this.getDrives();
      drives.map( drive => {
        if (drive.mountpoints = [] && this.os == 'linux') {
          exec(`sudo mount ${drive.raw} /mnt/flashdrive`)
        }
      })
    }

    async getPath(drive = 0){
      await this.mountDrives();
      return await (await this.getDrives())[drive].mountpoints[0].path;
    }
    
  }
})();