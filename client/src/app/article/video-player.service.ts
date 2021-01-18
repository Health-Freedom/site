import { Injectable, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScriptService } from 'ngx-script-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  constructor(private scriptService: ScriptService, private sanitizer: DomSanitizer) {
    this.rumbleElement = document.createElement('div');
    this.rumbleElement.id = 'rumblePlayer';
  }

  iframeUrls: BehaviorSubject<SafeResourceUrl|null> = new BehaviorSubject<SafeResourceUrl|null>(null);

  private _rumbleApi?:any;

  rumbleElement!: HTMLDivElement;

  play(source:string) {
    this._rumbleApi?.pause();
    source = source.toLowerCase();

    if (source.includes('youtube.com') || source.includes('youtu.be')) {
      const urlParts = source.split("?v=");
      
      if (urlParts.length == 2) {
        const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, `https://www.youtube.com/embed/-${urlParts[1]}`);

        if (safeUrl) {
          this.iframeUrls.next(this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl));
        }

        return;
      }

      this.iframeUrls.next(null);
      throw new Error('Invalid youtube source url: ' + source);
    }

    this.iframeUrls.next(null);
    
    if (source.includes('rumble.com')) {
      try {
        // Parse URL of type https://rumble.com/embed/v92vyt/?pub=94q5v
        const id = source.split('rumble.com/embed/')[1].split('/')[0];

        if (this._rumbleApi) {
          this._rumbleApi.loadVideo(id);
        } else {
          this.scriptService.loadScript('https://rumble.com/embedJS/u94q5v').subscribe(() => {
            (window as any).Rumble('play', {
              video: id,
              div: 'rumblePlayer',
              rel: 5,
              api: (api:any) => this._rumbleApi = api
            })
          });
        }
      } catch {
        throw new Error('Invalid rumble source url: ' + source);
      }
    }
  }
}
