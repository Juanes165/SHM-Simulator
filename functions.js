function roundByDecimals(number, decimals) {
    const tenPow = Math.pow(10, decimals)
    return Math.round(number * tenPow) / tenPow;
}


function naturalFrequency(springK, mass1, mass2) {
    return Math.sqrt(2 * springK / (2 * mass1 + mass2));
}


function frequency(w) {
    return w / (2 * Math.PI);
}


function period(freq) {
    return 1 / freq;
}


function phiCalc(w, initDisp, initVel) {
    return Math.atan(w * initDisp / initVel);
}


function amplitude(w, initDisp, initVel) {
    let phi = phiCalc(w, initDisp, initVel)
    if (phi != 0) {
        return initDisp / Math.sin(phi);
    }
    else {
        return initVel / (w * Math.cos(phi));
    }
}


function displacement(amp, w, time, phi) {
    return amp * Math.sin(w * time + phi);
}


function velocity(amp, w, time, phi) {
    return w * amp * Math.cos(w * time + phi);
}


function kineticEnergy(mass1, mass2, velocity) {
    return mass1 * (Math.pow(velocity, 2)) / 2 + (mass2 * Math.pow(velocity, 2)) / 4;
}


function potentialEnergy(springK, displacement) {
    return springK * (Math.pow(displacement, 2)) / 2;
}
