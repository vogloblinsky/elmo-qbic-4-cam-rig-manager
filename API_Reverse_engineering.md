##Reverse engineering QBIC API:

All POST are sended to : /cgi-bin/cgi in application/json

#Get token, initially at 0
{"msg_id":257, "token": 0}

Response:
{
    rval: 0
    msg_id: 257
    param: 2 -> TOKEN
}


#Synchro life
{"msg_id":260, "token": TOKEN}

Response:
{
    rval: 0
    msg_id: 260
}


#???
{"msg_id":4097, "timeout": 2, "token": TOKEN}

Response:
{
    rval: -2
    msg_id: 4097
}

#Get camera params
{"msg_id":3, "token": TOKEN}

Response:
{
    "rval": 0,
    "msg_id": 3,
    "param": [{
        "stream_type": "mjpg"
    }, {
        "std_def_video": "on"
    }, {
        "stream_while_record": "on"
    }, {
        "video_resolution": "1920x1080 30P 16:9"
    }, {
        "el_wdr": "off"
    }, {
        "el_angle_deg": "170"
    }, {
        "el_white_balance": "auto"
    }, {
        "el_warp_correction": "off"
    }, {
        "el_stabilization": "off"
    }, {
        "el_ae_exposure_level": "0"
    }, {
        "el_ae_light_metering": "center"
    }, {
        "el_image_rotation": "off"
    }, {
        "el_rec_duration": "30min"
    }, {
        "el_burst_per_sec": "60"
    }, {
        "el_speaker_volume": "0"
    }, {
        "el_self_timer": "off"
    }, {
        "el_battery": "97"
    }, {
        "el_capture_mode": "single"
    }, {
        "el_interval_time": "00:00:30"
    }, {
        "el_get_version": "01.02.0006"
    }, {
        "el_wifi_auto_power_off": "disable"
    }, {
        "el_get_ac_connection": "disconnected"
    }, {
        "el_rec_audio_level": "5"
    }, {
        "el_rec_audio_balance": "0"
    }, {
        "el_auto_power_off": "off"
    }, {
        "el_ae_control": "manual"
    }, {
        "el_ae_manual_gain": "10"
    }, {
        "el_ae_manual_shutter": "16"
    }, {
        "el_wb_control": "manual"
    }, {
        "el_wb_manual_temp": "1"
    }, {
        "el_destination": "eu"
    }, {
        "app_status": "idle"
    }, {
        "camera_clock": "2014-12-16 13:44:43"
    }]
}


##Activate streaming:

Part 1

{"msg_id":2, "param": "on", "type": "stream_while_record", "token": 1}

Response: 

{
    rval: 0
    msg_id: 2
    type: "stream_while_record"
}

Part 2

{"msg_id":259, "param": "none_force", "token": 0}


##Stop streaming:

{"msg_id":260, "token": 2}
+
{"msg_id":258, "token": xx}


##Adjuste field of view:

Synchro life
+
{"msg_id":2, "param": "120", "type", "el_angle_deg", "token": 2}

