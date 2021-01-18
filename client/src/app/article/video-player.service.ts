import { Injectable } from '@angular/core';
import { ScriptLoaderModule, ScriptService } from 'ngx-script-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  constructor(private scriptService: ScriptService) {

  }

  iframeUrls: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);

  private _rumbleApi?:any;

  play(source:string) {
    this._rumbleApi?.pause();
    source = source.toLowerCase();

    if (source.includes('youtube.com') || source.includes('youtu.be')) {
      const urlParts = source.split("?v=");
      
      if (urlParts.length == 2) {
        this.iframeUrls.next(`https://www.youtube.com/embed/-${urlParts[1]}`);
      } else {
        this.iframeUrls.next(null);
        throw new Error('Invalid youtube source url: ' + source);
      }

      return;
    }

    this.iframeUrls.next(null);
    
    if (source.includes('rumble.com')) {
      try {
        // Parse URL of type https://rumble.com/vcv17b-brown-bear-encounter.html
        const id = source.split('rumble.com/')[1].split('-')[0];
        this.scriptService.loadScript('https://rumble.com/embedJS/uabcd.vabcd/').subscribe(() => {
          (window as any).Rumble('play', {
            video: id,
            div: 'rumblePlayer',
            rel: 5,
            api: (api:any) => this._rumbleApi = api
          })
        });
      } catch {
        throw new Error('Invalid rumble source url: ' + source);
      }
    }
  }
}
