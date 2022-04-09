import {JamAuthService} from '../../../jam';
import {Component} from '@angular/core';

@Component({
  selector:    'pbj-footer',
  templateUrl: './footer.component.html',
  styleUrls:   ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    public readonly auth: JamAuthService
  ) { }

}
