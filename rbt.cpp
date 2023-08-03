#include "pxt.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

namespace rbt {
    /*
    * Calculates the light in Lux based on the ADC value passed in. 1 step in adcVal is equal to .488 uA or .976 lux at 5V
    */
    //%
    uint16_t getLux(int16_t ADCVal) {
        return ADCVal /1023.0;
    }

}
