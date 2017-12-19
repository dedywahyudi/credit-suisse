import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const { mapsApiKey } = environment;
const url = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&callback=__onGoogleLoaded`;

@Injectable()
export class GoogleMapsLoader {
  private static promise;

  public static load() {
    // First time 'load' is called?
    if (!GoogleMapsLoader.promise) {

      // Make promise to load
      GoogleMapsLoader.promise = new Promise((resolve, reject) => {

        // Set callback for when google maps is loaded.
        window['__onGoogleLoaded'] = (ev) => {
          resolve('google maps api loaded');
        };

        const node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.onerror = (err) => {
          reject(err);
        };

        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return GoogleMapsLoader.promise;
  }

  /**
   * loadUtilityLib Loads the maps utlility libraries
   * that need to be loaded after google maps
   */
  public static loadUtilityLib() {
    return new Promise((res, rej) => {
      const node = document.createElement('script');
      node.src = '/assets/scripts/infobox.js';
      node.type = 'text/javascript';
      node.onload = () => res();
      node.onerror = (err) => rej(err);

      document.getElementsByTagName('head')[0].appendChild(node);
    });
  }
}
