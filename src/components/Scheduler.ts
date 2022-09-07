/*
 * @Author: duanxinxin
 * @Date: 2022-09-06 15:08:15
 * @LastEditors: duanxinxin
 * @LastEditTime: 2022-09-07 10:59:12
 * @Description: 
 */
import * as vscode from 'vscode';
import { Configuration } from '../config/Configuration';
import type { Config } from '../config/Configuration';
var cronJob = require('cron').CronJob;
import { createNotice } from './Notice';
let instance:Scheduler;


class Scheduler{
    public jobs:(typeof cronJob)[]=[];
    private config: Config;
    constructor(private context:vscode.ExtensionContext){
        instance=this;
        this.config=(Configuration.getConfiguration() as unknown) as Config;
    }

    load(){
        const {reminder}=this.config;
        if(reminder.only&& reminder.times.length>0){
            this.jobs=this.createScheduleWithReminder(reminder);
        }else{
            const job=new cronJob(
                "0 26 9,18 * * MON-FRI",
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

    createScheduleWithReminder(reminder: Config["reminder"]):(typeof cronJob)[]{
        const jobs=[];
        for(const time of reminder.times){
            const [hours,minutes]=time.split(":");
            const job=new cronJob(
                `0 ${minutes} ${hours} * * MON-FRI`,
                ()=>{
                    const notice=createNotice();
                    notice.render();
                },
                null,
                true,
                'Asia/Shanghai'
            );
            jobs.push(job);
        }
        return jobs;
    }
    
    start(){
        this.load();
        for(const job of this.jobs){
            job.start();
        }
    }

    stop(){
        for(const job of this.jobs){
            job.stop();
        }
    }

    restart(){
        this.stop();
        this.jobs=[];
        this.config=(Configuration.getConfiguration()  as unknown) as Config;
        this.start();
    }

    static getScheduler(){
        return instance;
    }

}

export function createScheduler(context:vscode.ExtensionContext){
    if(instance) {return instance;}
    return new Scheduler(context);
}

export type {Scheduler};