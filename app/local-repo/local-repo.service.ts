import { Injectable } from '@angular/core';
import * as fs from 'tns-core-modules/file-system';

import { LocalRepo } from './local-repo';

@Injectable()
export class LocalRepoService {
  //
  private LOGTAG = '[local-repo.service]';
  private configFileFolder = fs.knownFolders.currentApp();
  private configFileName = 'local-repos.json';
  private configFilePath = fs.path.join(
    this.configFileFolder.path,
    this.configFileName
  );

  list(): Promise<LocalRepo[]> {
    return new Promise((resolve, reject) => {
      if (fs.File.exists(this.configFilePath)) {
        const configFile = this.configFileFolder.getFile(this.configFileName);
        configFile
          .readText()
          .then(text => {
            let localRepoList;
            try {
              localRepoList = JSON.parse(text);
            } catch (error) {
              console.error(`${this.LOGTAG} List: Error: ${error}`);
              return reject(new Error('Error reading local repo config file'));
            }
            console.info(
              `${this.LOGTAG} List: ${localRepoList.length} local repos`
            );
            resolve(localRepoList);
          })
          .catch(error => {
            console.error(`${this.LOGTAG} List: Error: ${error}`);
            reject(new Error('Error reading local repo config file'));
          });
      } else {
        console.info(`${this.LOGTAG} List: no local repo file yet`);
        resolve([]);
      }
    });
  }

  add(localRepo: LocalRepo): Promise<VoidFunction> {
    return new Promise((resolve, reject) => {
      this.list()
        .then(localRepoList => {
          localRepoList.push(localRepo);
          return this.configFileFolder
            .getFile(this.configFileName)
            .writeText(JSON.stringify(localRepoList));
        })
        .then(() => {
          console.info(`${this.LOGTAG} Add: Local repo added`);
          resolve();
        })
        .catch(error => {
          console.error(`${this.LOGTAG} Add: Error: ${error}`);
          reject(new Error('Error adding local repo'));
        });
    });
  }

  delete() {}
}
