/**
* makecode I2C LCD1602 package for microbit.
* From microbit/micropython Chinese community.
* http://www.micropython.org.cn
*/
  const APDS9960_RAM = 0x00
  const APDS9960_ENABLE = 0x80
  const APDS9960_ATIME = 0x81
  const APDS9960_WTIME = 0x83
  const APDS9960_AILTIL = 0x84
  const APDS9960_AILTH = 0x85
  const APDS9960_AIHTL = 0x86
  const APDS9960_AIHTH = 0x87
  const APDS9960_PILT = 0x89
  const APDS9960_PIHT = 0x8B
  const APDS9960_PERS = 0x8C
  const APDS9960_CONFIG1 = 0x8D
  const APDS9960_PPULSE = 0x8E
  const APDS9960_CONTROL = 0x8F
  const APDS9960_CONFIG2 = 0x90
  const APDS9960_ID = 0x92
  const APDS9960_STATUS = 0x93
  const APDS9960_CDATAL = 0x94
  const APDS9960_CDATAH = 0x95
  const APDS9960_RDATAL = 0x96
  const APDS9960_RDATAH = 0x97
  const APDS9960_GDATAL = 0x98
  const APDS9960_GDATAH = 0x99
  const APDS9960_BDATAL = 0x9A
  const APDS9960_BDATAH = 0x9B
  const APDS9960_PDATA = 0x9C
  const APDS9960_POFFSET_UR = 0x9D
  const APDS9960_POFFSET_DL = 0x9E
  const APDS9960_CONFIG3 = 0x9F
  const APDS9960_GPENTH = 0xA0
  const APDS9960_GEXTH = 0xA1
  const APDS9960_GCONF1 = 0xA2
  const APDS9960_GCONF2 = 0xA3
  const APDS9960_GOFFSET_U = 0xA4
  const APDS9960_GOFFSET_D = 0xA5
  const APDS9960_GOFFSET_L = 0xA7
  const APDS9960_GOFFSET_R = 0xA9
  const APDS9960_GPULSE = 0xA6
  const APDS9960_GCONF3 = 0xAA
  const APDS9960_GCONF4 = 0xAB
  const APDS9960_GFLVL = 0xAE
  const APDS9960_GSTATUS = 0xAF
  const APDS9960_IFORCE = 0xE4
  const APDS9960_PICLEAR = 0xE5
  const APDS9960_CICLEAR = 0xE6
  const APDS9960_AICLEAR = 0xE7
  const APDS9960_GFIFO_U = 0xFC
  const APDS9960_GFIFO_D = 0xFD
  const APDS9960_GFIFO_L = 0xFE
  const APDS9960_GFIFO_R = 0xFF
  const APDS9960_I2C_ADDRESS = 0x39
/**
 * Custom blocks
 */
//% weight=20 color=#800080 icon="\uf0fe"
namespace APDS9960 {
    let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data
	
	let _wbuf = pins.createBuffer(2);
	
    /**
    * Unit of Ultrasound Module
    */
    export enum SonarUnit {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    export enum Direction {
        //% block="up"
        Up,
        //% block="down"
        Down,
        //% block="left"
        Left,
        //% block="right"
        Right,
    }
    
    export enum RGBcolor {
        //% block="Red"
        Red,
        //% block="Green"
        Green,
        //% block="Blue"
        Blue,
    }
	
    function writeReg(reg: number, d: number): void {
        pins.i2cWriteNumber(i2cAddr, ((reg << 8) + d), NumberFormat.UInt16BE, false)
    }
	
    function getReg(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDRESS, reg, NumberFormat.UInt8BE);
		let x = pins.i2cReadNumber(APDS9960_I2C_ADDRESS, NumberFormat.UInt8BE);
        return x;
    }
	
