import { Injectable } from '@angular/core';
import * as fs from 'tns-core-modules/file-system';

import { Server } from './server';

@Injectable()
export class ServerService {
  //
  private LOGTAG = '[server.service]';
  private configFileFolder = fs.knownFolders.currentApp();
  private configFileName = 'servers.json';
  private configFilePath = fs.path.join(
    this.configFileFolder.path,
    this.configFileName
  );

  list(): Promise<Server[]> {
    return new Promise((resolve, reject) => {
      if (fs.File.exists(this.configFilePath)) {
        const configFile = this.configFileFolder.getFile(this.configFileName);
        configFile
          .readText()
          .then(text => {
            let serverList = [];
            let serverListJson;
            try {
              serverListJson = JSON.parse(text);
            } catch (error) {
              console.error(`${this.LOGTAG} List: Error: ${error}`);
              return reject(new Error('Error reading server config file'));
            }
            for (let i = 0; i < serverListJson.length; i++) {
              const server = new Server(serverListJson[i].id);
              server.setUrl(serverListJson[i].url);
              serverList.push(server);
            }
            console.info(`${this.LOGTAG} List: ${serverList.length} servers`);
            resolve(serverList);
          })
          .catch(error => {
            console.error(`${this.LOGTAG} List: Error: ${error}`);
            reject(new Error('Error reading server config file'));
          });
      } else {
        console.info(`${this.LOGTAG} List: no server file yet`);
        resolve([]);
      }
    });
  }

  get(serverId: string): Promise<Server> {
    return new Promise((resolve, reject) => {
      this.list()
        .then(serverList => {
          for (let i = 0; i < serverList.length; i++) {
            if (serverList[i].getId() === serverId) {
              return resolve(serverList[i]);
            }
          }
          reject(new Error(`Server ${serverId} not found`));
        })
        .catch(error => {
          console.error(`${this.LOGTAG} Get: Error: ${error}`);
          reject(new Error('Error getting server'));
        });
    });
  }

  add(server: Server): Promise<VoidFunction> {
    return new Promise((resolve, reject) => {
      this.list()
        .then(serverList => {
          serverList.push(server);
          return this.configFileFolder
            .getFile(this.configFileName)
            .writeText(JSON.stringify(serverList));
        })
        .then(() => {
          console.info(`${this.LOGTAG} Add: Server added`);
          resolve();
        })
        .catch(error => {
          console.error(`${this.LOGTAG} Add: Error: ${error}`);
          reject(new Error('Error adding server'));
        });
    });
  }

  delete(serverId: string): Promise<VoidFunction> {
    return new Promise((resolve, reject) => {
      console.info(`${this.LOGTAG} Deleting: ${serverId}`);
      this.list()
        .then(serverList => {
          for (let i = 0; i < serverList.length; i++) {
            if (serverList[i].getId() === serverId) {
              serverList.splice(i, 1);
            }
          }
          return this.configFileFolder
            .getFile(this.configFileName)
            .writeText(JSON.stringify(serverList));
        })
        .then(() => {
          console.info(`${this.LOGTAG} Delete: Server deleted`);
          resolve();
        })
        .catch(error => {
          console.error(`${this.LOGTAG} Get: Error: ${error}`);
          reject(new Error('Error getting server'));
        });
    });
  }
}
