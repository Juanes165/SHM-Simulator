function roundByDecimals(number, decimals) {
    const tenPow = Math.pow(10, decimals)
    return Math.round(number * tenPow) / tenPow;
}


function naturalFrequencyCalc(springK, mass1, mass2) {
    
    return Math.sqrt(2 * springK / (2 * mass1 + mass2));
}


function frequencyCalc(springK, mass1, mass2) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)

    return w / (2 * Math.PI);
}


function periodCalc(springK, mass1, mass2) {

    let freq = frequencyCalc(springK, mass1, mass2)

    return 1 / freq;
}


function phiCalc(springK, mass1, mass2, initDisp, initVel) {

    let w = naturalFrequencyCalc(springK, mass1, mass2);
    return Math.atan(w * initDisp / initVel);
}


function amplitudeCalc(springK, mass1, mass2, initDisp, initVel) {
    
    let w = naturalFrequencyCalc(springK, mass1, mass2);
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel);

    if (phi != 0) {
        return initDisp / Math.sin(phi);
    }
    else {
        return initVel / (w * Math.cos(phi));
    }
}


function displacementCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)
    let amp = amplitudeCalc(springK, mass1, mass2, initDisp, initVel);
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel);

    return amp * Math.sin(w * time + phi);
}


function velocityCalc(springK, mass1, mass2, initDisp, initVel, time) {

    let w = naturalFrequencyCalc(springK, mass1, mass2)
    let amp = amplitudeCalc(springK, mass1, mass2, initDisp, initVel);
    let phi = phiCalc(springK, mass1, mass2, initDisp, initVel);

    return w * amp * Math.cos(w * time + phi);
}


function kineticEnergy(mass1, mass2, velocity) {
    return (mass1 + mass2 / 2) * (Math.pow(velocity, 2)) / 2
}


function potentialEnergy(springK, displacement) {
    return springK * (Math.pow(displacement, 2)) / 2;
}