    function get2Reg(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(APDS9960_I2C_ADDRESS, NumberFormat.UInt16LE);
    }
	
	
	/**
    *Change the code (Atakan) 
    * Cars can extend the ultrasonic function to prevent collisions and other functions.. 
    * @param ldr two states of ultrasonic module, eg: Centimeters
    */
    //% blockId=ldr block="APDS-9960 Light Value4444"
    //% weight=35
    export function ldr(): number { 
		writeReg(APDS9960_ENABLE, 0x7F);
		while(!colorDataReady());
		let c = get2Reg(APDS9960_CDATAL);
        return c;

    }

     /**
     * TODO: RGB Color Value
     */
    //% block="APDS-9960 RGB Color %colorgb"
    //% weight=15
    export function rgbColor(colorgb: RGBcolor): boolean {
			return true;
    }

    /**
    * Cars can extend the ultrasonic function to prevent collisions and other functions.. 
    * @param Sonarunit two states of ultrasonic module, eg: Centimeters
    */
    //% blockId=ultrasonic block="APDS-9960 Distanceaa %unit"
    //% weight=35
    export function ultrasonic(unit: SonarUnit, maxCmDistance = 500): number {
       let x = getReg(APDS9960_ID)
	   return x;
    }
	
	    /**
     * TODO: Direction Value
     */
    //% block="Movement in the %state direction"
    //% weight=15
    export function directionkeys(state: Direction): boolean {
            return true;


    }

    /**
     * initial LCD, set I2C address. Address is 39/63 for PCF8574/PCF8574A
     * @param Addr is i2c address for LCD, eg: 0, 39, 63. 0 is auto find address
     */
    //% blockId="init" block="APDS-9960 initialize %addr"
    //% weight=100 blockGap=8
    //% parts=LCD1602_I2C trackArgs=0
    export function init(Addr: number) {
	  setADCIntegrationTime();
	  setADCGain();
	  
	  enableGesture();
	  enableProximity();
	  enableColor();
  
	  disableColorInterrupt();
	  disableProximityInterrupt();
	  clearInterrupt();
  
	  enable_true();
  
      setGestureDimensions();
	  setGestureFIFOThreshold();
	  setGestureGain();
	  setGestureProximityThreshold();

	  writeReg(APDS9960_GPULSE, 0x83);
    }
	
	function setADCIntegrationTime(): void {
      let temp;

	  temp = 10;
	  temp /= 2.78;
	  temp = 256 - temp;
	  if (temp > 255)
		temp = 255;
	  if (temp < 0)
		temp = 0;

	  writeReg(APDS9960_ATIME, temp);
    }
	
	function setADCGain(): void {
	  writeReg(APDS9960_CONTROL, 1);
	}
	
	function enableGesture(): void {
	  writeReg(APDS9960_GCONF4, 0);
	}
	
	function enableProximity(): void {
	  writeReg(APDS9960_ENABLE, 0x7B);
	}
	
	function enableColor(): void {
	  writeReg(APDS9960_ENABLE, 0x7D);
	}
	
	function disableColorInterrupt(): void {
	  writeReg(APDS9960_ENABLE, 0x6F);
	}
	
	function disableProximityInterrupt(): void {
	  writeReg(APDS9960_ENABLE, 0x5F);
	}
	
	function clearInterrupt(): void {
	  writeReg(APDS9960_AICLEAR, 0);
	}
	
	function enable_false(): void {
	  writeReg(APDS9960_ENABLE, 0x7E);
	}
	
	function enable_true(): void {
	  writeReg(APDS9960_ENABLE, 0x7F);
	}
	
	function setGestureDimensions(): void {
	  writeReg(APDS9960_GCONF3, 0);
	}

	function setGestureFIFOThreshold(): void {
	  writeReg(APDS9960_GCONF1, 0x52);
	}
	
	function setGestureGain(): void {
	  writeReg(APDS9960_GCONF2, 0x53);
	}

	function setGestureProximityThreshold(): void {
	  writeReg(APDS9960_GPENTH, 0x32);
	}
	
	function colorDataReady(): number {
		let cdata;
		  cdata = getReg(APDS9960_STATUS);
		  return cdata;
	}




    




     
}