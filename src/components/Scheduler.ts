import * as vscode from 'vscode';
import { Configuration } from '../config/Configuration';
import type { Config } from '../config/Configuration';
var CronJob = require('cron').CronJob;
import { createNotice } from './Notice';


class Scheduler{
    public jobs:CronJob[]=[];
    private config: Config;
    constructor(){
        this.config=(Configuration.getConfiguration() as unknown) as Config;
    }

    load(){
        const {reminder}=this.config;
        if(reminder.only&& reminder.times.length>0){
            this.createScheduleWithReminder(reminder);
        }else{
            this.createScheduleWithReminder(reminder);
            const job=new CronJob(
                "0 0 9-22 * * MON_FRI",
                ()=>{
                    const notice=createNotice();
                    notice.render();
                },
                null,
                true,
                'Asia/Shanghai'
            );
            this.jobs.push(job);
        }
    }  

    createScheduleWithReminder(reminder: Config["reminder"]){
        const jobs=[];
        for(const time of reminder.times){
            const [hours,minutes]=time.split(":");
            const job=new CronJob(
                `0 ${minutes} ${hours} * * MON_FRI`,
                ()=>{
                    const notice=createNotice();
                    notice.render();
                },
                null,
                true,
                'Asia/Shanghai'
            );
        }
    }
    
    start(){
        this.load();
    }

}