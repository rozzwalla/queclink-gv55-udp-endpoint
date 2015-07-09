var _      = require('lodash'),
    moment = require('moment');

exports.parse = function (rawData) {
    var data = {
        is_data: true
    };

    if (!/^\+RESP/.test(rawData) && !/^\+ACK/.test(rawData) && !/^\+ACK/.test(rawData)){
        var err = {msg: 'Invalid Data', data: rawData};
        return err;
    }

    rawData = rawData.substr(0, rawData.length - 1);

    var parsedData = rawData.split(',');

    var command = parsedData[0].split(':');

    _.extend(data, {
        message_header: command[0],
        message_type: command[1],
        protocol: parsedData[1],
        device: parsedData[2],
        device_name: parsedData[3],
        dtm: moment(parsedData[parsedData.length - 2], 'YYYYMMDDHHmmss').toDate(),
        count_number: parsedData[parsedData.length - 1],
        ack: '+SACK:'.concat(parsedData[parsedData.length - 1]).concat('$'),
        raw_data: rawData
    });

    if (command[0] === '+ACK' || ((command[0] === '+RESP' || command[0] === '+BUFF') &&
        (command[1] === 'GTINF' || command[1] === 'GTGPS' || command[1] === 'GTALL' ||
        command[1] === 'GTCID' || command[1] === 'GTCSQ' || command[1] === 'GTVER' ||
        command[1] === 'GTBAT' || command[1] === 'GTIOS' || command[1] === 'GTTMZ' ||
        command[1] === 'GTAIF' || command[1] === 'GTALS' || command[1] === 'GTGSV' ||
        command[1] === 'GTUVN' || command[1] === 'GTPNA' || command[1] === 'GTPFA' ||
        command[1] === 'GTPDP' || command[1] === 'GTGSM' || command[1] === 'GTPHD' ||
        command[1] === 'GTFSD' || command[1] === 'GTUFS' || command[1] === 'GTCRD' ||
        command[1] === 'GTACC'))) {

        parsedData = parsedData.splice(0, 1);
        _.extend(data, {
            is_data: false,
            message: parsedData.join()
        });

        exit(data);
    }


    if (command[1] === 'GTTOW' || command[1] === 'GTDIS' || command[1] === 'GTIOB' ||
        command[1] === 'GTSPD' || command[1] === 'GTSOS' || command[1] === 'GTRTL' ||
        command[1] === 'GTDOG' || command[1] === 'GTIGL' || command[1] === 'GTHBM') {
        _.extend(data, {
            message: parsedData.join(),
            reserved1: parsedData[4],
            report_id: parsedData[5],
            number: parsedData[6],
            accuracy: parsedData[7],
            speed: parsedData[8],
            azimuth: parsedData[9],
            altitude: parsedData[10],
            coordinates: [parsedData[11], parsedData[12]],
            gps_utc_time: parsedData[13],
            mcc: parsedData[14],
            lnc: parsedData[15],
            lac: parsedData[16],
            cell_id: parsedData[17],
            reserved2: parsedData[18],
            mileage: parsedData[19]
        });
    } else if (command[1] === 'GTFRI') {
        _.extend(data, {
            ext_power: parsedData[4],
            report_id: parsedData[5],
            number: parsedData[6],
            accuracy: parsedData[7],
            speed: parsedData[8],
            azimuth: parsedData[9],
            altitude: parsedData[10],
            coordinates: [parsedData[11], parsedData[12]],
            gps_utc_time: parsedData[13],
            mcc: parsedData[14],
            lnc: parsedData[15],
            lac: parsedData[16],
            cell_id: parsedData[17],
            reserved1: parsedData[18],
            mileage: parsedData[19],
            hr_m_cnt: parsedData[20],
            reserved2: parsedData[21],
            reserved3: parsedData[22],
            bkp_bat_pct: parsedData[23],
            device_stat: parsedData[24],
            reserved4: parsedData[25],
            reserved5: parsedData[26],
            reserved6: parsedData[27]
        });
    } else if (command[1] === 'GTEPS') {
        _.extend(data, {
            ext_pow_volt: parsedData[4],
            report_id: parsedData[5],
            number: parsedData[6],
            accuracy: parsedData[7],
            speed: parsedData[8],
            azimuth: parsedData[9],
            altitude: parsedData[10],
            coordinates: [parsedData[11], parsedData[12]],
            gps_utc_time: parsedData[13],
            mcc: parsedData[14],
            lnc: parsedData[15],
            lac: parsedData[16],
            cell_id: parsedData[17],
            reserved1: parsedData[18],
            mileage: parsedData[19]
        });
    } else if (command[1] === 'GTLBC') {
        _.extend(data, {
            call_number: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16],
            mileage: parsedData[17]
        });
    } else if (command[1] === 'GTGEO') {
        _.extend(data, {
            reserved1: parsedData[4],
            report_id: parsedData[5],
            number: parsedData[6],
            accuracy: parsedData[7],
            speed: parsedData[8],
            azimuth: parsedData[9],
            altitude: parsedData[10],
            coordinates: [parsedData[11], parsedData[12]],
            gps_utc_time: parsedData[13],
            mcc: parsedData[14],
            lnc: parsedData[15],
            lac: parsedData[16],
            cell_id: parsedData[17],
            reserved2: parsedData[18],
            mileage: parsedData[19]
        });
    } else if (command[1] === 'GTGES') {
        _.extend(data, {
            reserved1: parsedData[4],
            report_id: parsedData[5],
            trigger: parsedData[6],
            radius: parsedData[7],
            chk_interval: parsedData[8],
            number: parsedData[9],
            accuracy: parsedData[10],
            speed: parsedData[11],
            azimuth: parsedData[12],
            altitude: parsedData[13],
            coordinates: [parsedData[14], parsedData[15]],
            gps_utc_time: parsedData[16],
            mcc: parsedData[17],
            lnc: parsedData[18],
            lac: parsedData[19],
            cell_id: parsedData[20],
            reserved2: parsedData[21],
            mileage: parsedData[22]
        });
    } else if (command[1] === 'GTMPN' || command[1] === 'GTMPF' ||
        command[1] === 'GTBTC' || command[1] === 'GTCRA') {
        _.extend(data, {
            accuracy: parsedData[4],
            speed: parsedData[5],
            azimuth: parsedData[6],
            altitude: parsedData[7],
            coordinates: [parsedData[8], parsedData[9]],
            gps_utc_time: parsedData[10],
            mcc: parsedData[11],
            lnc: parsedData[12],
            lac: parsedData[13],
            cell_id: parsedData[14],
            reserved1: parsedData[15]
        });
    } else if (command[1] === 'GTSTC') {
        _.extend(data, {
            reserved1: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved2: parsedData[16]
        });
    } else if (command[1] === 'GTBPL') {
        _.extend(data, {
            bkp_bat_vcc: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16]
        });
    } else if (command[1] === 'GTSTT') {
        _.extend(data, {
            state: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16]
        });
    } else if (command[1] === 'GTIGN') {
        _.extend(data, {
            dur_ign_off: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16],
            hr_m_cnt: parsedData[17],
            mileage: parsedData[18]
        });
    } else if (command[1] === 'GTIGF') {
        _.extend(data, {
            dur_ign_on: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16],
            hr_m_cnt: parsedData[17],
            mileage: parsedData[18]
        });
    } else if (command[1] === 'GTSTR' || command[1] === 'GTSTP' ||
        command[1] === 'GTLSP' || command[1] === 'GTIDN') {
        _.extend(data, {
            reserved1: parsedData[4],
            reserved2: parsedData[5],
            accuracy: parsedData[6],
            speed: parsedData[7],
            azimuth: parsedData[8],
            altitude: parsedData[9],
            coordinates: [parsedData[10], parsedData[11]],
            gps_utc_time: parsedData[12],
            mcc: parsedData[13],
            lnc: parsedData[14],
            lac: parsedData[15],
            cell_id: parsedData[16],
            reserved3: parsedData[17],
            mileage: parsedData[18]
        });
    } else if (command[1] === 'GTIDF') {
        _.extend(data, {
            motion_state: parsedData[4],
            dur_idling: parsedData[5],
            accuracy: parsedData[6],
            speed: parsedData[7],
            azimuth: parsedData[8],
            altitude: parsedData[9],
            coordinates: [parsedData[10], parsedData[11]],
            gps_utc_time: parsedData[12],
            mcc: parsedData[13],
            lnc: parsedData[14],
            lac: parsedData[15],
            cell_id: parsedData[16],
            reserved1: parsedData[17],
            mileage: parsedData[18]
        });
    } else if (command[1] === 'GTGSS') {
        _.extend(data, {
            gps_sig_status: parsedData[4],
            satellite_no: parsedData[5],
            device_state: parsedData[6],
            reserved1: parsedData[7],
            accuracy: parsedData[8],
            speed: parsedData[9],
            azimuth: parsedData[10],
            altitude: parsedData[11],
            coordinates: [parsedData[12], parsedData[13]],
            gps_utc_time: parsedData[14],
            mcc: parsedData[15],
            lnc: parsedData[16],
            lac: parsedData[17],
            cell_id: parsedData[18],
            reserved2: parsedData[19]
        });
    } else if (command[1] === 'GTDOS') {
        _.extend(data, {
            wave_out_id: parsedData[4],
            wave_out_active: parsedData[5],
            accuracy: parsedData[6],
            speed: parsedData[7],
            azimuth: parsedData[8],
            altitude: parsedData[9],
            coordinates: [parsedData[10], parsedData[11]],
            gps_utc_time: parsedData[12],
            mcc: parsedData[13],
            lnc: parsedData[14],
            lac: parsedData[15],
            cell_id: parsedData[16],
            reserved1: parsedData[17]
        });
    } else if (command[1] === 'GTGPJ') {
        _.extend(data, {
            cw_jam_state: parsedData[4],
            gps_jam_state: parsedData[5],
            accuracy: parsedData[6],
            speed: parsedData[7],
            azimuth: parsedData[8],
            altitude: parsedData[9],
            coordinates: [parsedData[10], parsedData[11]],
            gps_utc_time: parsedData[12],
            mcc: parsedData[13],
            lnc: parsedData[14],
            lac: parsedData[15],
            cell_id: parsedData[16],
            reserved2: parsedData[17]
        });
    } else if (command[1] === 'GTRMD') {
        _.extend(data, {
            roam_state: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16]
        });
    } else if (command[1] === 'GTJDR') {
        _.extend(data, {
            accuracy: parsedData[4],
            speed: parsedData[5],
            azimuth: parsedData[6],
            altitude: parsedData[7],
            coordinates: [parsedData[8], parsedData[9]],
            gps_utc_time: parsedData[10],
            mcc: parsedData[11],
            lnc: parsedData[12],
            lac: parsedData[13],
            cell_id: parsedData[14],
            reserved1: parsedData[15]
        });
    } else if (command[1] === 'GTJDS') {
        _.extend(data, {
            jam_status: parsedData[4],
            accuracy: parsedData[5],
            speed: parsedData[6],
            azimuth: parsedData[7],
            altitude: parsedData[8],
            coordinates: [parsedData[9], parsedData[10]],
            gps_utc_time: parsedData[11],
            mcc: parsedData[12],
            lnc: parsedData[13],
            lac: parsedData[14],
            cell_id: parsedData[15],
            reserved1: parsedData[16]
        });
    }

    if (data.number)
        data.number = parseInt(data.number);

    if (data.accuracy)
        data.accuracy = parseInt(data.accuracy);

    if (data.speed)
        data.speed = parseInt(data.speed);

    if (data.azimuth)
        data.azimuth = parseInt(data.azimuth);

    if (data.altitude)
        data.altitude = parseInt(data.altitude);

    if (data.coordinates[0])
        data.coordinates[0] = parseFloat(data.coordinates[0]);

    if (data.coordinates[1])
        data.coordinates[1] = parseFloat(data.coordinates[1]);

    if (data.gps_utc_time)
        data.gps_utc_time = moment(data.gps_utc_time, 'YYYYMMDDHHmmss').toDate();

    if (data.mileage)
        data.mileage = parseInt(data.mileage);

    return data;
};